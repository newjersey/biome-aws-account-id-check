/**
 * Builds canonical localized application paths.
 */

import { type AppLocale, DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * Returns the canonical homepage path for a locale.
 *
 * @param locale Locale whose homepage path is required.
 * @returns An unprefixed English path or a locale-prefixed path.
 */
export const homepagePathForLocale = (locale: AppLocale): string => {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
};
