import { datocmsEnvironment } from '@root/datocms-environment';
import type { APIRoute } from 'astro';
import {
  DATOCMS_READONLY_API_TOKEN,
  HEAD_START_PREVIEW,
} from 'astro:env/client';
import {
  DATO_PROXY_CACHE_TTL_SECONDS,
  getDatoCacheKeyUrl,
  isDatoBodyTooLarge,
  shouldCacheDatoResponse,
} from '@lib/dato-proxy-cache';

export const prerender = false;

const jsonHeaders = (edgeCache?: 'HIT' | 'MISS') => ({
  'Content-Type': 'application/json',
  ...(edgeCache && { 'X-Edge-Cache': edgeCache }),
});

export const POST: APIRoute = async ({ request, locals }) => {
  const body = await request.text();

  if (isDatoBodyTooLarge(body)) {
    return new Response(JSON.stringify({ errors: ['Request body too large'] }), {
      status: 413,
      headers: jsonHeaders(),
    });
  }

  // Cache API is only available on Cloudflare (not in dev/tests); never cache drafts
  const cache =
    typeof caches !== 'undefined' && !HEAD_START_PREVIEW
      ? (caches as unknown as { default: Cache }).default
      : undefined;
  const cacheKey = cache
    ? new Request(
      await getDatoCacheKeyUrl({
        origin: new URL(request.url).origin,
        body,
        environment: datocmsEnvironment,
        includeDrafts: HEAD_START_PREVIEW,
      }),
    )
    : undefined;

  if (cache && cacheKey) {
    const cached = await cache.match(cacheKey);
    if (cached) {
      const hit = new Response(cached.body, cached);
      hit.headers.set('X-Edge-Cache', 'HIT');
      return hit;
    }
  }

  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: DATOCMS_READONLY_API_TOKEN,
      'Content-Type': 'application/json',
      'X-Environment': datocmsEnvironment,
      'X-Exclude-Invalid': 'true',
      ...(HEAD_START_PREVIEW && { 'X-Include-Drafts': 'true' }),
    },
    body,
  });
  const responseText = await response.text();

  // forward upstream status and rate limit info so client-side 429 retry logic works
  const headers = new Headers(jsonHeaders(cache ? 'MISS' : undefined));
  const rateLimitReset = response.headers.get('X-RateLimit-Reset');
  if (rateLimitReset) headers.set('X-RateLimit-Reset', rateLimitReset);

  if (
    cache &&
    cacheKey &&
    shouldCacheDatoResponse({
      status: response.status,
      responseText,
      includeDrafts: HEAD_START_PREVIEW,
    })
  ) {
    const toCache = new Response(responseText, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${DATO_PROXY_CACHE_TTL_SECONDS}`,
      },
    });
    const put = cache.put(cacheKey, toCache);
    const ctx = locals.runtime?.ctx;
    if (ctx) ctx.waitUntil(put);
    else await put;
  }

  return new Response(responseText, { status: response.status, headers });
};
