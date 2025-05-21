import type {
  EventListQuery,
  EventListQueryVariables,
  EventModelFilter,
  EventModelOrderBy,
} from '@lib/types/datocms';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { datocmsRequest } from '@lib/datocms';
import { t } from '@lib/i18n';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';

import { Pagination } from '@components/Pagination';
import { SelectField, TextField } from '@components/Forms';
import { ListForm } from '@components/ListForm';

import { List } from './components/List';

import query from './EventList.query.graphql';
import './EventList.css';
import { Grid } from './components/Grid/Grid';

export const loader = async ({
  searchParams,
  fixedFilters = {},
  defaultPageSize,
  orderBy = 'startDate_ASC' as EventModelOrderBy,
}: {
  searchParams: Record<string, string>;
  fixedFilters?: EventModelFilter;
  defaultPageSize: number;
  orderBy?: EventModelOrderBy;
}) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * defaultPageSize;

  const filter: EventModelFilter = {};
  if (searchParams.zoek) {
    Object.assign(filter, {
      title: { matches: { pattern: searchParams.zoek } },
    });
  }

  if (searchParams.thema) {
    Object.assign(filter, { theme: { eq: searchParams.thema } });
  }

  const { themes, eventsMeta, events } = await datocmsRequest<
    EventListQuery,
    EventListQueryVariables
  >({
    query: query,
    variables: {
      first: defaultPageSize,
      skip,
      filter: { ...filter, ...fixedFilters },
      orderBy: [orderBy],
    },
  });

  return {
    themes,
    eventsMeta,
    events,
  };
};

export type EventsData = Awaited<ReturnType<typeof loader>>;

interface Props {
  queryKey: string;
  defaultPageSize: number;
  showFilter?: boolean;
  fixedFilters?: EventModelFilter;
  initialData: EventsData;
  initialParams: Record<string, string>;
  initialUrl: string;
  orderBy?: EventModelOrderBy;
  presentation?: 'list' | 'grid';
}

export const EventList = withQueryClientProvider(
  ({
    queryKey,
    defaultPageSize,
    showFilter,
    fixedFilters,
    initialData,
    initialParams,
    initialUrl,
    orderBy,
    presentation = 'list',
  }: QueryClientProviderComponentProps & Props) => {
    const filterRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: [queryKey, searchParams, orderBy],
      queryFn: () =>
        loader({ searchParams, fixedFilters, defaultPageSize, orderBy }),
      initialData,
    });

    const updateFilter = (filter: Record<string, string>) => {
      updateSearchParams({ ...filter, page: undefined });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }

      if (listRef.current) {
        listRef.current.focus();
      }
    };

    const updatePage = (page: number) => {
      updateSearchParams({ ...searchParams, page: page.toString() });

      const activeRef = filterRef.current || listRef.current;

      if (activeRef) {
        activeRef.scrollIntoView({
          behavior: 'instant',
        });
      }

      if (listRef.current) {
        listRef.current.focus();
      }
    };

    if (!data) {
      return null;
    }

    return (
      <>
        {showFilter && (
          <ListForm
            className="event-list-filter"
            ref={filterRef}
            onChange={updateFilter}
            initialValues={searchParams}
            search={({ onChange, values }) => (
              <TextField
                name="zoek"
                label={t('find_an_event')}
                labelStyle="float"
                value={values.zoek || ''}
                onChange={(value) => onChange('zoek', value)}
              />
            )}
            filters={({ onChange, values }) => (
              <>
                <SelectField
                  name="thema"
                  label={t('theme')}
                  labelStyle="contain"
                  options={[
                    { label: t('all'), value: '' },
                    ...data.themes.map((option) => ({
                      label: option.name,
                      value: option.id,
                    })),
                  ]}
                  value={values.omvang}
                  onChange={(value) => onChange('thema', value)}
                />
              </>
            )}
          />
        )}

        {presentation === 'list' ? (
          <List ref={listRef} data={data.events} />
        ) : (
          <Grid ref={listRef} data={data.events} />
        )}

        {data.events.length === 0 && (
          <p role="alert" className="empty-message">
            {t('no_results')}
          </p>
        )}

        <Pagination
          url={url}
          currentPage={Number(searchParams.page || 1)}
          totalPages={Math.ceil(data.eventsMeta.count / defaultPageSize)}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
