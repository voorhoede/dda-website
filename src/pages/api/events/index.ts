import type { APIRoute } from 'astro';
import type { EventsQuery } from '@lib/types/datocms';
import { t } from '@lib/i18n';

import query from './_index.query.graphql';
import themeOptionsQuery from './_themeOptions.query.graphql';
import { datocmsRequest } from '@lib/datocms';
import { getFilterOptions } from '@lib/api';

const getFilter = async () => { 
  return {
    search: {
      name: 'title',
      label: t('find_an_event')
    },
    filters: [
      {
        name: 'theme',
        label: t('theme'),
        options: [
          {
            label: t('all'),
            value: ''
          },
          ...(await getFilterOptions(themeOptionsQuery))
        ]
      }
    ]
  };
};

export const GET: APIRoute = async ({ url }) => {
  const { searchParams } = new URL(url);
  
  const pageSize = searchParams.has('pageSize') ? Number(searchParams.get('pageSize')) : 10;
  const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1;
  
  const queryFilter = {};
  
  if (searchParams.has('title')) {
    Object.assign(queryFilter, { title: { matches: { pattern: searchParams.get('title') } } });
  }
  
  if (searchParams.has('theme')) {
    Object.assign(queryFilter, { theme: { eq: searchParams.get('theme') } });
  }
  
  if (searchParams.has('date.gte')) {
    Object.assign(queryFilter, { date: { gte: searchParams.get('date.gte') } });
  }
  
  if (searchParams.has('date.lt')) {
    Object.assign(queryFilter, { date: { lt: searchParams.get('date.lt') } });
  }
  
  const { meta, items }  = await datocmsRequest<EventsQuery>({
    query,
    variables: {
      first: pageSize,
      skip: pageSize * (page - 1),
      filter: queryFilter,
    },
  });
  
  return new Response(JSON.stringify({
    meta,
    items,
    filter: await getFilter()
  }));
};
