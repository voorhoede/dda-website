import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Column, Grid } from '@components/Grid';
import { ListForm } from '@components/ListForm';
import { Pagination } from '@components/Pagination';
import { SelectField, TextField } from '@components/Forms';
import { MemberCard } from '@blocks/MemberCard';
import { datocmsRequest } from '@lib/datocms';
import { t } from '@lib/i18n';
import { withQueryClientProvider } from '@lib/react-query';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import type {
  MemberModelOrderBy,
  MemberListQuery,
  MemberListQueryVariables,
  MemberModelFilter,
} from '@lib/types/datocms';
import './MemberList.css';
import query from './MemberList.query.graphql';

const DEFAULT_PAGE_SIZE = 6;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;
  const orderBy = searchParams.sorteren || undefined;

  const filter: MemberModelFilter = {};
  if (searchParams.zoek) {
    Object.assign(filter, {
      name: { matches: { pattern: searchParams.zoek } },
    });
  }
  if (searchParams.expertise) {
    Object.assign(filter, { expertises: { anyIn: searchParams.expertise } });
  }
  if (searchParams.omvang) {
    Object.assign(filter, { employees: { eq: searchParams.omvang } });
  }

  const { expertises, membersMeta, members } = await datocmsRequest<
    MemberListQuery,
    MemberListQueryVariables
  >({
    query: query,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
      orderBy: orderBy as MemberModelOrderBy,
      filter,
    },
  });

  return {
    expertises,
    membersMeta,
    members,
  };
};

interface Props {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
}

export const MemberList = withQueryClientProvider(
  ({ initialData, initialParams, initialUrl }: Props) => {
    const filterRef = useRef<HTMLFormElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ['members', searchParams],
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
      updateSearchParams({ ...searchParams, page: page.toString() });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
    };

    return (
      <>
        <ListForm
          ref={filterRef}
          onChange={updateFilter}
          initialValues={searchParams}
          search={({ onChange, values }) => (
            <TextField
              name="zoek"
              label={t('find_an_agency')}
              labelStyle="float"
              value={values.zoek || ''}
              onChange={(value) => onChange('zoek', value)}
            />
          )}
          filters={({ onChange, values }) => (
            <>
              <SelectField
                name="expertise"
                label="Expertise"
                labelStyle="contain"
                options={[
                  { label: t('all'), value: '' },
                  ...data.expertises.map((option) => ({
                    label: option.name,
                    value: option.id,
                  })),
                ]}
                value={values.expertise}
                onChange={(value) => onChange('expertise', value)}
              />
              <SelectField
                name="omvang"
                label="Omvang"
                labelStyle="contain"
                options={[
                  { label: t('all'), value: '' },
                  { label: '1-9', value: '1-9' },
                  { label: '10-24', value: '10-24' },
                  { label: '25-49', value: '25-49' },
                  { label: '50-99', value: '50-99' },
                  { label: '100-249', value: '100-249' },
                  { label: '250+', value: '250+' },
                ]}
                value={values.omvang}
                onChange={(value) => onChange('omvang', value)}
              />
              <SelectField
                name="sorteren"
                label="Sorteren"
                labelStyle="contain"
                options={[
                  { label: 'A-Z', value: 'name_ASC' },
                  { label: 'Z-A', value: 'name_DESC' },
                  { label: 'Aantal werknemers', value: 'employees_ASC' },
                ]}
                value={values.sorteren}
                onChange={(value) => onChange('sorteren', value)}
              />
            </>
          )}
        />
        <Grid as="ul" border={true} className="member-list">
          {data.members.map((member) => (
            <Column
              key={member.id}
              as="li"
              span={{ mobile: 12, tablet: 6, desktop: 4 }}
            >
              <MemberCard member={member} />
            </Column>
          ))}
        </Grid>
        <Pagination
          url={url}
          currentPage={Number(searchParams.page)}
          totalPages={Math.ceil(data.membersMeta.count / DEFAULT_PAGE_SIZE)}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
