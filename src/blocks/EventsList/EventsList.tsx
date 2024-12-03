import type {
  EventsListQuery,
  EventsListQueryVariables,
  MemberModelFilter,
} from '@lib/types/datocms';
import query from './EventsList.query.graphql';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { withQueryClientProvider } from '@lib/react-query';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import debounce from 'debounce';

import { datocmsRequest } from '@lib/datocms';
import { Pagination } from '@components/Pagination';

import './EventsList.css';

const DEFAULT_PAGE_SIZE = 10;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;

  const filter: MemberModelFilter = {};
  if (searchParams.zoek) {
    Object.assign(filter, {
      name: { matches: { pattern: searchParams.zoek } },
    });
  }

  const { eventsMeta, events } = await datocmsRequest<
    EventsListQuery,
    EventsListQueryVariables
  >({
    query: query,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
      filter
    },
  });

  return {
    eventsMeta,
    events,
  };
};

interface Props {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
}

export const EventsList = withQueryClientProvider(
  ({ initialData, initialParams, initialUrl }: Props) => {
    const dataListRef = useRef<HTMLUListElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ['events', searchParams],
      queryFn: () => loader(searchParams),
      initialData,
    });

    const updateFilter = debounce((filter) => {
      updateSearchParams({ ...filter, page: undefined });
    }, 300);

    const updatePage = (page: number) => {
      updateSearchParams({ ...searchParams, page: page.toString() });

      if (dataListRef.current) {
        dataListRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
    };

    return (
      <>
        { JSON.stringify(data.events, null, 2) }
        <Pagination
          url={url}
          currentPage={Number(searchParams.page)}
          totalPages={Math.ceil(data.eventsMeta.count / DEFAULT_PAGE_SIZE)}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
