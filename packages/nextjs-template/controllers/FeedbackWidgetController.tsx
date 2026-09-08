/**
 * Registers Grove's feedback web component around its stateless view.
 */

"use client";

import { useEffect, useState } from "react";

import { FeedbackWidget } from "@/components/FeedbackWidget";
import type { FeedbackWidgetConfig } from "@/config/feedbackWidget";

/**
 * Describes the feedback-widget controller input.
 */
export interface FeedbackWidgetControllerProps {
  /** Validated feedback configuration for the current locale. */
  readonly config: FeedbackWidgetConfig;
}

/**
 * Loads the feedback custom element and announces its active language.
 *
 * @param props Feedback-widget controller input.
 * @returns The stateless feedback-widget view.
 */
export const FeedbackWidgetController = ({ config }: FeedbackWidgetControllerProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    if (config.status === "disabled") {
      return undefined;
    }

    let isActive = true;

    const register = async (): Promise<void> => {
      try {
        await import("@newjersey/feedback-widget/feedback-widget.min.js");

        if (isActive) {
          setIsRegistered(true);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error
              : new Error("The Grove feedback widget failed to load.", { cause: error }),
          );
        }
      }
    };

    void register();

    return () => {
      isActive = false;
    };
  }, [config.status]);

  useEffect(() => {
    if (config.status === "enabled" && isRegistered) {
      document.dispatchEvent(
        new CustomEvent("changeLanguage", {
          bubbles: true,
          detail: config.language,
        }),
      );
    }
  }, [config, isRegistered]);

  if (loadError) {
    throw loadError;
  }

  return <FeedbackWidget config={config} />;
};
