import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
// - React plugin for JSX/Fast Refresh
// - Dev server proxy forwards /api calls to the Express backend,
//   avoiding CORS issues during local development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
