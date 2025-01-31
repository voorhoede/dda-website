import type { Endpoint, Filter as FilterType } from '@lib/api';
import { useQuery } from '@tanstack/react-query';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import { api } from '@lib/api';
import { Filter } from '@components/Filter/Filter';
import { Pagination } from '@components/NewPagination/Pagination';

interface Props {
  endpoint: Endpoint;
  filter: FilterType;
  fixedFilters?: Record<string, string>;
  initialParams: Record<string, string>;
}

export const DataList = withQueryClientProvider<
  Props & QueryClientProviderComponentProps
>(({ endpoint, filter, fixedFilters, initialParams, initialUrl }) => {
  const [searchParams, updateSearchParams] = useSearchParams(initialParams);
  const url = useUrl(initialUrl);
  
  const ListComponent = api[endpoint].Component;

  const { data } = useQuery({
    queryKey: [endpoint, searchParams],
    queryFn: async () => {
      const params = new URLSearchParams({ ...searchParams, ...fixedFilters });
      const response = await fetch(`${endpoint}?${params.toString()}`);
      const { meta, items } = await response.json();
      return { meta, items };
    },
  });

  const handleFilterChange = (data) => {
    updateSearchParams(data);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ ...searchParams, page: page.toString() });
  };

  return (
    <Filter
      endpoint={endpoint}
      search={filter.search}
      filters={filter.filters}
      initialValues={initialParams}
      onChange={handleFilterChange}
    >
      {data && (
        <>
          <ListComponent data={data.items} />
          <Pagination
            url={url}
            currentPage={Number(searchParams.page || 1)}
            recordsCount={data.meta.count}
            recordsPerPage={10}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Filter>
  );
});
