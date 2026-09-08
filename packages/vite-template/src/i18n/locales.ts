export const SUPPORTED_LOCALES = ["en-US", "es-US"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en-US";

export const LOCALE_NAMES: Record<Locale, string> = {
  "en-US": "English",
  "es-US": "Español",
};

export const CANONICAL_PATHS = ["/about"] as const;
export type CanonicalPath = "/" | (typeof CANONICAL_PATHS)[number];

export const LOCALIZED_PATHS_MAP: Record<Exclude<CanonicalPath, "/">, Record<Locale, string>> = {
  "/about": {
    "en-US": "/about",
    "es-US": "/quienes-somos",
  },
};

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
