import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
//import node from '@astrojs/node';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  /*   adapter: node({
    mode: 'standalone',
  }), */
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['path-to-regexp'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
