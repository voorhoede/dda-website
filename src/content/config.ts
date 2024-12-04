import { defineCollection } from 'astro:content';
import { datocmsCollection } from '@lib/datocms';
import type {
  MemberLogoFragment,
  VacancyListItemFragment,
  PartnerLogoFragment,
} from '@lib/types/datocms';
import memberLogoFragment from '@blocks/MemberLogo/MemberLogo.fragment.graphql?raw';
import vacancyListItemFragment from '@blocks/VacancyList/VacancyListItem.fragment.graphql?raw';
import partnerFragment from '@blocks/PartnerBanner/PartnerLogo.fragment.graphql?raw';

const memberLogos = defineCollection({
  loader: async () => {
    return datocmsCollection({
      collection: 'Members',
      fragment: memberLogoFragment,
      fragmentName: 'MemberLogo',
    }) as Promise<MemberLogoFragment[]>;
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

const partners = defineCollection({
  loader: async () => {
    return datocmsCollection({
      collection: 'Partners',
      fragment: partnerFragment,
      fragmentName: 'PartnerLogo',
    }) as Promise<PartnerLogoFragment[]>;
  },
});

export const collections = {
  memberLogos,
  vacancies,
  partners,
};
