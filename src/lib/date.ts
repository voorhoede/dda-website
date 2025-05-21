import { getLocale } from './i18n';

export const getToday = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  return today;
};

export const formatDate = (startDate: string, endDate?: string) => {
  if (!startDate) return '';

  const fmt = new Intl.DateTimeFormat(getLocale(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (!endDate) return fmt.format(new Date(startDate));

  return fmt.formatRange(new Date(startDate), new Date(endDate));
};
