/**
 * Defines the complete locale matrix shared by component and browser tests.
 */

import { MESSAGE_CATALOG } from "@/content/messages/catalog";
import type { AppMessages } from "@/content/messages/types";
import type { AppLocale, TextDirection } from "@/i18n/locales";

/**
 * Describes one localized application route under test.
 */
export interface LocaleTestCase {
  /** Supported application locale. */
  readonly locale: AppLocale;
  /** Canonical route used to render the locale. */
  readonly route: string;
  /** Writing direction expected on the document root. */
  readonly direction: TextDirection;
  /** Localized messages expected on the rendered page. */
  readonly messages: AppMessages;
}

export const LOCALE_TEST_CASES: readonly LocaleTestCase[] = [
  {
    locale: "ar-SA",
    route: "/ar-SA",
    direction: "rtl",
    messages: MESSAGE_CATALOG["ar-SA"],
  },
  {
    locale: "zh-CN",
    route: "/zh-CN",
    direction: "ltr",
    messages: MESSAGE_CATALOG["zh-CN"],
  },
  {
    locale: "en-US",
    route: "/",
    direction: "ltr",
    messages: MESSAGE_CATALOG["en-US"],
  },
  {
    locale: "es-US",
    route: "/es-US",
    direction: "ltr",
    messages: MESSAGE_CATALOG["es-US"],
  },
  {
    locale: "fr-FR",
    route: "/fr-FR",
    direction: "ltr",
    messages: MESSAGE_CATALOG["fr-FR"],
  },
  {
    locale: "it-IT",
    route: "/it-IT",
    direction: "ltr",
    messages: MESSAGE_CATALOG["it-IT"],
  },
  {
    locale: "ru-RU",
    route: "/ru-RU",
    direction: "ltr",
    messages: MESSAGE_CATALOG["ru-RU"],
  },
];
