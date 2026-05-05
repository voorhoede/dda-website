/**
 * @param {Request} request
 * @param {{ ORIGIN_URL: string, ORIGIN_PREFIX: string }} env
 * @returns {Promise<Response>}
 */
export default {
  async fetch(request, env) {
    const origin = env.ORIGIN_URL;
    const prefix = env.ORIGIN_PREFIX;

    const url = new URL(request.url);
    const isAsset = /^\/(api|_astro|fonts|images|favicon)/.test(url.pathname);

    const basePath = isAsset
      ? `${origin}${url.pathname}`
      : `${origin}${prefix}${url.pathname}`;

    const target = url.search ? `${basePath}${url.search}` : basePath;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.set('origin', origin);
    headers.set('referer', `${origin}${url.pathname}`);
    headers.set('x-ai-stages-host', url.hostname);

    return fetch(target, {
      method: request.method,
      headers,
      body: request.body,
    });
  }
};