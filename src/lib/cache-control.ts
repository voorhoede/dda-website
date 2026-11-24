// 0 seconds: browsers always revalidate
const defaultMaxAge = 0;

// 10 minutes: Cloudflare edge cache
const defaultCdnMaxAge = 600;

export const setCacheControl = (
  response: ResponseInit,
  maxAge: number = defaultMaxAge,
  cdnMaxAge: number = defaultCdnMaxAge,
) => {
  const headers = response.headers as Headers;

  if (headers) {
    headers.set('Cache-Control', `public, max-age=${maxAge}, must-revalidate`);
    headers.set('CDN-Cache-Control', `public, max-age=${cdnMaxAge}, must-revalidate`);
  }
};
