import type {
  EventListQuery,
  EventListQueryVariables,
  EventModelFilter,
} from '@lib/types/datocms';
import query from './EventList.query.graphql';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { withQueryClientProvider } from '@lib/react-query';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import debounce from 'debounce';

import { datocmsRequest } from '@lib/datocms';
import { Pagination } from '@components/Pagination';

import './EventList.css';
import {
  DataList,
  DataListItem,
  DataListItemFooter,
} from '@components/DataList';
import { Tag } from '@components/Tag';
import { Heading } from '@components/Heading';
import { formatDate } from '@lib/date';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import { ListForm } from '@components/ListForm';
import { SelectField, TextField } from '@components/Forms';

export const loader = async ({
  searchParams,
  fixedFilters,
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
    initialUrl,
  }: Props) => {
    const filterRef = useRef<HTMLFormElement>(null);
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
    };

    const updatePage = (page: number) => {
      updateSearchParams({ ...searchParams, page: page.toString() });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
    };

    return (
      <>
        {showFilter && (
          <ListForm
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

        <DataList className="container-padding-x container-padding-y">
          {data.events.map((event) => (
            <DataListItem key={event.id}>
              <div>
                <Tag>{event.theme?.name}</Tag>
              </div>
              <Heading displayLevel={4} level={3}>
                {event.title}
              </Heading>
              <DataListItemFooter>
                <Text variant="subtext">
                  <time dateTime={event.date}>{formatDate(event.date)}</time> /{' '}
                  {event.location}
                </Text>
                <Button
                  as="a"
                  height="narrow"
                  icon="arrow-right"
                  level="secondary"
                  variant="large"
                >
                  {t('details')}
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
