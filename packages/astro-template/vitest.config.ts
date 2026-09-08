/// <reference types="vitest/config" />

import { getViteConfig } from "astro/config";

export default getViteConfig({
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["tests/accessibility/**", "node_modules/**", ".astro/**", "dist/**"],
  },
});
