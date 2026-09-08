/**
 * Verifies the opt-in Grove feedback widget wrapper.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedbackWidgetConfig, FeedbackWidgetLanguage } from "@/config/feedbackWidget";
import { feedbackWidgetLanguageForLocale } from "@/config/feedbackWidget";
import { FeedbackWidgetController } from "@/controllers/FeedbackWidgetController";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

vi.mock("@newjersey/feedback-widget/feedback-widget.min.js", () => ({}));

/**
 * Describes the event calls recorded by a document dispatch spy.
 */
interface DispatchEventSpy {
  /** Mock metadata exposed by Vitest. */
  readonly mock: {
    /** Event arguments supplied to each dispatch call. */
    readonly calls: readonly (readonly [Event])[];
  };
}

/**
 * Creates the feedback configuration expected for one locale.
 *
 * @param localeCase Locale under test.
 * @returns Enabled supported configuration or an unsupported-locale result.
 */
const feedbackConfigForLocale = ({ locale }: LocaleTestCase): FeedbackWidgetConfig => {
  const language = feedbackWidgetLanguageForLocale(locale);

  if (!language) {
    return { status: "disabled", reason: "unsupported-locale" };
  }

  return {
    status: "enabled",
    contactLink: "https://innovation.nj.gov/contact",
    language,
    onlySaveRatingToAnalytics: true,
    showCommentDisclaimer: true,
    skipEmailStep: true,
  };
};

/**
 * Verifies one supported language announcement was dispatched.
 *
 * @param dispatchEventSpy Document event spy.
 * @param language Expected feedback language.
 * @returns Whether the expected language event was observed.
 */
const dispatchedLanguageEvent = (
  dispatchEventSpy: DispatchEventSpy,
  language: FeedbackWidgetLanguage,
): boolean => {
  return dispatchEventSpy.mock.calls.some(([event]) => {
    return (
      event instanceof CustomEvent && event.type === "changeLanguage" && event.detail === language
    );
  });
};

/**
 * Verifies the wrapper renders only locales supported by the official widget.
 *
 * @param localeCase Locale under test.
 */
const verifyFeedbackWidgetLocale = async (localeCase: LocaleTestCase): Promise<void> => {
  const config = feedbackConfigForLocale(localeCase);
  const dispatchEventSpy = vi.spyOn(document, "dispatchEvent");

  render(<FeedbackWidgetController config={config} />);

  if (config.status === "disabled") {
    expect(screen.queryByTestId("feedback-widget")).not.toBeInTheDocument();
    return;
  }

  const widget = screen.getByTestId("feedback-widget");
  expect(widget).toHaveAttribute("contact-link", config.contactLink);
  expect(widget).toHaveAttribute("data-feedback-language", config.language);
  expect(widget).toHaveAttribute("only-save-rating-to-analytics", "true");
  expect(widget).toHaveAttribute("show-comment-disclaimer", "true");
  expect(widget).toHaveAttribute("skip-email-step", "true");

  await waitFor(() => {
    expect(dispatchedLanguageEvent(dispatchEventSpy, config.language)).toBe(true);
  });
};

/**
 * Registers locale-complete feedback wrapper tests.
 */
const defineFeedbackWidgetTests = (): void => {
  it.each(LOCALE_TEST_CASES)(
    "$locale renders supported feedback behavior",
    verifyFeedbackWidgetLocale,
  );
};

describe("FeedbackWidget", defineFeedbackWidgetTests);
