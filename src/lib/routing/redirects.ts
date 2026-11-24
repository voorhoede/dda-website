export const defaultRedirectStatus = 302;

type RedirectStatus = 301 | 302 | 303 | 307 | 308;

export interface RedirectRule {
  from: string;
  to: string;
  statusCode: string;
}

export const redirectStatusCode = (statusCode: number): RedirectStatus => {
  switch (statusCode) {
  case 301:
  case 302:
  case 303:
  case 307:
  case 308:
    return statusCode;
  default:
    return defaultRedirectStatus;
  }
};

/**
 * Serializes redirect rules from DatoCMS into a Cloudflare Pages `_redirects` file.
 * Cloudflare handles these before the request reaches the worker, so a redirect costs
 * no worker invocation and no DatoCMS calls. The rule syntax (`:placeholder`, `*` and
 * `:splat`) is the same in DatoCMS and Cloudflare, so rules are written as is.
 *
 * - Cloudflare only accepts relative sources, so rules whose `from` is a full URL are skipped.
 * - The previous runtime matching treated the trailing slash as optional, so a rule ending
 *   in a slash is also written without it.
 * - Cloudflare uses the first matching rule, so the DatoCMS order is kept.
 *
 * Constraint: Cloudflare skips _redirects for paths that go to the worker, which are the
 * dynamic routes listed in _routes.json (such as /leden/* and /publicaties/*). A rule
 * whose source falls under one of those paths has no effect.
 */
export const toRedirectsFile = (rules: RedirectRule[]) =>
  rules
    .filter((rule) => rule.from.startsWith('/'))
    .flatMap((rule) => {
      const status = redirectStatusCode(Number(rule.statusCode));
      const sources = rule.from.length > 1 && rule.from.endsWith('/')
        ? [rule.from, rule.from.slice(0, -1)]
        : [rule.from];
      return sources.map((from) => `${from} ${rule.to} ${status}`);
    })
    .join('\n') + '\n';
