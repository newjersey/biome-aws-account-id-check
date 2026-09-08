/**
 * Resolves the opt-in Grove feedback widget configuration.
 */

import type { AppLocale } from "@/i18n/locales";

const TRUE_VALUE = "true";
const FALSE_VALUE = "false";

export type FeedbackWidgetLanguage = "en" | "es";
export type FeedbackWidgetDisabledReason = "not-enabled" | "unsupported-locale";

/**
 * Describes a feedback widget that must not be rendered.
 */
export interface DisabledFeedbackWidgetConfig {
  /** Discriminator indicating that the widget is disabled. */
  readonly status: "disabled";
  /** Reason the widget is disabled for this request. */
  readonly reason: FeedbackWidgetDisabledReason;
}

/**
 * Describes an enabled feedback widget.
 */
export interface EnabledFeedbackWidgetConfig {
  /** Discriminator indicating that the widget is enabled. */
  readonly status: "enabled";
  /** Contact destination shown to users with support questions. */
  readonly contactLink: string;
  /** Language supported by the feedback web component. */
  readonly language: FeedbackWidgetLanguage;
  /** Whether rating-only submissions avoid the shared feedback database. */
  readonly onlySaveRatingToAnalytics: boolean;
  /** Whether the comment step explains where to ask support questions. */
  readonly showCommentDisclaimer: boolean;
  /** Whether the widget omits the optional email collection step. */
  readonly skipEmailStep: boolean;
}

export type FeedbackWidgetConfig = DisabledFeedbackWidgetConfig | EnabledFeedbackWidgetConfig;

/**
 * Describes input used to resolve feedback widget configuration.
 */
export interface ResolveFeedbackWidgetConfigParams {
  /** Locale currently displayed by the page. */
  readonly locale: AppLocale;
}

/**
 * Parses an optional boolean environment value.
 *
 * @param value Environment value to parse.
 * @param defaultValue Value returned when the environment value is absent.
 * @returns The validated boolean value.
 */
const parseOptionalBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  if (value === TRUE_VALUE) {
    return true;
  }

  if (value === FALSE_VALUE) {
    return false;
  }

  throw new Error(`Expected "true" or "false", received "${value}".`);
};

/**
 * Maps an application locale to a language supported by the feedback widget.
 *
 * @param locale Application locale to map.
 * @returns The supported feedback language, or undefined when unavailable.
 */
export const feedbackWidgetLanguageForLocale = (
  locale: AppLocale,
): FeedbackWidgetLanguage | undefined => {
  if (locale === "en-US") {
    return "en";
  }

  if (locale === "es-US") {
    return "es";
  }

  return undefined;
};

/**
 * Validates the configured feedback contact URL.
 *
 * @param value Configured contact URL.
 * @returns The validated absolute HTTPS URL.
 */
const validateContactLink = (value: string | undefined): string => {
  if (!value) {
    throw new Error(
      "NEXT_PUBLIC_FEEDBACK_WIDGET_CONTACT_URL is required when the feedback widget is enabled.",
    );
  }

  const contactUrl = new URL(value);

  if (contactUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_FEEDBACK_WIDGET_CONTACT_URL must use HTTPS.");
  }

  return contactUrl.toString();
};

/**
 * Resolves validated feedback widget configuration for one locale.
 *
 * @param params Configuration input.
 * @param params.locale Locale currently displayed by the page.
 * @returns Enabled configuration or a typed disabled result.
 */
export const resolveFeedbackWidgetConfig = ({
  locale,
}: ResolveFeedbackWidgetConfigParams): FeedbackWidgetConfig => {
  // biome-ignore lint/style/noProcessEnv: Environment access is isolated to this configuration boundary.
  const isEnabled = parseOptionalBoolean(process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_ENABLED, false);

  if (!isEnabled) {
    return { status: "disabled", reason: "not-enabled" };
  }

  const language = feedbackWidgetLanguageForLocale(locale);

  if (!language) {
    return { status: "disabled", reason: "unsupported-locale" };
  }

  return {
    status: "enabled",
    // biome-ignore lint/style/noProcessEnv: Environment access is isolated to this configuration boundary.
    contactLink: validateContactLink(process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_CONTACT_URL),
    language,
    onlySaveRatingToAnalytics: parseOptionalBoolean(
      // biome-ignore lint/style/noProcessEnv: Environment access is isolated to this configuration boundary.
      process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_ONLY_SAVE_RATING_TO_ANALYTICS,
      true,
    ),
    showCommentDisclaimer: parseOptionalBoolean(
      // biome-ignore lint/style/noProcessEnv: Environment access is isolated to this configuration boundary.
      process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_SHOW_COMMENT_DISCLAIMER,
      true,
    ),
    skipEmailStep: parseOptionalBoolean(
      // biome-ignore lint/style/noProcessEnv: Environment access is isolated to this configuration boundary.
      process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_SKIP_EMAIL_STEP,
      true,
    ),
  };
};
