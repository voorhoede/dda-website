import { sequence } from 'astro:middleware';
import { domainRouting } from './domain-routing';
import { headers } from './headers';
import { datocms } from './datocms';
import { i18n } from './i18n';
import { preview } from './preview';
import { forceTrailingSlash } from './force-trailing-slash';
import { redirects } from './redirects';

export { hashSecret, previewCookieName } from './preview';

export const onRequest = sequence(
  domainRouting,
  headers,
  datocms,
  i18n,
  preview,
  forceTrailingSlash,
  redirects,
);
