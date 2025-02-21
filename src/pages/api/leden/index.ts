import type { APIRoute } from 'astro';
import { print } from 'graphql';
import { t } from '@lib/i18n';
import type { MemberCardFragment } from '@lib/types/datocms';
import { datocmsCollection } from '@lib/datocms';
import memberCardFragment from '@blocks/MemberCard/MemberCard.fragment.graphql';
import provinceOptionsQuery from './_provinceOptions.query.graphql';
import { getFilterOptions } from '@lib/api';
import { shuffle } from '@lib/seed-random';

const getFilter = async () => {
  return {
    search: {
      name: 'name',
      label: t('find_an_agency'),
    },
    filters: [
      {
        name: 'provinces',
        label: t('province'),
        options: [
          {
            label: t('all'),
            value: '',
          },
          ...(await getFilterOptions(provinceOptionsQuery))
        ],
      },
      {
        name: 'employees',
        label: t('company_size'),
        options: [
          { label: t('all'), value: '' },
          { label: '1-9', value: '1' },
          { label: '10-24', value: '2' },
          { label: '25-49', value: '3' },
          { label: '50-99', value: '4' },
          { label: '100-249', value: '5' },
          { label: '250+', value: '6' },
        ],
      },
      {
        name: 'sort',
        label: t('sort'),
        options: [
          { label: t('none'), value: '' },
          { label: 'A-Z', value: 'name_ASC' },
          { label: 'Z-A', value: 'name_DESC' },
          { label: 'Aantal werknemers', value: 'employees_ASC' },
        ],
      },
    ],
  };
};

export const GET: APIRoute = async ({ url }) => {
  const { searchParams } = new URL(url);

  const queryFilter = {};

  const orderBy = searchParams.has('sort')
    && searchParams.get('sort');

  if (searchParams.has('name')) {
    Object.assign(queryFilter, {
      name: { matches: { pattern: searchParams.get('name') } },
    });
  }

  if (searchParams.has('provinces')) {
    Object.assign(queryFilter, {
      provinces: { anyIn: searchParams.get('provinces') },
    });
  }

  if (searchParams.has('employees')) {
    Object.assign(queryFilter, {
      employees: { eq: searchParams.get('employees') },
    });
  }

  let items = await datocmsCollection<MemberCardFragment>({
    collection: 'Members',
    fragment: print(memberCardFragment),
    fragmentName: 'MemberCard',
    filter: queryFilter,
    orderBy: orderBy || 'name_ASC',
  });
  
  if (Object.keys(queryFilter).length === 0 && !orderBy) {
    items = shuffle<MemberCardFragment>(items, Math.random());
  }
  
  const meta = { count: items.length };

  return new Response(
    JSON.stringify({
      meta,
      items,
      filter: await getFilter(),
    }),
  );
};
