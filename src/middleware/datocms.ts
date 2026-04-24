import { defineMiddleware } from 'astro:middleware';
import {
  DATOCMS_READONLY_API_TOKEN,
} from 'astro:env/client';
import { datocmsEnvironment } from '@root/datocms-environment';

export const datocms = defineMiddleware(async ({ locals }, next) => {
  Object.assign(locals, {
    datocmsEnvironment,
    datocmsToken: DATOCMS_READONLY_API_TOKEN,
  });
  const response = await next();
  return response;
});
