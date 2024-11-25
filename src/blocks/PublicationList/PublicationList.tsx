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
import type { PublicationRecord } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import publicationListQuery from './PublicationList.query.graphql';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { withQueryClientProvider } from '@lib/react-query';
import { Pagination } from '@components/Pagination/Pagination';

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const first = 2;
  const skip = (page - 1) * first;

  const { publications } = await datocmsRequest<{
    publications: PublicationRecord[];
  }>({
    query: publicationListQuery,
    variables: {
      first,
      skip,
    },
  });

  return {
    publications,
  };
};

type PublicationListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
};

export const PublicationList = withQueryClientProvider(
  ({ initialData, initialParams }: PublicationListProps) => {
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);

    const { data } = useQuery({
      queryKey: ['publications', searchParams.page],
      queryFn: () => loader(searchParams),
      initialData,
    });

    const updatePage = (page: number) =>
      updateSearchParams({ page: page.toString() });

    return (
      <>
        <DataList className="container-padding-x container-padding-y">
          {data?.publications.map((publication) => (
            <DataListItem key={publication.id}>
              <TagList>
                {publication.tags.map(({ label }) => (
                  <TagListItem key={label}>{label}</TagListItem>
                ))}
              </TagList>
              <Heading displayLevel={4} level={3}>
                {publication.title}
              </Heading>
              <DataListItemFooter>
                <Text variant="subtext">
                  <time dateTime={publication._createdAt}>
                    {formatDate(publication._createdAt)}
                  </time>
                </Text>
                <Button
                  as="a"
                  height="narrow"
                  icon="arrow-right"
                  level="secondary"
                  variant="large"
                >
                  {t('read_more')}
                </Button>
              </DataListItemFooter>
            </DataListItem>
          ))}
        </DataList>
        <Pagination
          currentPage={Number(searchParams.page)}
          totalPages={2}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
