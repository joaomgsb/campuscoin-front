import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: '0.0.0.0', // Listen on all available network interfaces
    port: 5173,
    hmr: {
      host: 'localhost', // IP Publico ou Localhost
      port: 5173
    }
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Your public API IP
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
});