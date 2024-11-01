import { withQueryClientProvider } from '@lib/react/react-query';
import type { AllNewsQueryVariables } from '@lib/types/datocms';
import { useInfiniteQuery } from '@tanstack/react-query';

type DataListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialFilter: AllNewsQueryVariables;
};

export const DataList = withQueryClientProvider<DataListProps>(
  ({ initialData, initialFilter }) => {
    const initialPageParam = initialFilter.skip || 0;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
      queryKey: ['news', initialFilter],
      queryFn: ({ pageParam }) => {
        const windowUrl = new URL(window.location.href);
        windowUrl.searchParams.set('skip', String(pageParam));
        window.history.pushState({}, '', windowUrl);
        
        return loader({ skip: pageParam }, window.location.origin)
      },
      initialData: {
        pages: [initialData],
        pageParams: [initialPageParam],
      },
      initialPageParam,
      getNextPageParam: (lastPage) => lastPage._allNewsMeta.next
    });

    return (
      <>
        <ul>
          {data.pages
            .flatMap((page) => page.allNews)
            .map((item) => (
              <li key={item.id}>{ item.title }</li>
            ))}
        </ul>

        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load more'
              : 'No more items'}
        </button>
      </>
    );
  },
);

export const loader = async (filter: AllNewsQueryVariables, origin: string | URL) => {
  const apiUrl = new URL('/api/news/', origin);
  Object.entries(filter).forEach(([key, value]) => {
    apiUrl.searchParams.append(key, `${value}`);
  });
  
  return await fetch(apiUrl)
    .then((response) => response.json());
};
