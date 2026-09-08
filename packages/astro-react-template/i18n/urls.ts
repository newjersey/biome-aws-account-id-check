/**
 * Builds canonical localized application paths.
 */

import { APP_LOCALES, type AppLocale, DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * Returns the canonical homepage path for a locale.
 *
 * @param locale Locale whose homepage path is required.
 * @returns An unprefixed English path or a locale-prefixed path.
 */
export const homepagePathForLocale = (locale: AppLocale): string => {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
};

/**
 * Removes a supported locale prefix from an application pathname.
 *
 * @param pathname Localized request pathname.
 * @returns Locale-independent pathname.
 */
export const localeIndependentPathname = (pathname: string): string => {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!firstSegment) {
    return "/";
  }

  if (!APP_LOCALES.includes(firstSegment as AppLocale)) {
    return pathname;
  }

  const localizedPathname = pathname.slice(firstSegment.length + 1);
  return localizedPathname || "/";
};
