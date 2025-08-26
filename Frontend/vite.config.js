import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones externas
    port: 3000, // Asegúrate que es tu puerto de dev
    strictPort: true,
    allowedHosts: [
      '.ngrok-free.app', // Permite cualquier subdominio de ngrok
    ],
  },
});

