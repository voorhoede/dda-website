import type { APIContext } from 'astro';
import type { DocumentNode } from 'graphql';
import { datocmsRequest } from '@lib/datocms';

import { Events } from '@components/SmartList/Events/Events';
import { Members } from '@components/SmartList/Members/Members';
import { Publications } from '@components/SmartList/Publications/Publications';
import { Vacancies } from '@components/SmartList/Vacancies/Vacancies';

export const api = {
  '/api/events/': { Component: Events },
  '/api/leden/': { Component: Members },
  '/api/publicaties/': { Component: Publications },
  '/api/vacatures/': { Component: Vacancies },
};

export type Endpoint = keyof typeof api;
export type Filter = {
  search: {
    name: string;
    label: string;
  };
  filters: {
    name: string;
    label: string;
    options: { label: string; value: string }[];
  }[];
};

export const sharedServerRequest = async <Result>(
  { url }: APIContext,
  filter: Filter,
  query: DocumentNode,
) => {
  const { searchParams } = new URL(url);

  const pageSize = Number(searchParams.get('pageSize') || 10);
  const page = Number(searchParams.get('page') || '1');
  const datoFilter = {};

  if (searchParams.has(filter.search.name)) {
    Object.assign(datoFilter, {
      [filter.search.name]: {
        matches: { pattern: searchParams.get(filter.search.name) },
      },
    });
  }

  filter.filters.forEach(({ name }) => {
    if (searchParams.has(name)) {
      Object.assign(datoFilter, { [name]: { anyIn: searchParams.get(name) } });
    }
  });

  const data = await datocmsRequest<Result>({
    query,
    variables: {
      first: pageSize,
      skip: pageSize * (page - 1),
      filter: datoFilter,
    },
  });

  return data;
};

export const getFilterOptions = async (query: DocumentNode) => {
  const data = await datocmsRequest<{
    options: Array<{ label: string; value: string }>;
  }>({ query });
  return data.options;
};
