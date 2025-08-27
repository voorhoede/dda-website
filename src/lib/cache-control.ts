// 1 minute
const defaultMaxAge = 0;

// 1 hour
const defaultCdnMaxAge = 60;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
) => {
  const headers = response.headers as Headers;

  if (headers) {
    headers.set('Cache-Control', `public, s-maxage=${maxAge}, max-age=${maxAge}, must-revalidate`);
    headers.set('CDN-Cache-Control', `public, s-maxage=${cdnMaxAge}, max-age=${cdnMaxAge}, must-revalidate`);
  }
};
