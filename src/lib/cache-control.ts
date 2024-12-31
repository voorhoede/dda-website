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
    (response.headers as Record<string, string>)['Cache-Control'] =
      `max-age=${maxAge}`;
    (response.headers as Record<string, string>)['CDN-Cache-Control'] =
      `max-age=${cdnMaxAge}`;
  }
};
