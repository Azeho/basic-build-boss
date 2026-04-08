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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-slot'],
          'vendor-carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log'] : [],
      },
    },
  },
}));
