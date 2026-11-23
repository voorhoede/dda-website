import { EDGE_CACHE_MARKER_HEADER, EDGE_CACHE_TTL } from './edge-cache';

// Browsers always revalidate with the edge
const defaultMaxAge = 0;

// Edge cache TTL in seconds (see edge-cache middleware)
const defaultCdnMaxAge = EDGE_CACHE_TTL;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
) => {
  const headers = response.headers as Headers;

  if (headers) {
    headers.set('Cache-Control', `public, max-age=${maxAge}, must-revalidate`);
    headers.set('CDN-Cache-Control', `public, max-age=${cdnMaxAge}, must-revalidate`);
    // Opts this response in to the edge cache (see src/middleware/edge-cache.ts)
    headers.set(EDGE_CACHE_MARKER_HEADER, '1');
  }
};
