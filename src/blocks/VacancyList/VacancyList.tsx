import { SelectField, TextField } from '@components/Forms';
import { Column, Grid } from '@components/Grid';
import { ListForm } from '@components/ListForm';
import { Pagination } from '@components/Pagination';
import { VacancyDataList } from '@components/VacancyDataList';
import { datocmsRequest } from '@lib/datocms';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { useUrl } from '@lib/hooks/use-url';
import { t } from '@lib/i18n';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import type { VacancyListQuery } from '@lib/types/datocms';
import { useQuery } from '@tanstack/react-query';
import type { getCollection } from 'astro:content';
import { useRef } from 'react';
import vacancyListQuery from './VacancyList.query.graphql';

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
  
  if (searchParams.provincie) {
    Object.assign(filter, { province: { eq: searchParams.provincie } });
  }

  const { provinces, vacancies, vacanciesMeta } = await datocmsRequest<VacancyListQuery>({
    query: vacancyListQuery,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
      filter,
    },
  });

  return {
    provinces,
    vacancies,
    vacanciesMeta,
  };
};

type FilterValuesType = {
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
      
      if (dataListRef.current) {
        dataListRef.current.focus();
      }
    };

    const updatePage = (page: number) => {
      updateSearchParams({ page: page.toString() });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }
      
      if (dataListRef.current) {
        dataListRef.current.focus();
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
              <VacancyDataList ref={dataListRef} aria-live="polite" vacancies={data.vacancies} />
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
