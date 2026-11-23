import { defineMiddleware } from 'astro:middleware';
import { HEAD_START_PREVIEW } from 'astro:env/client';
import {
  EDGE_CACHE_MARKER_HEADER,
  EDGE_CACHE_TTL,
  getCacheKey,
  isCacheableRequest,
  isCacheableResponse,
} from '@lib/edge-cache';
import { previewCookieName } from './preview';

/**
 * Stores rendered HTML in the Cloudflare cache (`caches.default`) so repeat
 * views are served without rendering and without any DatoCMS calls.
 * Pages opt in via `setCacheControl`. No-op when the Cache API is unavailable.
 */
export const edgeCache = defineMiddleware(async ({ request, locals }, next) => {
  const cache = typeof caches === 'undefined' ? undefined : (caches as unknown as { default?: Cache }).default;

  if (!cache || !isCacheableRequest(request, { isPreview: HEAD_START_PREVIEW, previewCookieName })) {
    return next();
  }

  const cacheKey = getCacheKey(request);
  const cached = await cache.match(cacheKey);
  if (cached) {
    const hit = new Response(cached.body, cached);
    // Stored copy has `s-maxage`; browsers should revalidate
    hit.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    hit.headers.set('X-Edge-Cache', 'HIT');
    return hit;
  }

  const response = await next();
  const cacheable = isCacheableResponse(response);
  response.headers.delete(EDGE_CACHE_MARKER_HEADER);

  if (cacheable) {
    const stored = response.clone();
    stored.headers.set('Cache-Control', `public, s-maxage=${EDGE_CACHE_TTL}`);
    stored.headers.delete('CDN-Cache-Control');
    locals.runtime.ctx.waitUntil(cache.put(cacheKey, stored));
    response.headers.set('X-Edge-Cache', 'MISS');
  }

  return response;
});
