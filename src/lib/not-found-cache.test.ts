import { describe, expect, test } from 'vitest';
import {
  getCachedNotFound,
  getNotFoundCacheKey,
  notFoundCacheHeader,
  storeNotFound,
} from './not-found-cache';

const createFakeCache = () => {
  const store = new Map<string, Response>();
  return {
    match: async (request: Request) => store.get(request.url)?.clone(),
    put: async (request: Request, response: Response) => {
      store.set(request.url, response);
    },
  } as unknown as Cache;
};

describe('not-found-cache:', () => {
  test('key is unique per origin and locale, not per path', () => {
    const nl = getNotFoundCacheKey(new URL('https://example.com/foo/'), 'nl').url;
    expect(nl).toBe(getNotFoundCacheKey(new URL('https://example.com/bar/?q=1'), 'nl').url);
    expect(nl).not.toBe(getNotFoundCacheKey(new URL('https://example.com/foo/'), 'en').url);
    expect(nl).not.toBe(getNotFoundCacheKey(new URL('https://other.com/foo/'), 'nl').url);
  });

  test('returns undefined on cache miss', async () => {
    const cache = createFakeCache();
    const key = getNotFoundCacheKey(new URL('https://example.com/'), 'nl');
    expect(await getCachedNotFound(cache, key)).toBeUndefined();
  });

  test('stored response is restored with status 404 and hit header', async () => {
    const cache = createFakeCache();
    const key = getNotFoundCacheKey(new URL('https://example.com/'), 'nl');
    const response = new Response('<h1>Not found</h1>', {
      status: 404,
      headers: { 'Content-Type': 'text/html', [notFoundCacheHeader]: 'miss', 'Set-Cookie': 'a=b' },
    });
    await storeNotFound(cache, key, response);
    // original response remains readable
    expect(await response.text()).toBe('<h1>Not found</h1>');

    const cached = await getCachedNotFound(cache, key);
    expect(cached?.status).toBe(404);
    expect(cached?.headers.get(notFoundCacheHeader)).toBe('hit');
    expect(cached?.headers.get('Content-Type')).toBe('text/html');
    expect(cached?.headers.get('Set-Cookie')).toBeNull();
    expect(cached?.headers.get('Cache-Control')).toBeNull();
    expect(await cached?.text()).toBe('<h1>Not found</h1>');
  });
});
