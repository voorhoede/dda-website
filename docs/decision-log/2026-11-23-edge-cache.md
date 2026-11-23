# Edge cache for server-rendered HTML

Cloudflare Pages Functions output is not stored in Cloudflare's CDN cache by
`Cache-Control` / `CDN-Cache-Control` headers, so every page view re-rendered
and called DatoCMS (3-11 CDA calls per view). We approach the monthly CDA call
limit, so rendered HTML is now stored with the Cache API in middleware.

- Date: 2026-11-23
- Alternatives Considered: DatoCMS response caching per query (less effective,
  still renders); purge via DatoCMS webhook (possible follow-up)
- Decision Made By: DDA developers

## Decision

`src/middleware/edge-cache.ts` (outermost middleware) stores 200 HTML responses
of pages that call `setCacheControl` in `caches.default` for 10 minutes
(`EDGE_CACHE_TTL` in `src/lib/edge-cache.ts`). Browsers still revalidate
(`max-age=0, must-revalidate`). Not cached: non-GET, `/api/*`, `/_actions/*`,
preview deployments and requests with the preview cookie, responses with
`Set-Cookie`, non-200 responses. The cache key includes host, path, query and
whether the request comes from the AI stages domain. Responses carry
`X-Edge-Cache: HIT|MISS`.

### Trade-offs
Content changes in DatoCMS appear after up to 10 minutes, and the random order
of the member list is frozen per TTL per Cloudflare location.
