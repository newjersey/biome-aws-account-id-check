/**
 * Verifies canonical localized application paths.
 */

import { describe, expect, it } from "vitest";

import { APP_LOCALES } from "@/i18n/locales";
import { homepagePathForLocale, localeIndependentPathname } from "@/i18n/urls";

describe("localized URLs", () => {
  it.each(APP_LOCALES)("builds the canonical %s homepage path", (locale) => {
    const expectedPath = locale === "en-US" ? "/" : `/${locale}`;

    expect(homepagePathForLocale(locale)).toBe(expectedPath);
  });

  it("removes supported locale prefixes", () => {
    expect(localeIndependentPathname("/ar-SA")).toBe("/");
    expect(localeIndependentPathname("/es-US/application")).toBe("/application");
  });

  it("preserves unprefixed and unsupported paths", () => {
    expect(localeIndependentPathname("/")).toBe("/");
    expect(localeIndependentPathname("/application")).toBe("/application");
  });
});
