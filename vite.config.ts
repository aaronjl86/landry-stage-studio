import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import viteCompression from "vite-plugin-compression";

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
        png: {
          quality: 75,
          compressionLevel: 9,
        },
        jpeg: {
          quality: 75,
          progressive: true,
          mozjpeg: true,
        },
        jpg: {
          quality: 75,
          progressive: true,
          mozjpeg: true,
        },
        webp: {
          quality: 80,
          lossless: false,
        },
      }),
    mode === "production" &&
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    target: "es2020",
    cssCodeSplit: true,
    cssTarget: "chrome90",
    minify: "esbuild",
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("@radix-ui") || id.includes("framer-motion")) {
              return "ui-vendor";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            return "vendor";
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".");
          let extType = info?.[info.length - 1];
          if (/\.(png|jpe?g|webp|avif|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || "")) {
            extType = "images";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
}));
