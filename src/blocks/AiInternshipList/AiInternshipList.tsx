import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AiInternshipListQuery } from '@lib/types/datocms';
import { datocmsRequest } from '@lib/datocms';
import { useSearchParams } from '@lib/hooks/use-search-params';
import { t } from '@lib/i18n';
import {
  withQueryClientProvider,
  type QueryClientProviderComponentProps,
} from '@lib/react-query';
import { SelectField, TextField } from '@components/Forms';
import { Column, Grid } from '@components/Grid';
import { ListForm } from '@components/ListForm';

import query from './AiInternshipList.query.graphql';

import './AiInternshipList.css';
import { Heading } from '@components/Heading';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { SRCImage } from 'react-datocms';
import { TagList, TagListItem } from '@components/Tag';
import type { getCollection } from 'astro:content';

type FilterValuesType = {
  trackOptions: Awaited<ReturnType<typeof getCollection<'tracks'>>>;
  assignmentTypeOptions: Awaited<ReturnType<typeof getCollection<'aiInternshipAssignmentTypes'>>>;
  provinceOptions: Awaited<ReturnType<typeof getCollection<'provinces'>>>;
  languageOptions: Awaited<ReturnType<typeof getCollection<'languages'>>>;
};

type AiInternshipListProps = {
  filterValues: FilterValuesType;
};

export const loader = async (searchParams: Record<string, string>) => {
  const filter: Record<string, string> = {};

  if (searchParams.search) {
    Object.assign(filter, {
      title: { matches: { pattern: searchParams.search } },
    });
  }
  
  if (searchParams.track) {
    Object.assign(filter, { track: { eq: searchParams.track } });
  }
  
  if (searchParams.assignmentType) {
    Object.assign(filter, { assignmentType: { eq: searchParams.assignmentType } });
  }
  
  if (searchParams.province) {
    Object.assign(filter, { province: { eq: searchParams.province } });
  }
  
  if (searchParams.language) {
    Object.assign(filter, { language: { eq: searchParams.language } });
  }

  const { items } = await datocmsRequest<AiInternshipListQuery>({
    query,
    variables: {
      filter,
    },
  });

  return {
    items,
  };
};

export const AiInternshipList = withQueryClientProvider(
  ({ initialParams, filterValues }: QueryClientProviderComponentProps & AiInternshipListProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLFormElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);

    const { data } = useQuery({
      queryKey: ['ai-internships', searchParams],
      queryFn: () => loader(searchParams),
    });

    const updateFilter = (filter: Record<string, string>) => {
      updateSearchParams({ ...filter });

      if (filterRef.current) {
        filterRef.current.scrollIntoView({
          behavior: 'instant',
        });
      }

      if (listRef.current) {
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
              name="search"
              label={t('find_an_ai_internship')}
              labelStyle="float"
              value={values.search || ''}
              onChange={(value) => onChange('search', value)}
            />
          )}
          filters={({ onChange, values }) => <>
            <SelectField
              name="track"
              label={t('track')}
              labelStyle="contain"
              options={[
                { label: t('all'), value: '' },
                ...filterValues.trackOptions.map((track) => ({
                  label: track.data.name,
                  value: track.id,
                })),
              ]}
              value={values.track}
              onChange={(value) => onChange('track', value)}
            />
            <SelectField
              name="assignmentType"
              label={t('type')}
              labelStyle="contain"
              options={[
                { label: t('all'), value: '' },
                ...filterValues.assignmentTypeOptions.map((assignmentType) => ({
                  label: assignmentType.data.name,
                  value: assignmentType.id,
                })),
              ]}
              value={values.assignmentType}
              onChange={(value) => onChange('assignmentType', value)}
            />
            <SelectField
              name="province"
              label={t('province')}
              labelStyle="contain"
              options={[
                { label: t('all'), value: '' },
                ...filterValues.provinceOptions.map((province) => ({
                  label: province.data.name,
                  value: province.id,
                })),
              ]}
              value={values.province}
              onChange={(value) => onChange('province', value)}
            />
            <SelectField
              name="language"
              label={t('language')}
              labelStyle="contain"
              options={[
                { label: t('all'), value: '' },
                ...filterValues.languageOptions.map((language) => ({
                  label: language.data.name,
                  value: language.id,
                })),
              ]}
              value={values.language}
              onChange={(value) => onChange('language', value)}
            />
          </>}
        />

        <Grid
          as="ul"
          ref={listRef}
          aria-live="polite"
          border={data.items.length > 0}
          className="ai-internship-list"
        >
          {data.items.map((item) => (
            <Column
              key={item.id}
              as="li"
              span={{ mobile: 12, tablet: 6, desktop: 4 }}
            >
              <Card>
                {item.company[0].logo.responsiveImage && (
                  <CardImage>
                    <SRCImage
                      data={
                        item.banner?.responsiveImage ||
                        item.company[0].banner?.responsiveImage ||
                        item.company[0].logo.responsiveImage
                      }
                      usePlaceholder={false}
                      priority={false}
                    />
                  </CardImage>
                )}
                <CardContent>
                  <TagList>
                    <TagListItem>{item.track.name}</TagListItem>
                    <TagListItem>{item.assignmentType.name}</TagListItem>
                  </TagList>
                  <Text variant="subtext">{item.province.name} / {item.language.name}</Text>
                  <Heading level={3}>{item.company[0].name}</Heading>
                </CardContent>
                <CardFooter>
                  <Button
                    as="a"
                    height="narrow"
                    icon="arrow-right"
                    level="secondary"
                    variant="large"
                    href={`/ai-stages/vacatures/${item.id}`}
                    targetArea="parent"
                  >
                    {t('details')}
                    <span className="a11y-sr-only">
                      {t('_about_subject', { subject: item.company[0].name })}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </Column>
          ))}
        </Grid>

        {data.items.length === 0 && (
          <p role="alert" className="empty-message">
            {t('no_results')}
          </p>
        )}
      </>
    );
  },
);
