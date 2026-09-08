/**
 * Composes Grove's localized landing-page template.
 */

import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { GraphicList } from "@/components/GraphicList";
import { Hero } from "@/components/Hero";
import { Identifier } from "@/components/Identifier";
import { GROVE_DOCUMENTATION_HREF } from "@/config/externalLinks";
import type { FeedbackWidgetConfig } from "@/config/feedbackWidget";
import type { AppMessages } from "@/content/messages/types";
import { FeedbackWidgetController } from "@/controllers/FeedbackWidgetController";
import { HeaderController } from "@/controllers/HeaderController";
import { PageInteractions } from "@/controllers/PageInteractions";
import type { AppLocale } from "@/i18n/locales";
import { textDirectionForLocale } from "@/i18n/locales";

const MAIN_CONTENT_ID = "main-content";

/**
 * Describes content rendered by the landing-page template.
 */
export interface LandingPageProps {
  /** Feedback-widget configuration resolved for the current locale. */
  readonly feedbackWidgetConfig: FeedbackWidgetConfig;
  /** Locale currently displayed by the page. */
  readonly locale: AppLocale;
  /** Localized content for every landing-page region. */
  readonly messages: AppMessages;
}

/**
 * Renders the localized Grove landing-page template.
 *
 * @param props Landing-page input.
 * @returns The assembled application shell and landing-page content.
 */
export const LandingPage = ({ feedbackWidgetConfig, locale, messages }: LandingPageProps) => {
  const direction = textDirectionForLocale(locale);
  const features = [
    messages.home.accessibleFeature,
    messages.home.consistencyFeature,
    messages.home.developmentFeature,
    messages.home.operationsFeature,
  ];

  return (
    <>
      <PageInteractions />
      <a className="usa-skipnav" data-focus-target={MAIN_CONTENT_ID} href={`#${MAIN_CONTENT_ID}`}>
        {messages.shell.skipLinkLabel}
      </a>
      <Banner content={messages.shell} direction={direction} />
      <HeaderController content={messages.shell} currentLocale={locale} direction={direction} />
      <main id={MAIN_CONTENT_ID}>
        <Hero content={messages.home} />
        <section className="grid-container usa-section" id="features">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <h2 className="font-heading-xl margin-top-0">{messages.home.featureHeading}</h2>
            </div>
            <div className="usa-prose tablet:grid-col-8">
              <p className="usa-intro">{messages.home.featureIntroduction}</p>
            </div>
          </div>
        </section>
        <GraphicList features={features} label={messages.home.featureHeading} />
        <section className="usa-section" id="next-steps">
          <div className="grid-container">
            <h2 className="font-heading-xl margin-y-0">{messages.home.callToActionHeading}</h2>
            <p className="usa-intro">{messages.home.callToActionIntroduction}</p>
            <a className="usa-button usa-button--big" href={GROVE_DOCUMENTATION_HREF}>
              {messages.home.callToActionLabel}
            </a>
          </div>
        </section>
      </main>
      <FeedbackWidgetController config={feedbackWidgetConfig} />
      <Footer content={messages.footer} />
      <Identifier content={messages.identifier} />
    </>
  );
};
