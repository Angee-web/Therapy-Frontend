// filepath: /Users/adaeze.ugwumba/Desktop/Therapy/Therapy Frontend/vite.config.js
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ["pdfjs-dist/build/pdf.worker.min.js"], // Add this chunk for pdf.worker
        },
      },
    },
  },
});