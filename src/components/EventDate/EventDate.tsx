import { formatDate } from '@lib/date';

export type EventDateProps = {
  startDate: string;
  endDate?: string | null;
};

export const EventDate = ({ startDate, endDate }: EventDateProps) => {
  if (!startDate) return null;
  if (!endDate)
    return <time dateTime={startDate}>{formatDate(startDate)}</time>;

  return <span>{formatDate(startDate, endDate)}</span>;
};
