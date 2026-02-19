import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
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
