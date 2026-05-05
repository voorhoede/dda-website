import { defineMiddleware } from 'astro:middleware';

export const forceTrailingSlash = defineMiddleware(
  async ({ request, redirect }, next) => {
    const response = await next();

    if (response.status === 404) {
      const url = new URL(request.url);

      if (!url.pathname.endsWith('/')) {
        return redirect(url.pathname + '/', 301);
      }
    }

    return response;
  },
);
