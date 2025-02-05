import { datocmsCollection } from '@lib/datocms';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const events = await datocmsCollection({
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
  }) as Array<{ details: { slug: string }}>;
  
  const members = await datocmsCollection({
    collection: 'Members',
    fragment: `
      fragment MembersSlugs on MemberRecord {
        slug
      }
    `,
    fragmentName: 'MembersSlugs'
  }) as Array<{ slug: string }>;
  
  const publications = await datocmsCollection({
    collection: 'Publications',
    fragment: `
      fragment PublicationsSlugs on PublicationRecord {
        slug
      }
    `,
    fragmentName: 'PublicationsSlugs'
  }) as Array<{ slug: string }>;
  
  const pages = await datocmsCollection({
    collection: 'Pages',
    fragment: `
      fragment PagesSlugs on PageRecord {
        slug
      }
    `,
    fragmentName: 'PagesSlugs',
  }) as Array<{ slug: string }>;

  const result = `
    <?xml version="1.0" encoding="UTF-8"?>
    
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
      // Home
      <url><loc>${site}</loc></url>
      
      // Events
      <url><loc>${site}/events/</loc></url>
      ${events.map((event) => `<url><loc>${site}events${event.details.slug}</loc></url>`).join('\n') }
      // Members
      <url><loc>${site}/leden/</loc></url>
      ${members.map((member) => `<url><loc>${site}leden${member.slug}</loc></url>`).join('\n') }
      // Publications
      <url><loc>${site}/publicaties/</loc></url>
      ${publications.map((publication) => `<url><loc>${site}publicaties/${publication.slug}</loc></url>`).join('\n') }
    
      // Rest
      <url><loc>${site}/over-ons/</loc></url>
      <url><loc>${site}/vacatures/</loc></url>
      ${pages.map((page) => `<url><loc>${site}${page.slug}</loc></url>`).join('\n') }
    </urlset>
  `.trim();

  return new Response(result, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
