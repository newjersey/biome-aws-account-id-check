/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/content": `${import.meta.dirname}/content`,
      "@": `${import.meta.dirname}/src`,
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**", "dist/**", "dist-playwright/**"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
