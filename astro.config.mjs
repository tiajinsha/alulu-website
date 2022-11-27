import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
//import node from '@astrojs/node';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
  // adapter: cloudflare(),
  /*   adapter: node({
    mode: 'standalone',
  }), */
  integrations: [react()],
  vite: {
    define: {
      'process.env.ALULU_BASE_URL': JSON.stringify(process.env.ALULU_BASE_URL),
      'process.env.REF_TOKEN_URL': JSON.stringify(process.env.REF_TOKEN_URL),
      'process.env.ALULU_REGISTER_URL': JSON.stringify(process.env.ALULU_REGISTER_URL),
      'process.env.TOKEN_NAME': JSON.stringify(process.env.TOKEN_NAME),
    },
    /*     ssr: {
      noExternal: ['path-to-regexp'],
    }, */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
