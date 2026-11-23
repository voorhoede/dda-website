import { describe, expect, it } from 'vitest';
import {
  DATO_PROXY_MAX_BODY_BYTES,
  getDatoCacheKeyUrl,
  isDatoBodyTooLarge,
  shouldCacheDatoResponse,
} from './dato-proxy-cache';

const base = {
  origin: 'https://example.com',
  body: '{"query":"{ a }"}',
  environment: 'main',
  includeDrafts: false,
};

describe('getDatoCacheKeyUrl', () => {
  it('is deterministic and a valid URL under the cache namespace', async () => {
    const a = await getDatoCacheKeyUrl(base);
    expect(a).toBe(await getDatoCacheKeyUrl(base));
    expect(a).toMatch(/^https:\/\/example\.com\/api\/dato\/__cache\/[0-9a-f]{64}$/);
  });

  it('differs per body, environment and drafts', async () => {
    const a = await getDatoCacheKeyUrl(base);
    expect(await getDatoCacheKeyUrl({ ...base, body: '{"query":"{ b }"}' })).not.toBe(a);
    expect(await getDatoCacheKeyUrl({ ...base, environment: 'other' })).not.toBe(a);
    expect(await getDatoCacheKeyUrl({ ...base, includeDrafts: true })).not.toBe(a);
  });
});

describe('shouldCacheDatoResponse', () => {
  const ok = { status: 200, responseText: '{"data":{"a":1}}', includeDrafts: false };

  it('caches successful responses', () => {
    expect(shouldCacheDatoResponse(ok)).toBe(true);
  });
  it('does not cache drafts', () => {
    expect(shouldCacheDatoResponse({ ...ok, includeDrafts: true })).toBe(false);
  });
  it('does not cache non-200 statuses', () => {
    expect(shouldCacheDatoResponse({ ...ok, status: 429 })).toBe(false);
    expect(shouldCacheDatoResponse({ ...ok, status: 500 })).toBe(false);
  });
  it('does not cache GraphQL errors or invalid JSON', () => {
    expect(
      shouldCacheDatoResponse({ ...ok, responseText: '{"data":null,"errors":[{}]}' }),
    ).toBe(false);
    expect(shouldCacheDatoResponse({ ...ok, responseText: 'nope' })).toBe(false);
  });
});

describe('isDatoBodyTooLarge', () => {
  it('rejects bodies over the limit', () => {
    expect(isDatoBodyTooLarge('x'.repeat(DATO_PROXY_MAX_BODY_BYTES))).toBe(false);
    expect(isDatoBodyTooLarge('x'.repeat(DATO_PROXY_MAX_BODY_BYTES + 1))).toBe(true);
  });
});
