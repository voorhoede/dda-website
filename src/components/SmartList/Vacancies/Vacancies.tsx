import type { VacanciesQuery } from '@lib/types/datocms';
import { VacancyList } from '@components/VacancyList';

type Props = {
  data: VacanciesQuery['items'];
};


export const Vacancies = ({ data }: Props) => {
  return (
    <VacancyList vacancies={data} />
  );
}
