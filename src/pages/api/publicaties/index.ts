import type { APIRoute } from 'astro';
import type { PublicatiesQueryQuery } from '@lib/types/datocms';
import { t } from '@lib/i18n';
import { sharedServerRequest, getFilterOptions } from '@lib/api';

import query from './queries/_index.query.graphql';
import tagOptionsQuery from './queries/_tagOptions.query.graphql';

export const GET: APIRoute = async (context) => {
  const filter = {
    search: {
      name: 'title',
      label: t('find_a_publication')
    },
    filters: [
      { 
        name: 'tags', 
        label: t('subject'), 
        options: [
          {
            label: t('all'),
            value: ''
          },
          ...(await getFilterOptions(tagOptionsQuery))
        ] 
      }
    ]
  };
  
  const { meta, items } = await sharedServerRequest<PublicatiesQueryQuery>(context, filter, query);
  
  return new Response(JSON.stringify({
    meta,
    items,
    filter
  }));
};
