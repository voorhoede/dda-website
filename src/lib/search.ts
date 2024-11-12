import { globalSeo } from './site.json';

export const queryParamName = 'query';
export const minQueryLength = 3;
export const hasValidQuery = (query: string) => query.length >= minQueryLength;
export const getOpenSearchName = () => `${globalSeo.siteName}`;

// https://www.datocms.com/docs/site-search/excluding-text
export const datocmsNoIndex = { 'data-datocms-noindex': '' };
