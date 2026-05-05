import { defineMiddleware } from 'astro:middleware';
import { AI_STAGES_DEV } from 'astro:env/server';

const AI_STAGES_PATH_PREFIX = '/ai-stages';

/**
 * Domain routing middleware: maps ai-stages.com to the /ai-stages/* route subtree.
 *
 * ai-stages.com/        → /ai-stages/
 * ai-stages.com/[slug]  → /ai-stages/[slug]
 *
 * Paths starting with /_ (Astro internals, Astro Actions at /_actions/, etc.)
 * are passed through unchanged. All other routes that do not exist under
 * /ai-stages/ will naturally return 404.
 *
 * dutchdigitalagencies.com: /ai-stages/* routes return 404.
 * localhost and *.pages.dev: /ai-stages/* is directly accessible (no rewrite).
 * npm run start:ai-stages: localhost behaves like ai-stages.com (with rewrite).
 */
export const domainRouting = defineMiddleware(({ url }, next) => {
  const { hostname, pathname } = url;
  const aiStagesHost = url.searchParams.get('__ai_stages_host');
  const hasAiStagesAccess = aiStagesHost !== null;
  const isAiStagesDomain = hasAiStagesAccess || AI_STAGES_DEV;
  const isDevHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.pages.dev');

  if (!isAiStagesDomain && !isDevHost) {
    // Block /ai-stages/* from being accessed via any other domain.
    if (pathname.startsWith(AI_STAGES_PATH_PREFIX + '/') || pathname === AI_STAGES_PATH_PREFIX) {
      return new Response(
        JSON.stringify({
          error: 'Not Found',
          debug: { hostname, pathname, aiStagesHost, hasAiStagesAccess, isAiStagesDomain, isDevHost },
        }),
        { status: 404, headers: { 'content-type': 'application/json' } },
      );
    }
    return next();
  }

  if (isDevHost && !AI_STAGES_DEV && !isAiStagesDomain) {
    // On dev hosts without the flag, /ai-stages/* is directly accessible as-is.
    return next();
  }

  // Pass through internal Astro paths, API routes, static files, and already-prefixed paths.
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith(AI_STAGES_PATH_PREFIX) ||
    /\.\w+\/?$/.test(pathname)
  ) {
    return next();
  }

  // Rewrite by prepending /ai-stages: "/" → "/ai-stages/", "/slug" → "/ai-stages/slug"
  return next(AI_STAGES_PATH_PREFIX + pathname);
});
