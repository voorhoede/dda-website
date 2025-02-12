import { VacancyDataList } from '@components/VacancyDataList';

type Props = {
  data: VacanciesQuery['items'];
};


export const Vacancies = ({ data }: Props) => {
  return (
    <VacancyDataList vacancies={data} />
  );
}
