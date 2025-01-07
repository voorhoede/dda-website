// robots.txt contains dynamic content, which can be determined at build time.
// so we use this API route to prerender the robots.txt file.
import type { APIRoute } from 'astro';

export const prerender = true;

const robotsTxt = () =>
  `
User-agent: *
Allow: /
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt(), {
    headers: {
      'content-type': 'text/plain',
    },
  });
};
