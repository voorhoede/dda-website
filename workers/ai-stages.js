/**
 * @param {Request} request
 * @param {{ ORIGIN_URL: string, ORIGIN_PREFIX: string, ORIGIN_ACCESS_PREFIX?: string }} env
 * @returns {Promise<Response>}
 */
export default {
  async fetch(request, env) {
    const origin = env.ORIGIN_URL.replace(/\/$/, '');
    const prefix = env.ORIGIN_PREFIX;
    const accessPrefix = env.ORIGIN_ACCESS_PREFIX || `${prefix}/__origin`;

    const url = new URL(request.url);
    const targetUrl = new URL(origin);
    targetUrl.pathname = /^\/(api|_astro|fonts|images|favicon)/.test(url.pathname)
      ? url.pathname
      : `${accessPrefix}${url.pathname}`;
    targetUrl.search = url.search;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.set('origin', origin);
    headers.set('referer', `${origin}${url.pathname}`);

    return fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.body,
    });
  }
};