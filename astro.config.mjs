import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.io',
  // Rename GitHub repo to `command-realms` for production URL to match
  base: '/command-realms/',
});
