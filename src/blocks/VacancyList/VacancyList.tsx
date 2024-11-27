import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { VacancyListQuery } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import vacancyListQuery from './VacancyList.query.graphql';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { withQueryClientProvider } from '@lib/react-query';
import { useUrl } from '@lib/hooks/use-url';
import { Column, Grid } from '@components/Grid';
import { VacancyDataList } from '@components/VacancyDataList';
import { Pagination } from '@components/Pagination';

const DEFAULT_PAGE_SIZE = 4;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;

  const { vacancies, vacanciesMeta } = await datocmsRequest<VacancyListQuery>({
    query: vacancyListQuery,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
    },
  });

  return {
    vacancies,
    vacanciesMeta,
  };
};

type VacancyListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
};

export const VacancyList = withQueryClientProvider(
  ({ initialData, initialParams, initialUrl }: VacancyListProps) => {
    const dataListRef = useRef<HTMLUListElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ['vacancies', searchParams.page],
      queryFn: () => loader(searchParams),
      initialData,
    });

    const updatePage = (page: number) => {
      updateSearchParams({ page: page.toString() });

      if (dataListRef.current) {
        dataListRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
    };

    return (
      <Grid>
        <Column span={12}>
          <VacancyDataList vacancies={data.vacancies} ref={dataListRef} />
        </Column>

        <Column span={12} className="container-padding-x container-padding-y">
          <Pagination
            url={url}
            currentPage={Number(searchParams.page)}
            totalPages={Math.ceil(data.vacanciesMeta.count / DEFAULT_PAGE_SIZE)}
            onPageChange={updatePage}
          />
        </Column>
      </Grid>
    );
  },
);
