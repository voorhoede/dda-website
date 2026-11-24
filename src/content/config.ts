import { defineCollection } from 'astro:content';
import { datocmsCollectionOnce } from '@lib/datocms';
import type {
  MemberLogoFragment,
  MemberCardFragment,
  VacancyListItemFragment,
  PartnerLogoFragment,
} from '@lib/types/datocms';
import vacancyListItemFragment from '@blocks/VacancyList/VacancyListItem.fragment.graphql?raw';
import memberFragment from './members/index.fragment.graphql?raw';
import partnerFragment from '@blocks/PartnerBanner/PartnerLogo.fragment.graphql?raw';
import tracks from './tracks';
import aiInternships from './ai-internships';
import aiInternshipAssignmentTypes from './ai-internship-assignment-types';
import provinces from './provinces';
import emailTemplates from './email-templates';
import languages from './languages';

// Members are needed in two shapes (logo and card). Fetch them once with the
// combined fragment and map the result to each shape.
type MemberAll = Omit<MemberLogoFragment & MemberCardFragment, 'logo'> & {
  logoForLogo: MemberLogoFragment['logo'];
  logoForCard: MemberCardFragment['logo'];
};

const getMembers = () =>
  datocmsCollectionOnce<MemberAll>({
    collection: 'Members',
    fragment: memberFragment,
    fragmentName: 'MemberAll',
  });

const memberLogos = defineCollection({
  loader: async (): Promise<MemberLogoFragment[]> => {
    const members = await getMembers();

    return members.map(({ id, brandColor, logoForLogo }) => ({
      id,
      brandColor,
      logo: logoForLogo,
    }));
  },
});

const members = defineCollection({
  loader: async (): Promise<MemberCardFragment[]> => {
    const members = await getMembers();

    return members.map(
      ({ id, name, logoForCard, banner, location, employees, slug, vacancies }) => ({
        id,
        name,
        logo: logoForCard,
        banner,
        location,
        employees,
        slug,
        vacancies,
      }),
    );
  },
});

const vacancies = defineCollection({
  loader: async () => {
    return datocmsCollectionOnce({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    }) as Promise<VacancyListItemFragment[]>;
  },
});

const partners = defineCollection({
  loader: async () => {
    return datocmsCollectionOnce({
      collection: 'Partners',
      fragment: partnerFragment,
      fragmentName: 'PartnerLogo',
    }) as Promise<PartnerLogoFragment[]>;
  },
});

const vacancyLocations = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollectionOnce({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    })) as VacancyListItemFragment[];

    return [...new Set(vacancies.map((vacancy) => vacancy.location))]
      .sort((a, b) => a.localeCompare(b))
      .map((location) => ({
        id: location,
        label: location,
      }));
  },
});

const vacancyEmploymentTypes = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollectionOnce({
      collection: 'Vacancies',
      fragment: vacancyListItemFragment,
      fragmentName: 'VacancyListItem',
    })) as VacancyListItemFragment[];

    return [
      ...new Set(
        vacancies.map((vacancy) => ({
          id: vacancy.employmentType.id,
          label: vacancy.employmentType.name,
        })),
      ),
    ];
  },
});

const vacancyHours = defineCollection({
  loader: async () => {
    const vacancies = (await datocmsCollectionOnce({
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
    const vacancies = (await datocmsCollectionOnce({
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
  partners,
  vacancyLocations,
  vacancyEmploymentTypes,
  vacancyHours,
  vacancyLanguages,
  tracks,
  aiInternships,
  aiInternshipAssignmentTypes,
  provinces,
  emailTemplates,
  languages
};
