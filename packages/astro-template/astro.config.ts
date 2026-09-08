import { defineConfig } from "astro/config";

import { APP_LOCALES, DEFAULT_LOCALE } from "./i18n/locales";

export default defineConfig({
  build: {
    format: "file",
  },
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...APP_LOCALES],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  server: {
    port: 3000,
  },
  trailingSlash: "never",
  vite: {
    resolve: {
      alias: {
        "@": import.meta.dirname,
      },
    },
  },
});
