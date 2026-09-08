/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "node",
    exclude: ["tests/accessibility/**", "node_modules/**", ".amplify-hosting/**", "dist/**"],
  },
});
