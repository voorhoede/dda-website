import { defineMiddleware } from 'astro:middleware';
import { applyHeaderRules } from '@lib/headers';

/**
 * Headers middleware: Apply headers from _headers file to dynamic responses.
 * These headers are not automatically applied by Cloudflare Pages to dynamic responses.
 */
export const headers = defineMiddleware(async ({ request }, next) => {
  const response = await next();

  // Apply all header rules from the _headers file
  applyHeaderRules(request.url, response);

  return response;
});
