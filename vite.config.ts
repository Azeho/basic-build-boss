import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// Plugin to copy .htaccess to dist folder after build
const copyHtaccess = () => ({
  name: 'copy-htaccess',
  closeBundle() {
    try {
      copyFileSync('.htaccess', 'dist/.htaccess');
      console.log('✓ Copied .htaccess to dist/');
    } catch (error) {
      console.warn('Warning: Could not copy .htaccess file:', error);
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true,
      renderLegacyChunks: true,
      renderModernChunks: false,
    }),
    copyHtaccess(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor-react';
          }
          // React Router
          if (id.includes('react-router')) {
            return 'vendor-router';
          }
          // Radix UI components - split by category for better caching
          if (id.includes('@radix-ui')) {
            if (id.includes('dialog') || id.includes('popover') || id.includes('dropdown') || id.includes('menubar')) {
              return 'vendor-radix-overlay';
            }
            if (id.includes('form') || id.includes('label') || id.includes('checkbox') || id.includes('radio')) {
              return 'vendor-radix-form';
            }
            return 'vendor-radix-ui';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
          // Carousel
          if (id.includes('embla-carousel')) {
            return 'vendor-carousel';
          }
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'vendor-i18n';
          }
          // React Query
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'vendor-forms';
          }
          // Other vendor libs
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
