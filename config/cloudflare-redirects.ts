import { readFile, writeFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import { toRedirectsFile, type RedirectRule } from '../src/lib/routing/redirects.ts';

/**
 * Writes the DatoCMS redirect rules (downloaded to src/lib/routing/redirects.json during prep)
 * to a Cloudflare Pages _redirects file, so redirects are served without invoking the worker.
 *
 * This writes in `astro:build:done` on purpose, after the Cloudflare adapter has written
 * _routes.json. Astro runs the adapter's hooks first. If _redirects existed before that, the
 * adapter would add every source to the exclude list of _routes.json, which exceeds
 * Cloudflare's limit of 100 rules (of max 100 characters each) with this many redirects.
 *
 * Cloudflare skips _redirects for paths that go to the worker. That only works out because
 * the 404 page is prerendered, so the adapter routes just the dynamic pages to the worker
 * instead of everything ("/*").
 */
export const cloudflareRedirects = (): AstroIntegration => {
  let root: URL;

  return {
    name: 'cloudflare-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = config.root;
      },
      'astro:build:done': async ({ dir, logger }) => {
        const rules: RedirectRule[] = JSON.parse(
          await readFile(new URL('src/lib/routing/redirects.json', root), 'utf-8'),
        );
        await writeFile(new URL('_redirects', dir), toRedirectsFile(rules));
        logger.info(`Wrote ${rules.length} redirect rules to _redirects`);
      },
    },
  };
};
