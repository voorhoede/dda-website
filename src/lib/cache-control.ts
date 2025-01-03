// 1 minute
const defaultMaxAge = 60;

// 1 hour
const defaultCdnMaxAge = 60 * 60;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
) => {
  if (response.headers) {
    // @ts-expect-error - response.headers is not a Headers object
    response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
    // @ts-expect-error - response.headers is not a Headers object
    response.headers.set('CDN-Cache-Control', `public, max-age=${cdnMaxAge}`);
  }
};
