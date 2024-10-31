import { withQueryClientProvider } from '@lib/react/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

type DataListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialFilter: any;
};

export const DataList = withQueryClientProvider<DataListProps>(
  ({ initialData, initialFilter }) => {
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
        pageParams: [initialFilter],
      },
      intialPageParam: initialFilter.skip || 0,
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

export const loader = async (filter: any, origin: string | URL) => {
  const apiUrl = new URL('/api/news/', origin);
  Object.entries(filter).forEach(([key, value]) => {
    apiUrl.searchParams.append(key, value);
  });
  
  return await fetch(apiUrl)
    .then((response) => response.json());
};
