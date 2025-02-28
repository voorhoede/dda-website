import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import preact from '@astrojs/preact';
import graphql from '@rollup/plugin-graphql';
import { isPreview } from './config/preview';

const productionUrl = 'https://dutchdigitalagencies.com'; // overwrite if you have a custom domain
const localhostPort = 4323; // 4323 is "head" in T9
export const siteUrl = process.env.CF_PAGES
  ? process.env.CF_PAGES_BRANCH === 'main'
    ? productionUrl
    : process.env.CF_PAGES_URL
  : `http://localhost:${localhostPort}`;

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      HEAD_START_PREVIEW_SECRET: envField.string({
        context: 'server',
        access: 'public',
        default: process.env.HEAD_START_PREVIEW_SECRET,
      }),
      DATOCMS_READONLY_API_TOKEN: envField.string({
        context: 'client',
        access: 'public',
        default: process.env.DATOCMS_READONLY_API_TOKEN,
      }),
      PUBLIC_IS_PRODUCTION: envField.boolean({
        context: 'server',
        access: 'public',
        default: process.env.NODE_ENV === 'production',
      }),
      HEAD_START_PREVIEW: envField.boolean({
        context: 'client',
        access: 'public',
        default: isPreview,
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
  integrations: [
    preact({
      compat: true,
    }),
  ],
  output: 'server',
  server: { port: localhostPort },
  site: siteUrl,
  trailingSlash: 'always',
  vite: {
    plugins: [graphql()],
    ssr: {
      noExternal: [
        '@tanstack/react-query',
        'react-focus-on',
        'react-datocms',
        // @headlessui/react related dependencies
        '@headlessui/react',
        '@floating-ui/*',
        '@react-aria/*',
      ],
    },
  },
  devToolbar: {
    enabled: false,
  },
});
