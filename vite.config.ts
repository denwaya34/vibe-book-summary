import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const root = path.join(import.meta.dirname, 'src');
const outDir = path.join(import.meta.dirname, 'dist');

export default defineConfig({
  root,
  build: {
    outDir,
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
    }),
  ],
});
