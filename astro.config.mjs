// @ts-check
import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://tools.sijiaoh.com',

  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/pdfjs-dist/cmaps/*.bcmap',
            dest: 'pdf-extract/cmaps',
            rename: { stripBase: true },
          },
          {
            src: 'node_modules/pdfjs-dist/standard_fonts/*',
            dest: 'pdf-extract/standard_fonts',
            rename: { stripBase: true },
          },
        ],
      }),
    ],
  },

  adapter: cloudflare(),
});