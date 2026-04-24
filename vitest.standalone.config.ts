import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    alias: {
      'astro:middleware': new URL('./node_modules/astro/dist/runtime/server/middleware/index.js', import.meta.url).pathname,
    },
  },
});
