import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/Button';
import {
  DataList,
  DataListItem,
  DataListItemFooter,
} from '@components/DataList';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { TagList, TagListItem } from '@components/Tag';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';
import type { VacanciesListQuery } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import vacancyListQuery from './VacancyList.query.graphql';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { withQueryClientProvider } from '@lib/react-query';
import { Pagination } from '@components/Pagination/Pagination';
import { useUrl } from '@lib/hooks/use-url';
import { Column, Grid } from '@components/Grid';
import { useRef } from 'react';

const DEFAULT_PAGE_SIZE = 10;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;

  const { vacancies, vacanciesMeta } = await datocmsRequest<VacanciesListQuery>(
    {
      query: vacancyListQuery,
      variables: {
        first: DEFAULT_PAGE_SIZE,
        skip,
      },
    },
  );

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
          <VacanciesSection vacancies={data.vacancies} />
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
