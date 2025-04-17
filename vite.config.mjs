import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      open: true,
      port: 3000,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: []
    },
    base: env.VITE_APP_BASE_NAME || './', // 👈 automatically uses "/free" in production, "./" in dev
    plugins: [react(), jsconfigPaths()]
  };
});
