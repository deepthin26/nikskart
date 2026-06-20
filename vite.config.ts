import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiProxy = {
  '/api': {
    target: 'http://localhost:4000',
    changeOrigin: true,
    secure: false
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173,
    proxy: apiProxy
  },
  preview: {
    port: 4173,
    proxy: apiProxy
  },
  build: {
    target: 'es2020',          // smaller output — no need to polyfill native async/await, ??, ?. for modern browsers
    cssMinify: true,
    minify: 'esbuild',
    assetsInlineLimit: 8192,   // inline assets <8 KB as base64 to eliminate extra HTTP round-trips
    reportCompressedSize: false, // skip gzip size reporting for faster builds
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase') || id.includes('realtime-js')) return 'supabase';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor';
          }
        },
      }
    }
  }
});
