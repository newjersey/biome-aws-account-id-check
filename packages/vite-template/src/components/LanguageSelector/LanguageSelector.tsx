import { Link, useLocation, useParams } from "react-router-dom";
import {
  CANONICAL_PATHS,
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  LOCALIZED_PATHS_MAP,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/i18n/locales";
import { localizeHref } from "@/i18n/navigation";

/** The other locale for a 2-language toggle. */
const otherLocale = (locale: Locale): Locale =>
  SUPPORTED_LOCALES.find((l) => l !== locale) ?? DEFAULT_LOCALE;

/**
 * Resolves the canonical path for the current URL so the toggle links to the
 * equivalent page in the other locale.
 */
const canonicalPathForPathname = (pathname: string, locale: Locale): string => {
  const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
  for (const canonical of CANONICAL_PATHS) {
    const localizedSlug = LOCALIZED_PATHS_MAP[canonical][locale];
    if (withoutLocale === localizedSlug) {
      return canonical;
    }
  }
  return withoutLocale;
};

export const LanguageSelector = () => {
  const { locale = DEFAULT_LOCALE } = useParams<{ locale: string }>();
  const { pathname } = useLocation();

  const current = locale as Locale;
  const target = otherLocale(current);
  const canonical = canonicalPathForPathname(pathname, current);
  const targetHref = localizeHref(canonical, target);

  return (
    <Link
      to={targetHref}
      className="usa-button usa-button--outline usa-language__link"
      lang={target}
      hrefLang={target}
    >
      <span lang={target}>{LOCALE_NAMES[target]}</span>
    </Link>
  );
};
