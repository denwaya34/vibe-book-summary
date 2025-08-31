import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: path.join(import.meta.dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        main: './src/index.html',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    checker({
      typescript: true,
      biome: {
        command: 'format',
      },
    }),
  ],
});
