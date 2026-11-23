import { defineMiddleware } from 'astro:middleware';
import { setCacheControl } from '@lib/cache-control';
import { getRedirectTarget } from '@lib/routing/redirects';

/**
 * Redirects middleware:
 * If there is no matching route (404) and there is a matching redirect rule,
 * redirect to the target URL with the specified status code.
 *
 * The rules are checked after `next()` on purpose: they may only apply when no route matches.
 * That renders the 404 page first (DatoCMS calls), so the redirect is cached by the Cloudflare proxy
 * for 1 hour to avoid re-rendering on repeat hits.
 */
export const redirects = defineMiddleware(async ({ request, redirect, locals }, next) => {
  const response = await next();
  if (response.status === 404) {
    const { pathname } = new URL(request.url);
    const redirectTarget = getRedirectTarget(pathname);
    if (redirectTarget) {
      const redirectResponse = redirect(redirectTarget.url, redirectTarget.statusCode);
      if (!locals.isPreview) setCacheControl(redirectResponse, 0, 3600);
      return redirectResponse;
    }
  }
  return response;
});
