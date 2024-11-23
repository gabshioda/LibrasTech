import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/usuarios": {
        target: "http://localhost:8080", // URL do backend
        changeOrigin: true,
      },
      "/voluntarios": {
        target: "http://localhost:8080", // URL do backend
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
