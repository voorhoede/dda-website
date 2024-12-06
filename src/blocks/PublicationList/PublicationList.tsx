import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Column, Grid } from '@components/Grid';
import { ListForm } from '@components/ListForm';
import { Pagination } from '@components/Pagination';
import { SelectField, TextField } from '@components/Forms';
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
import { datocmsRequest } from '@lib/datocms';
import { withQueryClientProvider } from '@lib/react-query';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import type { PublicationsListQuery } from '@lib/types/datocms';
import publicationListQuery from './PublicationList.query.graphql';

const DEFAULT_PAGE_SIZE = 10;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;

  const filter: Record<string, string> = {};

  if (searchParams.zoek) {
    Object.assign(filter, {
      title: { matches: { pattern: searchParams.zoek } },
    });
  }
  if (searchParams.tag) {
    Object.assign(filter, { tags: { anyIn: searchParams.tag } });
  }

  const { publications, tags, publicationsMeta } =
    await datocmsRequest<PublicationsListQuery>({
      query: publicationListQuery,
      variables: {
        first: DEFAULT_PAGE_SIZE,
        skip,
        filter,
      },
    });

  return {
    tags,
    publications,
    publicationsMeta,
  };
};

type PublicationListProps = {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
};

export const PublicationList = withQueryClientProvider(
  ({ initialData, initialParams, initialUrl }: PublicationListProps) => {
    const filterRef = useRef<HTMLFormElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ['publications', searchParams],
      queryFn: () => loader(searchParams),
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
      updateSearchParams({ page: page.toString() });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
    };

    return (
      <Grid border>
        <Column span={12}>
          <ListForm
            ref={filterRef}
            initialValues={searchParams}
            onChange={updateFilter}
            search={({ onChange, values }) => (
              <TextField
                name="zoek"
                label={t('find_a_publication')}
                labelStyle="float"
                value={values.zoek || ''}
                onChange={(value) => onChange('zoek', value)}
                type="search"
              />
            )}
            filters={({ onChange, values }) => (
              <>
                <SelectField
                  name="tag"
                  label={t('subject')}
                  labelStyle="contain"
                  options={[
                    {
                      label: t('all'),
                      value: '',
                    },
                    ...data.tags.map((tag) => ({
                      label: tag.label,
                      value: tag.id,
                    })),
                  ]}
                  value={values.tag || ''}
                  onChange={(value) => onChange('tag', value)}
                />
              </>
            )}
          />
        </Column>
        <Column span={12}>
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
        </Column>

        <Column span={12} className="container-padding-x container-padding-y">
          <Pagination
            url={url}
            currentPage={Number(searchParams.page) || 1}
            totalPages={Math.ceil(
              data.publicationsMeta.count / DEFAULT_PAGE_SIZE,
            )}
            onPageChange={updatePage}
          />
        </Column>
      </Grid>
    );
  },
);
