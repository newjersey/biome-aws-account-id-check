/**
 * Renders Grove's stateless feedback web-component view.
 */

import type { FeedbackWidgetConfig } from "@/config/feedbackWidget";

/**
 * Describes the feedback widget view.
 */
export interface FeedbackWidgetProps {
  /** Validated feedback widget configuration for the current locale. */
  readonly config: FeedbackWidgetConfig;
}

/**
 * Renders the configured feedback custom element when enabled.
 *
 * @param props Feedback-widget input.
 * @returns The configured custom element or nothing when disabled.
 */
export const FeedbackWidget = ({ config }: FeedbackWidgetProps) => {
  if (config.status === "disabled") {
    return null;
  }

  return (
    <feedback-widget
      contact-link={config.contactLink}
      data-feedback-language={config.language}
      data-testid="feedback-widget"
      only-save-rating-to-analytics={String(config.onlySaveRatingToAnalytics)}
      show-comment-disclaimer={String(config.showCommentDisclaimer)}
      skip-email-step={String(config.skipEmailStep)}
    />
  );
};
