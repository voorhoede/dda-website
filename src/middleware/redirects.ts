import { defineMiddleware } from 'astro:middleware';
import { getRedirectTarget } from '@lib/routing/redirects';

/**
 * Redirects middleware:
 * If there is no matching route (404) and there is a matching redirect rule,
 * redirect to the target URL with the specified status code.
 *
 * The rules are checked after `next()` on purpose: they may only apply when no route matches,
 * and the middleware can't tell that up front. A redirected URL renders the 404 page first,
 * which is served from the not-found cache (see not-found-cache.ts) and costs no DatoCMS API calls.
 */
export const redirects = defineMiddleware(async ({ request, redirect }, next) => {
  const response = await next();
  if (response.status === 404) {
    const { pathname } = new URL(request.url);
    const redirectTarget = getRedirectTarget(pathname);
    if (redirectTarget) {
      return redirect(redirectTarget.url, redirectTarget.statusCode);
    }
  }
  return response;
});
