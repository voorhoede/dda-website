/**
 * Pure helpers for caching responses of the client-side DatoCMS proxy (`/api/dato`).
 * The Cloudflare Cache API only stores GET requests, so we derive a synthetic GET key.
 */

export const DATO_PROXY_CACHE_TTL_SECONDS = 5 * 60;
export const DATO_PROXY_MAX_BODY_BYTES = 100 * 1024;

const bytesToHex = (bytes: ArrayBuffer) =>
  [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');

export const sha256Hex = async (text: string) =>
  bytesToHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));

/**
 * Builds a synthetic GET URL, unique per request body, DatoCMS environment and drafts setting.
 */
export const getDatoCacheKeyUrl = async ({
  origin,
  body,
  environment,
  includeDrafts,
}: {
  origin: string;
  body: string;
  environment: string;
  includeDrafts: boolean;
}) => {
  const hash = await sha256Hex(
    JSON.stringify({ body, environment, includeDrafts }),
  );
  return `${origin}/api/dato/__cache/${hash}`;
};

/**
 * Only cache successful responses without GraphQL errors, never when drafts are included.
 */
export const shouldCacheDatoResponse = ({
  status,
  responseText,
  includeDrafts,
}: {
  status: number;
  responseText: string;
  includeDrafts: boolean;
}) => {
  if (includeDrafts || status !== 200) return false;
  try {
    const json = JSON.parse(responseText);
    return !!json && typeof json === 'object' && !('errors' in json);
  } catch {
    return false;
  }
};

export const isDatoBodyTooLarge = (body: string) =>
  new TextEncoder().encode(body).length > DATO_PROXY_MAX_BODY_BYTES;
