import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/nexus-landing-minimax5/',
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
        includePaths: [path.resolve(__dirname, 'src/styles')]
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
