import { MemberCard } from '@blocks/MemberCard';
import { SelectField, TextField } from '@components/Forms';
import { Column, Grid } from '@components/Grid';
import { ListForm } from '@components/ListForm';
import { datocmsCollection, datocmsRequest } from '@lib/datocms';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { t } from '@lib/i18n';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import { shuffle } from '@lib/seed-random';
import type {
  MemberCardFragment,
  MemberListQuery,
  MemberListQueryVariables,
  MemberModelFilter,
} from '@lib/types/datocms';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import memberCardFragment from '../MemberCard/MemberCard.fragment.graphql?raw';
import './MemberList.css';
import query from './_MemberList.query.graphql';

export const loader = async (
  searchParams: Record<string, string>,
  seed: number,
) => {
  const orderBy = searchParams.sorteren;
  const filter: MemberModelFilter = {};

  if (searchParams.zoek) {
    Object.assign(filter, {
      name: { matches: { pattern: searchParams.zoek } },
    });
  }
  if (searchParams.provincie) {
    Object.assign(filter, { provinces: { anyIn: searchParams.provincie } });
  }
  if (searchParams.omvang) {
    Object.assign(filter, { employees: { eq: searchParams.omvang } });
  }

  const hasFilters = Object.keys(filter).length > 0;

  const { provinces } = await datocmsRequest<
    MemberListQuery,
    MemberListQueryVariables
  >({
    query: query,
  });

  let members = await datocmsCollection<MemberCardFragment>({
    collection: 'Members',
    fragment: memberCardFragment,
    fragmentName: 'MemberCard',
    filter,
    orderBy: orderBy || 'name_ASC',
  });

  if (!hasFilters && !orderBy) {
    const newMembers = shuffle<MemberCardFragment>(members, seed);

    members = newMembers;
  }

  return {
    provinces,
    members,
  };
};

export const MemberList = withQueryClientProvider(
  ({
    initialParams,
    seed,
  }: QueryClientProviderComponentProps & { seed: number }) => {
    const filterRef = useRef<HTMLFormElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);

    const { data } = useQuery({
      queryKey: ['members', searchParams, seed],
      queryFn: () => loader(searchParams, seed),
    });

    const updateFilter = (filter: Record<string, string>) => {
      updateSearchParams({ ...filter, page: undefined });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
      
      if(listRef.current) {
        listRef.current.focus();
      }
    };

    if (!data) {
      return null;
    }

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
                name="provincie"
                label={t('province')}
                labelStyle="contain"
                options={[
                  { label: t('all'), value: '' },
                  ...data.provinces.map((option) => ({
                    label: option.name,
                    value: option.id,
                  })),
                ]}
                value={values.provincie}
                onChange={(value) => onChange('provincie', value)}
              />
              <SelectField
                name="omvang"
                label={t('company_size')}
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
                label={t('sort')}
                labelStyle="contain"
                options={[
                  { label: t('none'), value: '' },
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
        <Grid as="ul" ref={listRef} aria-live="polite" border={true} className="member-list">
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
      </>
    );
  },
);
