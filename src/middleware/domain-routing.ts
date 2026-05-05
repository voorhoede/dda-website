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
 * /ai-stages/* routes are directly accessible.
 * npm run start:ai-stages: localhost behaves like ai-stages.com (with rewrite).
 */
export const domainRouting = defineMiddleware(({ url }, next) => {
  const { pathname } = url;

  // Pass through internal Astro paths, API routes, static files, and already-prefixed paths.
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith(AI_STAGES_PATH_PREFIX) ||
    /\.\w+\/?$/.test(pathname)
  ) {
    return next();
  }

  if (!AI_STAGES_DEV) {
    return next();
  }

  // Rewrite by prepending /ai-stages: "/" → "/ai-stages/", "/slug" → "/ai-stages/slug"
  return next(AI_STAGES_PATH_PREFIX + pathname);
});
