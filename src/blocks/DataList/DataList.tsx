import { withQueryClientProvider } from '@lib/react/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

type DataListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
};

export const DataList = withQueryClientProvider<DataListProps>(
  ({ initialData }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteQuery({
        queryKey: ['pokemon'],
        queryFn: ({ pageParam = 0 }) => loader(pageParam),
        initialData: {
          pages: [initialData],
          pageParams: [0],
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          if (!lastPage?.next) return undefined;

          const url = new URL(lastPage.next);
          const offset = url.searchParams.get('offset');

          return offset ? parseInt(offset) : undefined;
        },
      });

    return (
      <>
        <ul>
          {data.pages
            .flatMap((page) => page.results)
            .map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
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
              : 'No more pokemon'}
        </button>
      </>
    );
  },
);

export const loader = async (offset: number = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  return await fetch(url).then((res) => res.json());
};
