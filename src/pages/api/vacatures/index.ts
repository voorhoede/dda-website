import type { APIRoute } from 'astro';
import type { EventsQuery } from '@lib/types/datocms';
import { t } from '@lib/i18n';

import query from './_index.query.graphql';
import provinceOptionsQuery from './_provinceOptions.query.graphql';
import { datocmsRequest } from '@lib/datocms';
import { getFilterOptions } from '@lib/api';

const getFilter = async (url: string | URL | undefined) => {
  const employmentTypes = await (
    await fetch(new URL('/api/vacatures/employment-types.json', url))
  ).json();
  const hours = await (
    await fetch(new URL('/api/vacatures/hours.json', url))
  ).json();
  const languages = await (
    await fetch(new URL('/api/vacatures/languages.json', url))
  ).json();

  return {
    search: {
      name: 'title',
      label: t('search_vacancies'),
    },
    filters: [
      {
        name: 'province',
        label: t('province'),
        options: [
          {
            label: t('all'),
            value: '',
          },
          ...(await getFilterOptions(provinceOptionsQuery)),
        ],
      },
      {
        name: 'employmentType',
        label: t('type'),
        options: [
          {
            label: t('all'),
            value: '',
          },
          ...employmentTypes
        ],
      },
      {
        name: 'weeklyHours',
        label: t('hours'),
        options: [
          {
            label: t('all'),
            value: '',
          },
          ...hours
        ],
      },
      {
        name: 'language',
        label: t('work_language'),
        options: [
          {
            label: t('all'),
            value: '',
          },
          ...languages
        ],
      },
    ],
  };
};

export const GET: APIRoute = async ({ url }) => {
  const { searchParams } = new URL(url);

  const pageSize = searchParams.has('pageSize')
    ? Number(searchParams.get('pageSize'))
    : 10;
  const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1;

  const queryFilter = {};

  if (searchParams.has('title')) {
    Object.assign(queryFilter, {
      title: { matches: { pattern: searchParams.get('title') } },
    });
  }

  if (searchParams.has('province')) {
    Object.assign(queryFilter, {
      province: { eq: searchParams.get('province') },
    });
  }

  if (searchParams.has('employmentType')) {
    Object.assign(queryFilter, {
      employmentType: { eq: searchParams.get('employmentType') },
    });
  }

  if (searchParams.has('weeklyHours')) {
    Object.assign(queryFilter, {
      weeklyHours: { eq: searchParams.get('weeklyHours') },
    });
  }

  if (searchParams.has('language')) {
    Object.assign(queryFilter, {
      language: { eq: searchParams.get('language') },
    });
  }

  const { meta, items } = await datocmsRequest<EventsQuery>({
    query,
    variables: {
      first: pageSize,
      skip: pageSize * (page - 1),
      filter: queryFilter,
    },
  });

  return new Response(
    JSON.stringify({
      meta,
      items,
      filter: await getFilter(url),
    }),
  );
};
