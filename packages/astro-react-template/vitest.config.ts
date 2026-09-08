/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { getViteConfig } from "astro/config";

export default getViteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "jsdom",
    exclude: [
      "tests/accessibility/**",
      "node_modules/**",
      ".astro/**",
      ".amplify-hosting/**",
      "dist/**",
    ],
    setupFiles: ["./tests/setup.ts"],
  },
});
