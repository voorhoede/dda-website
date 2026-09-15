import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { verifyTurnstile } from './turnstile';

vi.mock('astro:env/server', () => ({
  TURNSTILE_SECRET_KEY: 'test-secret',
}));

const issuedToken = {
  success: true,
  action: 'newsletter',
  hostname: 'dutchdigitalagencies.com',
};

const stubSiteverify = (response: Response) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('verifyTurnstile', () => {
  let consoleError: MockInstance<typeof console.error>;
  const loggedText = () => JSON.stringify(consoleError.mock.calls);

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should accept a token issued for the expected action', async () => {
    stubSiteverify(Response.json(issuedToken));

    expect(await verifyTurnstile('token', 'newsletter')).toBe(true);
  });

  it('should send the secret and token to siteverify', async () => {
    const fetchMock = stubSiteverify(Response.json(issuedToken));

    await verifyTurnstile('token', 'newsletter');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    expect(JSON.parse(init.body)).toMatchObject({ secret: 'test-secret', response: 'token' });
  });

  it('should accept a token solved on another hostname, such as ai-stages.com behind its proxy worker', async () => {
    stubSiteverify(Response.json({ ...issuedToken, action: 'ai-internship', hostname: 'ai-stages.com' }));

    expect(await verifyTurnstile('token', 'ai-internship')).toBe(true);
  });

  it('should reject a token that siteverify rejects', async () => {
    stubSiteverify(Response.json({ ...issuedToken, success: false, 'error-codes': ['timeout-or-duplicate'] }));

    expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
  });

  it('should reject a token issued for another action', async () => {
    stubSiteverify(Response.json({ ...issuedToken, action: 'ai-internship' }));

    expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
  });

  it('should log a token issued for another action', async () => {
    stubSiteverify(Response.json({ ...issuedToken, action: 'ai-internship' }));

    await verifyTurnstile('token', 'newsletter');

    expect(loggedText()).toContain('newsletter');
    expect(loggedText()).toContain('ai-internship');
  });

  it('should reject a token longer than 2048 characters without calling siteverify', async () => {
    const fetchMock = stubSiteverify(Response.json(issuedToken));

    expect(await verifyTurnstile('x'.repeat(2049), 'newsletter')).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should reject when siteverify responds with an error status', async () => {
    stubSiteverify(new Response('Internal Server Error', { status: 500 }));

    expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
  });

  it('should reject when siteverify cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));

    expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
  });

  it('should log when siteverify responds with an error status', async () => {
    stubSiteverify(new Response('Internal Server Error', { status: 500 }));

    await verifyTurnstile('token', 'newsletter');

    expect(loggedText()).toContain('500');
  });

  it('should log when siteverify cannot be reached', async () => {
    const error = new TypeError('fetch failed');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

    await verifyTurnstile('token', 'newsletter');

    expect(consoleError.mock.calls.flat()).toContain(error);
  });

  it.each([
    ['missing-input-secret', 400],
    ['invalid-input-secret', 400],
    ['bad-request', 400],
    ['internal-error', 200],
    ['internal-error', 500],
  ])(
    'should log the %s error code returned with status %i',
    async (errorCode, status) => {
      stubSiteverify(Response.json({ success: false, 'error-codes': [errorCode] }, { status }));

      expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
      expect(loggedText()).toContain(errorCode);
    },
  );

  it.each(['invalid-input-response', 'timeout-or-duplicate'])(
    'should not log the %s error code, which the visitor causes',
    async (errorCode) => {
      stubSiteverify(Response.json({ success: false, 'error-codes': [errorCode] }));

      expect(await verifyTurnstile('token', 'newsletter')).toBe(false);
      expect(consoleError).not.toHaveBeenCalled();
    },
  );

  it('should not log the secret or the token', async () => {
    stubSiteverify(Response.json({ success: false, 'error-codes': ['invalid-input-secret'] }, { status: 400 }));

    await verifyTurnstile('visitor-token', 'newsletter');

    expect(loggedText()).not.toContain('test-secret');
    expect(loggedText()).not.toContain('visitor-token');
  });
});
