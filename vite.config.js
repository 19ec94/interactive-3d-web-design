import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      open: true,
      proxy: {
        '/api': {
          target: "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/,''),
        }
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});
