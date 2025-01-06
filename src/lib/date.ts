import { getLocale } from './i18n';

export const getToday = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  return today;
};

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString(getLocale(), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
