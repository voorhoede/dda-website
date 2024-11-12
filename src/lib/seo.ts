/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Tag } from './types/datocms';
import { getLocale } from './i18n';
import { globalSeo, locales } from './site.json';
import type { SiteLocale } from './i18n.types';

export type PageUrl = {
  locale: SiteLocale;
  pathname: string;
};

const locale = getLocale();

// The structure of globalSeo changes based on if there are multiple locales available
// We cast it to 'any' to be able to handle both structures
export const siteName =
  locales.length > 1
    ? (globalSeo as any)[locale].siteName
    : (globalSeo as any).siteName;
export const titleSuffix =
  locales.length > 1
    ? (globalSeo as any)[locale].titleSuffix
    : (globalSeo as any).titleSuffix;

export const noIndexTag: Tag = {
  attributes: { name: 'robots' },
  content: 'noindex',
  tag: 'meta',
};

export const titleTag = (title: string): Tag => ({
  tag: 'title',
  content: `${title} ${titleSuffix}`,
});
