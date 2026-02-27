import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        machining: 'machining.html',
        projects: 'projects.html',
      },
    },
  },
});
