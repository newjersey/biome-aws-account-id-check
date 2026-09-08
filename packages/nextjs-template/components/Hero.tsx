/**
 * Renders Grove's landing-page hero.
 */

import { GridContainer } from "@trussworks/react-uswds";
import { GROVE_DOCUMENTATION_HREF } from "@/config/externalLinks";
import type { HomeMessages } from "@/content/messages/types";

/**
 * Describes content rendered by the hero.
 */
export interface HeroProps {
  /** Localized homepage content. */
  readonly content: HomeMessages;
}

/**
 * Renders Grove's landing-page hero pattern.
 *
 * @param props Hero input.
 * @returns The primary page introduction and action.
 */
export const Hero = ({ content }: HeroProps) => {
  return (
    <section aria-labelledby="hero-heading" className="usa-hero">
      <GridContainer>
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading" id="hero-heading">
            <span className="usa-hero__heading--alt">{content.heroHeadingLead}</span>{" "}
            {content.heading}
          </h1>
          <p>{content.introduction}</p>
          <a className="usa-button" href={GROVE_DOCUMENTATION_HREF}>
            {content.primaryActionLabel}
          </a>
        </div>
      </GridContainer>
    </section>
  );
};
