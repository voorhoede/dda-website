import type {
  EventListQuery,
  EventListQueryVariables,
  EventModelFilter,
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
import './EventList.css';

export const loader = async ({
  searchParams,
  fixedFilters = {},
  defaultPageSize,
}: {
  searchParams: Record<string, string>;
  fixedFilters?: EventModelFilter;
  defaultPageSize: number;
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
}

export const EventList = withQueryClientProvider(
  ({
    queryKey,
    defaultPageSize,
    showFilter,
    fixedFilters,
    initialData,
    initialParams,
    initialUrl
  }: QueryClientProviderComponentProps & Props) => {
    const filterRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: [queryKey, searchParams],
      queryFn: () => loader({ searchParams, fixedFilters, defaultPageSize }),
      initialData,
    });

    const updateFilter = (filter: Record<string, string>) => {
      updateSearchParams({ ...filter, page: undefined });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
      
      if(listRef.current) {
        listRef.current.focus();
      }
    };

    const updatePage = (page: number) => {
      updateSearchParams({ ...searchParams, page: page.toString() });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
      
      if(listRef.current) {
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
                  onChange={(value) => onChange('omvang', value)}
                />
              </>
            )}
          />
        )}

        <DataList ref={listRef} aria-live="polite" className="container-padding-x container-padding-y">
          {data.events.map((event) => (
            <DataListItem key={event.id}>
              <div>
                {event.theme?.name && <Tag>{event.theme?.name}</Tag>}
              </div>
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
                  href={ event.details.__typename === 'ExternalEventRecord' ? event.details.link : `./${event.details.slug}/` }
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

        <Pagination
          url={url}
          currentPage={Number(searchParams.page)}
          totalPages={Math.ceil(data.eventsMeta.count / defaultPageSize)}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
