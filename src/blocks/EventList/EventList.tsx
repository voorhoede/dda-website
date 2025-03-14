import type {
  EventListQuery,
  EventListQueryVariables,
  EventModelFilter,
  EventModelOrderBy,
} from '@lib/types/datocms';
import query from './EventList.query.graphql';

import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { Pagination } from '@components/Pagination';
import { datocmsRequest } from '@lib/datocms';

import { Button } from '@components/Button';
import {
  DataList,
  DataListItem,
  DataListItemFooter,
} from '@components/DataList';
import { SelectField, TextField } from '@components/Forms';
import { Heading } from '@components/Heading';
import { ListForm } from '@components/ListForm';
import { Tag } from '@components/Tag';
import { Text } from '@components/Text';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';
import clsx from 'clsx';
import './EventList.css';

export const loader = async ({
  searchParams,
  fixedFilters = {},
  defaultPageSize,
  orderBy = 'date_ASC' as EventModelOrderBy,
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

interface Props {
  queryKey: string;
  defaultPageSize: number;
  showFilter?: boolean;
  fixedFilters?: EventModelFilter;
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
  orderBy?: EventModelOrderBy;
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
  }: QueryClientProviderComponentProps & Props) => {
    const filterRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLElement>(null);
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

        <DataList
          ref={listRef}
          aria-live="polite"
          className={clsx({
            'container-padding-x container-padding-y': data.events.length > 0,
          })}
        >
          {data.events.map((event) => (
            <DataListItem key={event.id}>
              <div>{event.theme?.name && <Tag>{event.theme?.name}</Tag>}</div>
              <Heading displayLevel={4} level={3}>
                {event.title}
              </Heading>
              <DataListItemFooter>
                <Text variant="subtext">
                  <time dateTime={event.date}>{formatDate(event.date)}</time>
                  {event.location && ` / ${event.location}`}
                </Text>
                <Button
                  as="a"
                  height="narrow"
                  icon="arrow-right"
                  level="secondary"
                  variant="large"
                  href={
                    event.details.__typename === 'ExternalEventRecord'
                      ? event.details.link
                      : `./${event.details.slug}/`
                  }
                  targetArea="parent"
                >
                  {t('details')}
                  <span className="a11y-sr-only">
                    {t('_about_subject', { subject: event.title })}
                  </span>
                </Button>
              </DataListItemFooter>
            </DataListItem>
          ))}
        </DataList>

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
