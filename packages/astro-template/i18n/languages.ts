/**
 * Defines the languages displayed by the Grove language selector.
 */

import type { AppLocale, TextDirection } from "@/i18n/locales";

export interface LanguageDescriptor {
  /** Locale selected by the language option. */
  readonly locale: AppLocale;
  /** Language name written in that language. */
  readonly nativeName: string;
  /** English language name displayed as supporting text. */
  readonly englishName?: string;
  /** Writing direction used by the native language name. */
  readonly direction: TextDirection;
}

export const LANGUAGE_DESCRIPTORS: readonly LanguageDescriptor[] = [
  {
    locale: "ar-SA",
    nativeName: "العربية",
    englishName: "Arabic",
    direction: "rtl",
  },
  {
    locale: "zh-CN",
    nativeName: "简体中文",
    englishName: "Chinese - Simplified",
    direction: "ltr",
  },
  { locale: "en-US", nativeName: "English", direction: "ltr" },
  {
    locale: "es-US",
    nativeName: "Español",
    englishName: "Spanish",
    direction: "ltr",
  },
  {
    locale: "fr-FR",
    nativeName: "Français",
    englishName: "French",
    direction: "ltr",
  },
  {
    locale: "it-IT",
    nativeName: "Italiano",
    englishName: "Italian",
    direction: "ltr",
  },
  {
    locale: "ru-RU",
    nativeName: "Русский",
    englishName: "Russian",
    direction: "ltr",
  },
];
