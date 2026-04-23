import type { APIRoute } from 'astro';
import { stringify } from '@jsr/libs__xml';
import { locales } from '@lib/i18n';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(
    stringify({
      '@version': '1.0',
      '@encoding': 'UTF-8',
      sitemapindex: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        sitemap: locales.map((locale) => ({
          loc: String(new URL(`sitemap-${locale}.xml`, site)),
        })),
      },
    }),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
