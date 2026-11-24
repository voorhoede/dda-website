import { defineMiddleware } from 'astro:middleware';
import { setCacheControl } from '@lib/cache-control';

export const forceTrailingSlash = defineMiddleware(
  async ({ request, redirect, locals }, next) => {
    const response = await next();

    if (response.status === 404) {
      const url = new URL(request.url);

      if (!url.pathname.endsWith('/')) {
        const redirectResponse = redirect(url.pathname + '/', 301);
        if (!locals.isPreview) setCacheControl(redirectResponse, 0, 3600);
        return redirectResponse;
      }
    }

    return response;
  },
);
