// 1 minute
const defaultMaxAge = 60;

// 1 hour
const defaultCdnMaxAge = 60;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
) => {
  const headers = response.headers as Headers;

  if (headers) {
    headers.set('Cache-Control', `public, max-age=${maxAge}`);
    headers.set('CDN-Cache-Control', `public, max-age=${cdnMaxAge}`);
  }
};
