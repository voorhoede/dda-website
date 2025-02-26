import type { APIRoute } from 'astro';
import type { VacancyListItemFragment } from '@lib/types/datocms';
import { datocmsCollection } from '@lib/datocms';

import vacancyListItemFragment from '@components/VacancyListItem/VacancyListItem.fragment.graphql?raw';

export const prerender = true;

export const GET: APIRoute = async () => {
  const vacancies = (await datocmsCollection({
    collection: 'Vacancies',
    fragment: vacancyListItemFragment,
    fragmentName: 'VacancyListItem',
  })) as VacancyListItemFragment[];

  return new Response(
    JSON.stringify(
      Array.from(
        new Map(
          vacancies.map((vacancy) => [
            vacancy.language,
            { label: vacancy.language, value: vacancy.language },
          ]),
        ).values(),
      ),
    ),
  );
};
