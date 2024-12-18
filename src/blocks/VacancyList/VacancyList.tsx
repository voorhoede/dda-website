import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { VacancyListQuery } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import vacancyListQuery from './VacancyList.query.graphql';
import { useSearchParams } from '@lib/hooks/use-search-params';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import { useUrl } from '@lib/hooks/use-url';
import { Column, Grid } from '@components/Grid';
import { VacancyDataList } from '@components/VacancyDataList';
import { Pagination } from '@components/Pagination';
import { ListForm } from '@components/ListForm';
import { TextField, SelectField } from '@components/Forms';
import type { getCollection } from 'astro:content';
import { t } from '@lib/i18n';

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
  
  if (searchParams.soort) {
    Object.assign(filter, { employmentType: { eq: searchParams.soort } });
  }

  if (searchParams.uren) {
    Object.assign(filter, { weeklyHours: { eq: searchParams.uren } });
  }

  if (searchParams.voertaal) {
    Object.assign(filter, { language: { eq: searchParams.voertaal } });
  }
  
  if (searchParams.locatie) {
    Object.assign(filter, { location: { eq: searchParams.locatie } });
  }

  const { vacancies, vacanciesMeta } = await datocmsRequest<VacancyListQuery>({
    query: vacancyListQuery,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
      filter,
    },
  });

  return {
    vacancies,
    vacanciesMeta,
  };
};

type FilterValuesType = {
  locations: Awaited<ReturnType<typeof getCollection<'vacancyLocations'>>>;
  employmentTypes: Awaited<ReturnType<typeof getCollection<'vacancyEmploymentTypes'>>>;
  hours: Awaited<ReturnType<typeof getCollection<'vacancyHours'>>>;
  languages: Awaited<ReturnType<typeof getCollection<'vacancyLanguages'>>>;
};

type VacancyListProps = {
  filterValues: FilterValuesType;
};

export const VacancyList = withQueryClientProvider(
  ({
    initialParams,
    initialUrl,
    filterValues,
  }: QueryClientProviderComponentProps & VacancyListProps) => {
    const dataListRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLFormElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ['vacancies', searchParams],
      queryFn: () => loader(searchParams),
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

    if (!data) {
      return null;
    }

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
                label={t('search_vacancies')}
                labelStyle="float"
                value={values.zoek || ''}
                onChange={(value) => onChange('zoek', value)}
                type="search"
              />
            )}
            filters={({ onChange, values }) => (
              <>
                <SelectField
                  name="locatie"
                  label={t('location')}
                  labelStyle="contain"
                  options={[
                    { label: t('all'), value: '' },
                    ...filterValues.locations.map((location) => ({
                      label: location.data.label,
                      value: location.id,
                    })),
                  ]}
                  value={values.locatie}
                  onChange={(value) => onChange('locatie', value)}
                />
                <SelectField
                  name="soort"
                  label={ t('type') }
                  labelStyle="contain"
                  options={[
                    { label: t('all'), value: '' },
                    ...filterValues.employmentTypes.map((hours) => ({
                      label: hours.data.label,
                      value: hours.id,
                    })),
                  ]}
                  value={values.soort}
                  onChange={(value) => onChange('soort', value)}
                />
                <SelectField
                  name="uren"
                  label={t('hours')}
                  labelStyle="contain"
                  options={[
                    { label: t('all'), value: '' },
                    ...filterValues.hours.map((hours) => ({
                      label: hours.data.label,
                      value: hours.id,
                    })),
                  ]}
                  value={values.uren}
                  onChange={(value) => onChange('uren', value)}
                />
                <SelectField
                  name="voertaal"
                  label={ t('work_language') }
                  labelStyle="contain"
                  options={[
                    { label: t('all'), value: '' },
                    ...filterValues.languages.map((language) => ({
                      label: language.data.label,
                      value: language.id,
                    })),
                  ]}
                  value={values.voertaal}
                  onChange={(value) => onChange('voertaal', value)}
                />
              </>
            )}
          />
        </Column>
        <Column span={12}>
          <Grid>
            <Column span={12}>
              <VacancyDataList vacancies={data.vacancies} ref={dataListRef} />
            </Column>
            <Column
              span={12}
              className="container-padding-x container-padding-y"
            >
              <Pagination
                url={url}
                currentPage={Number(searchParams.page)}
                totalPages={Math.ceil(
                  data.vacanciesMeta.count / DEFAULT_PAGE_SIZE,
                )}
                onPageChange={updatePage}
              />
            </Column>
          </Grid>
        </Column>
      </Grid>
    );
  },
);
