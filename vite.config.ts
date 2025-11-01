import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      ViteImageOptimizer({
        exclude: ["**/*.avif"],
        png: {
          quality: 80,
          compressionLevel: 9,
        },
        jpeg: {
          quality: 80,
          progressive: true,
        },
        jpg: {
          quality: 80,
          progressive: true,
        },
        webp: {
          quality: 85,
          lossless: false,
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    target: "es2018",
    cssCodeSplit: false,
    cssTarget: "chrome90",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
}));
