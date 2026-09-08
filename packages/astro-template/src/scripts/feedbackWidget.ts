/**
 * Registers Grove's optional feedback web component.
 */

const registerFeedbackWidgets = async (): Promise<void> => {
  const widgets = document.querySelectorAll<HTMLElement>("feedback-widget[data-feedback-language]");

  if (widgets.length === 0) {
    return;
  }

  await import("@newjersey/feedback-widget/feedback-widget.min.js");

  for (const widget of widgets) {
    const language = widget.dataset.feedbackLanguage;

    if (language === "en" || language === "es") {
      document.dispatchEvent(
        new CustomEvent("changeLanguage", {
          bubbles: true,
          detail: language,
        }),
      );
    }
  }
};

void registerFeedbackWidgets();
