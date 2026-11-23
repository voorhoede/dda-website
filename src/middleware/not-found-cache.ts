import { defineMiddleware } from 'astro:middleware';
import { getNotFoundCacheKey, notFoundCacheHeader, storeNotFound } from '@lib/not-found-cache';

/**
 * Not found cache middleware:
 * stores the rendered 404 page in the Cloudflare Cache API (src/pages/404.astro reads it),
 * so repeated 404s and redirected URLs do not query DatoCMS again.
 */
export const notFoundCache = defineMiddleware(async ({ url, params, locals }, next) => {
  const response = await next();
  const cacheState = response.headers.get(notFoundCacheHeader);
  if (cacheState === null) return response;

  response.headers.delete(notFoundCacheHeader);
  const { isPreview, isPreviewAuthOk, runtime } = locals as unknown as {
    isPreview?: boolean;
    isPreviewAuthOk?: boolean;
    runtime?: { ctx?: { waitUntil(promise: Promise<unknown>): void } };
  };
  const cache = globalThis.caches?.default;
  if (cacheState === 'miss' && cache && !isPreview && !isPreviewAuthOk && response.status === 404) {
    const key = getNotFoundCacheKey(url, params.locale as string);
    const store = storeNotFound(cache, key, response).catch(() => {});
    runtime?.ctx?.waitUntil(store);
  }
  return response;
});
