import { getLocale } from './i18n';

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString(getLocale(), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
