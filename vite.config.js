// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wather/', // Set this to your GitHub repository name for production
  build: {
    outDir: 'dist', // Directory where the build output will go
  },
  // Other configurations like plugins, server settings, etc.
});
