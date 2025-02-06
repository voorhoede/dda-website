import type { APIRoute } from 'astro';
import type { PageRecord, SiteLocale } from '@lib/types/datocms';
import { locales } from '@lib/i18n';
import { datocmsCollection } from '@lib/datocms';
import { stringify } from '@jsr/libs__xml';
import { getPagePath } from '@blocks/InternalLink';

export const prerender = true;

export async function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

function returnPageSlugs(
  items: Array<{ slug: string }>,
  path: string,
  site?: URL,
) {
  return items.map(({ slug }) => ({
    loc: new URL(`${path}/${slug}`, site).href,
  }));
}

export const GET: APIRoute = async ({ site, params }) => {
  const { locale } = params;

  const events = (
    (await datocmsCollection({
      collection: 'Events',
      fragment: `
        fragment EventSlugs on EventRecord {
          details {
            ... on InternalEventRecord {
              slug
            }
          }
        }
      `,
      fragmentName: 'EventSlugs',
      filter: { details: { containsAny: { internalEvent: true } } },
      orderBy: '_updatedAt_DESC',
      locale,
    })) as Array<{ details: { slug: string } }>
  ).map((event) => ({ slug: event.details.slug }));

  const members = (await datocmsCollection({
    collection: 'Members',
    fragment: `
        fragment MembersSlugs on MemberRecord {
          slug
        }
      `,
    fragmentName: 'MembersSlugs',
    locale,
  })) as Array<{ slug: string }>;

  const publications = (await datocmsCollection({
    collection: 'Publications',
    fragment: `
        fragment PublicationsSlugs on PublicationRecord {
          slug
        }
      `,
    fragmentName: 'PublicationsSlugs',
    locale,
  })) as Array<{ slug: string }>;

  const pages = (
    await datocmsCollection({
      collection: 'Pages',
      fragment: `
        fragment PagesSlugs on PageRecord {
          _allSlugLocales { locale, value }
          parentPage {
            _allSlugLocales { locale, value }
            parentPage {
              _allSlugLocales { locale, value }
              parentPage {
                _allSlugLocales { locale, value }
              }
            }
          }
        }
      `,
      fragmentName: 'PagesSlugs',
      locale,
    })
  ).map((page) => ({
    slug: getPagePath({
      page: page as PageRecord,
      locale: locale as SiteLocale,
    }),
  }));

  return new Response(
    stringify({
      '@version': '1.0',
      '@encoding': 'UTF-8',
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: [
          ...returnPageSlugs(events, 'events', site),
          ...returnPageSlugs(members, 'leden', site),
          ...returnPageSlugs(publications, 'publicaties', site),
          ...returnPageSlugs(pages, '', site),
        ],
      },
    }),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
