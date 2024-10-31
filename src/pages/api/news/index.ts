export const prerender = false;

import type { APIRoute } from 'astro';
import type { AllNewsQueryQuery } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import allNewsQuery from './AllNews.query.graphql';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const { skip, ...filter } = Object.fromEntries(url.searchParams.entries());
  
  const data = (await datocmsRequest<AllNewsQueryQuery>({ query: allNewsQuery, variables: { skip, filter } }));
  
  Object.assign(data._allNewsMeta, {
    next: skip ? (parseInt(skip) < (data._allNewsMeta.count - 1) ? parseInt(skip) + 1 : undefined) : 1,
  });

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
