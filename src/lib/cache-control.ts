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
    response.headers = {
      ...response.headers,
      'Cache-Control': `max-age=${maxAge}`,
      'CDN-Cache-Control': `max-age=${cdnMaxAge}`,
    };
  }
};
