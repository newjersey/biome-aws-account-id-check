/**
 * Verifies locale validation and writing directions.
 */

import { describe, expect, test } from "vitest";

import { hasAppLocale, textDirectionForLocale } from "@/i18n/locales";

/**
 * Verifies Arabic uses RTL while the other supported locales use LTR.
 */
const verifyLocaleDirections = () => {
  expect(textDirectionForLocale("ar-SA")).toBe("rtl");
  expect(textDirectionForLocale("zh-CN")).toBe("ltr");
  expect(textDirectionForLocale("en-US")).toBe("ltr");
  expect(textDirectionForLocale("es-US")).toBe("ltr");
  expect(textDirectionForLocale("fr-FR")).toBe("ltr");
  expect(textDirectionForLocale("it-IT")).toBe("ltr");
  expect(textDirectionForLocale("ru-RU")).toBe("ltr");
};

/**
 * Verifies unsupported route values are rejected.
 */
const verifyLocaleValidation = () => {
  expect(hasAppLocale("fr-FR")).toBe(true);
  expect(hasAppLocale("fr")).toBe(false);
  expect(hasAppLocale("de")).toBe(false);
};

/**
 * Registers locale behavior tests.
 */
const defineLocaleTests = () => {
  test("assigns the correct writing direction", verifyLocaleDirections);
  test("validates supported locale routes", verifyLocaleValidation);
};

describe("locales", defineLocaleTests);
