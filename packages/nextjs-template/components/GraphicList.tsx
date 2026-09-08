/**
 * Renders Grove's landing-page graphic list.
 */

import { GridContainer, MediaBlockBody } from "@trussworks/react-uswds";
import Image from "next/image";

import type { StarterFeature } from "@/content/messages/types";

const FEATURE_IMAGE_PATH = "/assets/grove/dist/img/circle-124.png";
const FEATURES_PER_ROW = 2;

/**
 * Describes content rendered by the graphic list.
 */
export interface GraphicListProps {
  /** Accessible label identifying the graphic-list section. */
  readonly label: string;
  /** Localized features displayed by the graphic list. */
  readonly features: readonly StarterFeature[];
}

/**
 * Renders Grove's landing-template graphic-list variant.
 *
 * @param props Graphic-list input.
 * @returns The localized graphic list.
 */
export const GraphicList = ({ features, label }: GraphicListProps) => {
  const rows = [
    features.slice(0, FEATURES_PER_ROW),
    features.slice(FEATURES_PER_ROW, FEATURES_PER_ROW * 2),
  ];

  return (
    <section aria-label={label} className="usa-graphic-list usa-section usa-section--dark">
      <GridContainer>
        {rows.map((row) => (
          <div className="usa-graphic-list__row grid-row grid-gap" key={row[0]?.title}>
            {row.map((feature) => (
              <div className="usa-media-block tablet:grid-col" key={feature.title}>
                <Image
                  alt=""
                  className="usa-media-block__img"
                  height={124}
                  src={FEATURE_IMAGE_PATH}
                  width={124}
                />
                <MediaBlockBody>
                  <h3 className="usa-graphic-list__heading">{feature.title}</h3>
                  <p>{feature.description}</p>
                </MediaBlockBody>
              </div>
            ))}
          </div>
        ))}
      </GridContainer>
    </section>
  );
};
