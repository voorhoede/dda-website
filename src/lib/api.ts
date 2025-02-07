import type { APIContext } from 'astro';
import type { DocumentNode } from 'graphql';
import { datocmsRequest } from '@lib/datocms';

import { GET as PUBLICATIONS_GET } from '@api/publicaties';
import { PublicationsList } from '@components/NewDataList/PublicationsList/PublicationsList';

export const recordsPerPage = 10;
export const api = {
  '/api/publicaties/': { GET: PUBLICATIONS_GET, Component: PublicationsList },
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
  { request }: APIContext,
  filter: Filter,
  query: DocumentNode,
) => {
  const referer = request.headers.get('Referer');
  const url = new URL(referer || request.url);
  const { searchParams } = new URL(url);

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
      first: recordsPerPage,
      skip: recordsPerPage * (page - 1),
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
