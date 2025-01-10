// 1 minute
const defaultMaxAge = 0;
// 1 hour
const defaultCdnMaxAge = 3600;
// 1 minute stale-while-revalidate
const defaultStaleWhileRevalidate = 60;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
  staleWhileRevalidate: number = defaultStaleWhileRevalidate,
) => {
  const headers = response.headers as Headers;

  if (headers) {
    headers.set('Cache-Control', `public, max-age=${maxAge}`);
    headers.set(
      'CDN-Cache-Control',
      `public, max-age=${cdnMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    );
  }
};
