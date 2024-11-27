import { defineConfig, envField, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import graphql from '@rollup/plugin-graphql';
import sitemap from '@astrojs/sitemap';
import type { PluginOption } from 'vite';
import { isPreview } from './config/preview';
import pkg from './package.json';

import react from '@astrojs/react';

const productionUrl = `https://${pkg.name}.pages.dev`; // overwrite if you have a custom domain
const localhostPort = 4323; // 4323 is "head" in T9
export const siteUrl = process.env.CF_PAGES
  ? process.env.CF_PAGES_BRANCH === 'main'
    ? productionUrl
    : process.env.CF_PAGES_URL
  : `http://localhost:${localhostPort}`;

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      DATOCMS_READONLY_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.DATOCMS_READONLY_API_TOKEN,
      }),
      HEAD_START_PREVIEW_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.HEAD_START_PREVIEW_SECRET,
      }),
      HEAD_START_PREVIEW: envField.boolean({
        context: 'server',
        access: 'secret',
        default: isPreview,
      }),
      PUBLIC_IS_PRODUCTION: envField.boolean({
        context: 'server',
        access: 'public',
        default: process.env.NODE_ENV === 'production',
      }),
      MAILCHIMP_FORM_URL: envField.string({
        context: 'client',
        access: 'public',
        default: process.env.MAILCHIMP_FORM_URL,
      }),
      MAILCHIMP_HONEYPOT_ID: envField.string({
        context: 'client',
        access: 'public',
        default: process.env.MAILCHIMP_HONEYPOT_ID,
      }),
    },
  },
  image: {
    // cloudflare is not supported by the Astro image service
    // @see https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service
    service: passthroughImageService(),
  },
  integrations: [sitemap(), react()],
  output: 'server',
  server: { port: localhostPort },
  site: siteUrl,
  trailingSlash: 'always',
  vite: {
    plugins: [graphql() as PluginOption],
  },
  devToolbar: {
    enabled: false,
  },
});
