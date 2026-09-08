/**
 * Verifies canonical localized application paths.
 */

import { describe, expect, it } from "vitest";

import { APP_LOCALES } from "@/i18n/locales";
import { homepagePathForLocale } from "@/i18n/urls";

describe("localized URLs", () => {
  it.each(APP_LOCALES)("builds the canonical %s homepage path", (locale) => {
    const expectedPath = locale === "en-US" ? "/" : `/${locale}`;

    expect(homepagePathForLocale(locale)).toBe(expectedPath);
  });
});
