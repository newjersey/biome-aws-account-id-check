import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * Describes attributes accepted by the Grove feedback custom element.
 */
interface FeedbackWidgetElementAttributes extends HTMLAttributes<HTMLElement> {
  /** Contact destination shown for support questions. */
  readonly "contact-link"?: string;
  /** Whether rating-only submissions avoid the feedback database. */
  readonly "only-save-rating-to-analytics"?: string;
  /** Whether the comment disclaimer is displayed. */
  readonly "show-comment-disclaimer"?: string;
  /** Whether the optional email step is omitted. */
  readonly "skip-email-step"?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "feedback-widget": DetailedHTMLProps<FeedbackWidgetElementAttributes, HTMLElement>;
    }
  }
}
