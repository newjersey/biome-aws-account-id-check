/**
 * Exposes locale-aware anchor navigation for React components rendered by Astro.
 */

import type { AnchorHTMLAttributes, ReactNode } from "react";

import type { AppLocale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * Describes one localized application link.
 */
export interface LocalizedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Link content. */
  readonly children: ReactNode;
  /** Locale-independent application destination. */
  readonly href: string;
  /** Locale selected for the destination. */
  readonly locale?: AppLocale;
}

const localePrefix = (locale: AppLocale): string => {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
};

/**
 * Localizes an application path while preserving its hash and query.
 *
 * @param href Locale-independent destination.
 * @param locale Destination locale.
 * @returns Localized destination.
 */
export const localizeHref = (href: string, locale: AppLocale): string => {
  if (!href.startsWith("/")) {
    return href;
  }

  if (href === "/" || href.startsWith("/#") || href.startsWith("/?")) {
    return `${localePrefix(locale) || "/"}${href.slice(1)}`;
  }

  return `${localePrefix(locale)}${href}` || "/";
};

/**
 * Renders a locale-aware application anchor.
 *
 * @param props Link input.
 * @returns Localized anchor element.
 */
export const Link = ({
  children,
  href,
  locale = DEFAULT_LOCALE,
  ...anchorProps
}: LocalizedLinkProps) => {
  return (
    <a href={localizeHref(href, locale)} {...anchorProps}>
      {children}
    </a>
  );
};
