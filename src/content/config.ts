import { defineCollection } from 'astro:content';
import { datocmsCollection } from '@lib/datocms';
import type {
  MemberLogoFragment,
  MemberCardFragment,
  VacancyListItemFragment,
} from '@lib/types/datocms';
import memberLogoFragment from '@blocks/MemberLogo/MemberLogo.fragment.graphql?raw';
import vacancyListItemFragment from '@blocks/VacancyList/VacancyListItem.fragment.graphql?raw';
import memberCardFragment from '@blocks/MemberCard/MemberCard.fragment.graphql?raw';

const memberLogos = defineCollection({
  loader: async () => {
    return datocmsCollection({
      collection: 'Members',
      fragment: memberLogoFragment,
      fragmentName: 'MemberLogo',
    }) as Promise<MemberLogoFragment[]>;
  },
});

const members = defineCollection({
  loader: async () => {
    return datocmsCollection({
      collection: 'Members',
      fragment: memberCardFragment,
      fragmentName: 'MemberCard',
    }) as Promise<MemberCardFragment[]>;
  },
});

const vacancies = defineCollection({
  loader: async () => {
    return datocmsCollection({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    }) as Promise<VacancyListItemFragment[]>;
  },
});

const vacancyLocations = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollection({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    })) as VacancyListItemFragment[];

    return [
      ...new Set(
        vacancies.map((vacancy) => ({
          id: vacancy.location,
          label: vacancy.location,
        })),
      ),
    ];
  },
});

const vacancyHours = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollection({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    })) as VacancyListItemFragment[];

    return [
      ...new Set(
        vacancies.map((vacancy) => ({
          id: vacancy.weeklyHours,
          label: vacancy.weeklyHours,
        })),
      ),
    ];
  },
});

const vacancyLanguages = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollection({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    })) as VacancyListItemFragment[];

    return [
      ...new Set(
        vacancies.map((vacancy) => ({
          id: vacancy.language,
          label: vacancy.language,
        })),
      ),
    ];
  },
});

export const collections = {
  members,
  memberLogos,
  vacancies,
  vacancyLocations,
  vacancyHours,
  vacancyLanguages,
};
