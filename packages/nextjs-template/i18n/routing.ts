/**
 * Defines locale-aware routing shared by the application and proxy.
 */

import { defineRouting } from "next-intl/routing";

import { APP_LOCALES, DEFAULT_LOCALE } from "@/i18n/locales";

export const routing = defineRouting({
  locales: APP_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeDetection: false,
});
