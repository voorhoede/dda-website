import type { VacancyListItemFragment } from '@lib/types/datocms';
import { forwardRef } from 'react';
import { VacancyListItem } from '@components/VacancyListItem/VacancyListItem';

import './VacancyList.css';

export const VacancyList = forwardRef<
  HTMLUListElement,
  { vacancies: VacancyListItemFragment[] }
>(({ vacancies }, ref) => {
  return (
    <ul className="vacancy-list" ref={ref}>
      {vacancies.map((vacancy) => (
        <VacancyListItem key={vacancy.id} vacancy={vacancy} />
      ))}
    </ul>
  );
});
