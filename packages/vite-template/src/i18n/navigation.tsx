import { useParams } from "react-router-dom";
import { CANONICAL_PATHS, DEFAULT_LOCALE, LOCALIZED_PATHS_MAP, type Locale } from "@/i18n/locales";

/**
 * Prepends the locale prefix to an application path, translating the slug if
 * a locale-specific path exists in LOCALIZED_PATHS_MAP.
 */
export const localizeHref = (href: string, locale: Locale): string => {
  const canonical = CANONICAL_PATHS.find((p) => p === href);
  const localizedPath = canonical ? LOCALIZED_PATHS_MAP[canonical][locale] : href;
  return `/${locale}${localizedPath === "/" ? "" : localizedPath}`;
};

/**
 * Returns a localizeHref function bound to the current route's locale param.
 */
export function useLocalizeHref(): (href: string) => string {
  const { locale = DEFAULT_LOCALE } = useParams<{ locale: string }>();
  return (href: string) => localizeHref(href, (locale as Locale) ?? DEFAULT_LOCALE);
}
