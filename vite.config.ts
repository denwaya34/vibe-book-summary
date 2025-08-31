import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  root: import.meta.dirname,
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    tailwindcss(),
    checker({
      typescript: true,
      biome: {
        command: 'format',
      },
    }),
  ],
});
