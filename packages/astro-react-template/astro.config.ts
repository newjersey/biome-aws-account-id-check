import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";

import { APP_LOCALES, DEFAULT_LOCALE } from "./i18n/locales";

export default defineConfig({
  adapter: awsAmplify({
    runtime: "nodejs22.x",
  }),
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...APP_LOCALES],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react()],
  output: "server",
  redirects: {
    [`/${DEFAULT_LOCALE}`]: {
      destination: "/",
      status: 301,
    },
  },
  server: {
    port: 3000,
  },
  trailingSlash: "never",
  vite: {
    plugins: [
      {
        apply: "build",
        config: () => ({
          ssr: {
            noExternal: true,
          },
        }),
        name: "bundle-server-dependencies",
      },
    ],
    resolve: {
      alias: {
        "@": import.meta.dirname,
      },
    },
  },
});
