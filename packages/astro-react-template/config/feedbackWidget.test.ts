/**
 * Verifies feedback widget configuration at the environment boundary.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  feedbackWidgetLanguageForLocale,
  resolveFeedbackWidgetConfig,
} from "@/config/feedbackWidget";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

/**
 * Restores environment variables changed by one configuration test.
 */
const restoreEnvironment = (): void => {
  vi.unstubAllEnvs();
};

/**
 * Verifies the widget remains disabled by default for every locale.
 *
 * @param localeCase Locale under test.
 */
const verifyDisabledByDefault = ({ locale }: LocaleTestCase): void => {
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_ENABLED", undefined);

  expect(resolveFeedbackWidgetConfig({ locale })).toEqual({
    status: "disabled",
    reason: "not-enabled",
  });
};

/**
 * Verifies enabled configuration is localized or rejected explicitly.
 *
 * @param localeCase Locale under test.
 */
const verifyEnabledLocaleBehavior = ({ locale }: LocaleTestCase): void => {
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_ENABLED", "true");
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_CONTACT_URL", "https://innovation.nj.gov/contact");
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_ONLY_SAVE_RATING_TO_ANALYTICS", "false");
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_SHOW_COMMENT_DISCLAIMER", "true");
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_SKIP_EMAIL_STEP", "true");

  const language = feedbackWidgetLanguageForLocale(locale);
  const config = resolveFeedbackWidgetConfig({ locale });

  if (!language) {
    expect(config).toEqual({
      status: "disabled",
      reason: "unsupported-locale",
    });
    return;
  }

  expect(config).toEqual({
    status: "enabled",
    contactLink: "https://innovation.nj.gov/contact",
    language,
    onlySaveRatingToAnalytics: false,
    showCommentDisclaimer: true,
    skipEmailStep: true,
  });
};

/**
 * Verifies malformed operator configuration fails immediately.
 */
const verifyMalformedBooleanFailure = (): void => {
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_ENABLED", "sometimes");

  expect(() => resolveFeedbackWidgetConfig({ locale: "en-US" })).toThrow(
    'Expected "true" or "false", received "sometimes".',
  );
};

/**
 * Verifies enabled supported locales require a secure contact destination.
 */
const verifyContactLinkValidation = (): void => {
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_ENABLED", "true");
  vi.stubEnv("PUBLIC_FEEDBACK_WIDGET_CONTACT_URL", "http://example.com/contact");

  expect(() => resolveFeedbackWidgetConfig({ locale: "en-US" })).toThrow(
    "PUBLIC_FEEDBACK_WIDGET_CONTACT_URL must use HTTPS.",
  );
};

/**
 * Registers feedback configuration tests.
 */
const defineFeedbackWidgetConfigTests = (): void => {
  afterEach(restoreEnvironment);
  it.each(LOCALE_TEST_CASES)("$locale disables feedback by default", verifyDisabledByDefault);
  it.each(LOCALE_TEST_CASES)(
    "$locale resolves explicit feedback support",
    verifyEnabledLocaleBehavior,
  );
  it("rejects malformed boolean configuration", verifyMalformedBooleanFailure);
  it("requires an HTTPS contact destination", verifyContactLinkValidation);
};

describe("feedback widget configuration", defineFeedbackWidgetConfigTests);
