import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        automation: 'automation.html',
        machining: 'machining.html',
        projects: 'projects.html',
      },
    },
  },
});
