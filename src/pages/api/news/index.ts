export const prerender = false;

import type { APIRoute } from 'astro';
import type { AllNewsQuery, AllNewsQueryVariables } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import allNewsQuery from './AllNews.query.graphql';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const { skip, id } = Object.fromEntries(url.searchParams.entries());
  
  /* Gather variables from query parameters */
  const variables = {};
  if (skip) { 
    Object.assign(variables, { skip: parseInt(skip) });
  }
  if (id) { 
    Object.assign(variables, { id: id.split(',') });
  }
  
  /* Request data from DatoCMS */
  const data = (await datocmsRequest<AllNewsQuery, AllNewsQueryVariables>({ 
    query: allNewsQuery, 
    variables 
  }));
  
  /* Add extra metadata to response */
  Object.assign(data._allNewsMeta, {
    next: skip ? (parseInt(skip) < (data._allNewsMeta.count - 1) ? parseInt(skip) + 1 : undefined) : 1,
  });
  
  Object.assign(data._allNewsMeta, {
    filter: variables
  });

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
