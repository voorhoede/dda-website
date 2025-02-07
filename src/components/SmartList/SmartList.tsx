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
import { t } from '@lib/i18n';

import './SmartList.css';
import { useRef } from 'react';

interface Props {
  endpoint: Endpoint;
  filter: FilterType;
  fixedFilters?: Record<string, string>;
  initialParams: Record<string, string>;
}

export const SmartList = withQueryClientProvider<
  Props & QueryClientProviderComponentProps
>(({ endpoint, filter, fixedFilters, initialParams, initialUrl }) => {
  const [searchParams, updateSearchParams] = useSearchParams(initialParams);
  const url = useUrl(initialUrl);
  const listRef = useRef<HTMLFormElement>(null);
  
  const ListComponent = api[endpoint].Component;

  const { data } = useQuery({
    queryKey: [endpoint, searchParams],
    queryFn: async () => {
      const params = new URLSearchParams({ ...searchParams, ...fixedFilters });
      const response = await fetch(`${endpoint}?${params.toString()}`);
      return await response.json();
    },
  });

  const handleFilterChange = (data) => {
    updateSearchParams({ ...data, page: null });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ ...searchParams, page: page.toString() });
    
    const listElement = listRef.current;
    if (listElement) {
      listElement.scrollIntoView();
      listElement.focus();
    }
  };

  return (
    <Filter
      ref={listRef}
      endpoint={endpoint}
      search={filter.search}
      filters={filter.filters}
      initialValues={initialParams}
      onChange={handleFilterChange}
    >
      {data && (
        <>
          {data.items.length > 0 ? (
            <ListComponent data={data.items} /> 
          ) : (
            <p role="alert" className='empty-message'>{t('no_results')}</p>
          )}
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
