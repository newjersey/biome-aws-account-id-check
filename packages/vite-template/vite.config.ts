import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/content": `${import.meta.dirname}/content`,
      "@": `${import.meta.dirname}/src`,
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
