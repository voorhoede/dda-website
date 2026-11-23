/**
 * Cache for the rendered 404 page, stored in the Cloudflare Cache API.
 * Rendering the 404 page costs several DatoCMS API calls, which adds up with bots scanning for
 * non-existing URLs. Caching the rendered HTML makes every 404 after the first one per data center free.
 */

/** Header used internally to pass the cache state from the 404 page to the middleware. */
export const notFoundCacheHeader = 'x-not-found-cache';
export const notFoundCacheTtl = 60 * 60; // seconds

/** One entry per origin (domain) and locale. The key is virtual: it is never requested. */
export const getNotFoundCacheKey = (url: URL, locale: string) =>
  new Request(`${url.origin}/__not-found-cache/${locale}`);

/** Returns the cached 404 response (with status 404), if any. */
export const getCachedNotFound = async (cache: Cache, key: Request) => {
  const cached = await cache.match(key);
  if (!cached) return;
  const headers = new Headers(cached.headers);
  headers.delete('Cache-Control');
  headers.set(notFoundCacheHeader, 'hit');
  return new Response(cached.body, { status: 404, headers });
};

/**
 * Stores a copy of the 404 response in the cache.
 * It is stored with status 200 so it is always cacheable and restored to 404 by `getCachedNotFound`.
 */
export const storeNotFound = (cache: Cache, key: Request, response: Response) => {
  const headers = new Headers(response.headers);
  headers.delete(notFoundCacheHeader);
  headers.delete('Set-Cookie');
  headers.set('Cache-Control', `public, max-age=${notFoundCacheTtl}`);
  return cache.put(key, new Response(response.clone().body, { status: 200, headers }));
};
