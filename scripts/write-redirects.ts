import { writeFile } from 'node:fs/promises';
import redirectRules from '../src/lib/routing/redirects.json';
import { toRedirectsFile } from '../src/lib/routing/redirects.ts';

/**
 * Writes the DatoCMS redirect rules to dist/_redirects, so Cloudflare Pages serves them
 * without invoking the worker.
 *
 * This runs after `astro build` on purpose. The Cloudflare adapter adds every source in an
 * existing _redirects file to the exclude list of _routes.json. With 100+ redirects that
 * exceeds the 100 rule limit, so the adapter falls back to routing everything to the worker
 * and truncates the list, and some redirect sources exceed the 100 character rule limit,
 * which Cloudflare rejects. Without them the adapter only routes the dynamic pages to the
 * worker, and every other path, redirect sources included, is handled statically.
 */
writeFile('./dist/_redirects', toRedirectsFile(redirectRules))
  .then(() => console.log(`Wrote ${redirectRules.length} redirect rules to dist/_redirects`));
