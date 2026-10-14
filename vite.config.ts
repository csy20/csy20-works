import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

function prepaintThemePreference(): Plugin {
  let themeStorageKey = JSON.stringify("csy20-theme");

  return {
    name: "prepaint-theme-preference",
    configResolved({ mode, envDir }) {
      const env = loadEnv(mode, envDir, "VITE_");
      // Match src/config.ts before React or stylesheet evaluation.
      themeStorageKey = JSON.stringify(
        env["VITE_THEME_STORAGE_KEY"] ?? "csy20-theme",
      ).replace(/</g, "\\u003c");
    },
    transformIndexHtml(html) {
      return html.replace('"__THEME_STORAGE_KEY__"', themeStorageKey);
    },
  };
}

export default defineConfig({
  plugins: [
    prepaintThemePreference(),
    react(),
    tailwindcss(),
    compression({ algorithm: "gzip", ext: ".gz", threshold: 10240 }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ],
  build: {
    target: "es2022",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "motion-vendor";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
});
