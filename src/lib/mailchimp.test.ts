import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { subscribeToNewsletter } from './mailchimp';

vi.mock('astro:env/server', () => ({
  MAILCHIMP_API_KEY: 'test-key-us21',
  MAILCHIMP_AUDIENCE_ID: 'test-audience',
}));

const stubMailchimp = (response: Response) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

const mailchimpError = (title: string, status: number) =>
  Response.json({ title, status, detail: `${title} detail` }, { status });

describe('subscribeToNewsletter', () => {
  let consoleError: MockInstance<typeof console.error>;
  const loggedText = () => JSON.stringify(consoleError.mock.calls);

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should add the email as a pending member of the audience', async () => {
    const fetchMock = stubMailchimp(Response.json({ status: 'pending' }));

    await subscribeToNewsletter('visitor@example.com');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.mailchimp.com/3.0/lists/test-audience/members');
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer test-key-us21');
    expect(JSON.parse(init.body)).toEqual({ email_address: 'visitor@example.com', status: 'pending' });
  });

  it('should report a new member as subscribed', async () => {
    stubMailchimp(Response.json({ status: 'pending' }));

    expect(await subscribeToNewsletter('visitor@example.com')).toBe('subscribed');
  });

  it('should report an existing member as subscribed, so the form does not reveal who is on the list', async () => {
    stubMailchimp(mailchimpError('Member Exists', 400));

    expect(await subscribeToNewsletter('visitor@example.com')).toBe('subscribed');
  });

  it.each(['Invalid Resource', 'Forgotten Email Not Subscribed'])(
    'should report the %s error as rejected without logging it, since the visitor causes it',
    async (title) => {
      stubMailchimp(mailchimpError(title, 400));

      expect(await subscribeToNewsletter('visitor@example.com')).toBe('rejected');
      expect(consoleError).not.toHaveBeenCalled();
    },
  );

  it.each([401, 403, 404, 500])('should report status %i as failed and log it', async (status) => {
    stubMailchimp(mailchimpError('Error', status));

    expect(await subscribeToNewsletter('visitor@example.com')).toBe('failed');
    expect(loggedText()).toContain(String(status));
  });

  it('should report failed and log when Mailchimp cannot be reached', async () => {
    const error = new TypeError('fetch failed');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

    expect(await subscribeToNewsletter('visitor@example.com')).toBe('failed');
    expect(consoleError.mock.calls.flat()).toContain(error);
  });

  it('should not log the API key or the email address', async () => {
    stubMailchimp(mailchimpError('API Key Invalid', 401));

    await subscribeToNewsletter('visitor@example.com');

    expect(loggedText()).not.toContain('test-key-us21');
    expect(loggedText()).not.toContain('visitor@example.com');
  });
});
