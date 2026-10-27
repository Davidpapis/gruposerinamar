import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gruposerinamar.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
