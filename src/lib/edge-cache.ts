/**
 * Pure helpers for the Cloudflare edge cache middleware (src/middleware/edge-cache.ts).
 */

/** How long (in seconds) rendered HTML is stored at the edge. */
export const EDGE_CACHE_TTL = 10 * 60;

/** Set by `setCacheControl` to opt a page in to edge caching. Removed before responding. */
export const EDGE_CACHE_MARKER_HEADER = 'X-Edge-Cacheable';

export const AI_STAGES_DOMAIN_HEADER = 'x-is-ai-internship-domain';

const uncachedPathPrefixes = ['/api/', '/_actions/', '/_astro/', '/_image'];

type RequestContext = {
  /** Preview deployment (`HEAD_START_PREVIEW`) */
  isPreview: boolean;
  /** Name of the cookie that enables preview mode */
  previewCookieName: string;
};

export const hasCookie = (request: Request, name: string) =>
  (request.headers.get('cookie') ?? '')
    .split(';')
    .some((cookie) => cookie.trim().startsWith(`${name}=`));

/** Whether a request may be answered from, or stored in, the edge cache. */
export const isCacheableRequest = (request: Request, { isPreview, previewCookieName }: RequestContext) => {
  if (isPreview || request.method !== 'GET') {
    return false;
  }
  const { pathname } = new URL(request.url);
  if (uncachedPathPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }
  return !hasCookie(request, previewCookieName);
};

/** Whether a rendered response may be stored in the edge cache. */
export const isCacheableResponse = (response: Response) =>
  response.status === 200 &&
  response.headers.get(EDGE_CACHE_MARKER_HEADER) === '1' &&
  !response.headers.has('Set-Cookie') &&
  (response.headers.get('Content-Type') ?? '').startsWith('text/html');

/**
 * Cache key: full URL (host, path, query) plus the AI stages domain flag,
 * so ai-stages.com and the main domain never share entries.
 */
export const getCacheKey = (request: Request) => {
  const url = new URL(request.url);
  const variant = request.headers.get(AI_STAGES_DOMAIN_HEADER) === 'true' ? 'ai-stages' : 'default';
  return new Request(`${url.origin}/__edge-cache/${variant}${url.pathname}${url.search}`);
};
