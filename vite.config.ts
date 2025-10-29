import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && ViteImageOptimizer({
      png: {
        quality: 70,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 75,
        progressive: true,
      },
      jpg: {
        quality: 75,
        progressive: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      avif: {
        quality: 70,
      },
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    target: 'es2018',
    cssCodeSplit: false,
    cssTarget: 'chrome90',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Core React bundle
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // Router bundle
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          
          // UI component library
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          
          // Charts library (large)
          if (id.includes('node_modules/recharts')) {
            return 'recharts';
          }
          
          // Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
          
          // Remaining vendor code
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
}));
