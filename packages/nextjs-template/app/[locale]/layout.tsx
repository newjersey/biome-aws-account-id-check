/**
 * Renders the locale-scoped application document.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { textDirectionForLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";

const GROVE_STYLESHEET_PATH = "/assets/grove/dist/css/styles.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Describes route parameters received by the locale layout.
 */
interface LocaleLayoutParams {
  /** Locale segment selected for the request. */
  readonly locale: string;
}

/**
 * Describes content rendered by the locale layout.
 */
interface LocaleLayoutProps {
  /** Route content rendered within the locale document. */
  readonly children: ReactNode;
  /** Asynchronous route parameters supplied by Next.js. */
  readonly params: Promise<LocaleLayoutParams>;
}

/**
 * Generates every supported locale route during the production build.
 *
 * @returns Route parameters for all supported locales.
 */
export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

/**
 * Renders the localized HTML document and next-intl provider.
 *
 * @param props Locale layout input.
 * @param props.children Route content rendered within the document.
 * @param props.params Locale route parameters.
 * @returns The localized application document.
 */
const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html data-scroll-behavior="smooth" dir={textDirectionForLocale(locale)} lang={locale}>
      <head>
        <link href={GROVE_STYLESHEET_PATH} rel="stylesheet" />
      </head>
      <body className="minh-viewport" id="top">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
