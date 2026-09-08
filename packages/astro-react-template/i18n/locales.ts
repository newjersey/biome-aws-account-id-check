/**
 * Defines the locales and writing directions supported by the application.
 */

export const APP_LOCALES = ["ar-SA", "zh-CN", "en-US", "es-US", "fr-FR", "it-IT", "ru-RU"] as const;
export const DEFAULT_LOCALE = "en-US";

export type AppLocale = (typeof APP_LOCALES)[number];
export type TextDirection = "ltr" | "rtl";

/**
 * Checks whether a route value is a supported application locale.
 *
 * @param locale Route value to validate.
 * @returns Whether the value is a supported locale.
 */
export const hasAppLocale = (locale: string): locale is AppLocale => {
  return APP_LOCALES.includes(locale as AppLocale);
};

/**
 * Returns the writing direction for a supported locale.
 *
 * @param locale Locale whose direction is required.
 * @returns The locale's document direction.
 */
export const textDirectionForLocale = (locale: AppLocale): TextDirection => {
  return locale === "ar-SA" ? "rtl" : "ltr";
};
