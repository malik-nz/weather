import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['prop-types', 'object.omit'], // Prevents Vite from trying to bundle them
  },
  build: {
    rollupOptions: {
      external: ['prop-types', 'object.omit'], // Ensures they're treated as external
    },
  },
});