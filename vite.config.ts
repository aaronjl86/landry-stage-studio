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
          // Core React chunks (loaded on every page)
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // Radix UI components (heavy, used on multiple pages)
          if (id.includes('@radix-ui')) {
            return 'radix-vendor';
          }
          
          // Supabase (used only after auth)
          if (id.includes('@supabase')) {
            return 'supabase-vendor';
          }
          
          // AI/processing libraries (dashboard only)
          if (id.includes('browser-image-compression') || id.includes('jszip')) {
            return 'processing-vendor';
          }
          
          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'animation-vendor';
          }
          
          // Everything else
          if (id.includes('node_modules')) {
            return 'common-vendor';
          }
        }
      }
    }
  }
}));
