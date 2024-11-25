import { datocmsEnvironment } from '@root/datocms-environment';
import type { APIRoute } from 'astro';
import {
  DATOCMS_READONLY_API_TOKEN,
  HEAD_START_PREVIEW,
} from 'astro:env/server';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: DATOCMS_READONLY_API_TOKEN,
      'Content-Type': 'application/json',
      'X-Environment': datocmsEnvironment,
      'X-Exclude-Invalid': 'true',
      ...(HEAD_START_PREVIEW && { 'X-Include-Drafts': 'true' }),
    },
    body: await request.text(),
  });

  return new Response(await response.text(), {
    headers: { 'Content-Type': 'application/json' },
  });
};
