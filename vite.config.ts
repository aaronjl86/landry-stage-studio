import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      },
      webp: { quality: 85 }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve caching and split big deps into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Core framework
          react: ["react", "react-dom"],
          // Router separate so home route can load faster
          router: ["react-router-dom"],
          // Data fetching
          query: ["@tanstack/react-query"],
          // Icons are tree-shaken but still sizable at scale
          icons: ["lucide-react"],
          // Third-party heavy libs that should not bloat initial load
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    // Generate smaller modern bundles
    target: "es2020",
    modulePreload: { polyfill: false },
    cssMinify: true,
    sourcemap: false,
    // Tweak chunk size warnings to surface large bundles
    chunkSizeWarningLimit: 700,
  },
}));
