/**
 * Renders Grove's State of New Jersey official-site banner.
 */

import Image from "next/image";

import { Icon } from "@/components/Icon";
import type { ShellMessages } from "@/content/messages/types";
import type { TextDirection } from "@/i18n/locales";

const STATE_SEAL_PATH = "/assets/grove/dist/img/nj_state_seal.png";

/**
 * Describes content rendered by the official-site banner.
 */
export interface BannerProps {
  /** Localized application-shell content. */
  readonly content: ShellMessages;
  /** Writing direction used by the current locale. */
  readonly direction: TextDirection;
}

/**
 * Renders Grove's official-site banner with localized content.
 *
 * @param props Banner input.
 * @returns The official-site identification banner.
 */
export const Banner = ({ content, direction }: BannerProps) => {
  const sealClassName =
    direction === "rtl"
      ? "nj-banner__header-seal height-auto padding-left-1 padding-right-0"
      : "nj-banner__header-seal height-auto";
  const iconSpacingClassName =
    direction === "rtl"
      ? "usa-icon--size-3 nj-banner__mail-icon margin-left-05"
      : "usa-icon--size-3 nj-banner__mail-icon margin-right-05";

  return (
    <section aria-label={content.officialSiteBannerLabel} className="nj-banner">
      <div className="nj-banner__header">
        <div className="grid-container">
          <div className="nj-banner__inner">
            <div className="grid-col-auto display-flex flex-align-center">
              <Image
                alt={content.stateSealAlt}
                className={sealClassName}
                height={30}
                loading="eager"
                src={STATE_SEAL_PATH}
                width={30}
              />
            </div>
            <div className="grid-col-fill display-flex flex-align-center">
              <a
                className="display-flex flex-align-center line-height-sans-2 minh-4"
                href="https://www.nj.gov/"
                rel="noopener"
              >
                {content.officialSiteLabel}
              </a>
            </div>
            <ul className="grid-col-auto display-flex flex-align-center usa-list--unstyled">
              <li className="display-flex flex-align-center">
                <a
                  className="display-flex flex-align-center line-height-sans-2 minh-4"
                  href="https://www.nj.gov/governor/"
                  rel="noopener"
                >
                  {content.governorLabel}
                </a>
              </li>
              <li className="grid-col-auto display-flex flex-align-center">
                <a
                  className="display-flex flex-align-center line-height-sans-2 minh-4"
                  href="https://www.nj.gov/subscribe/"
                  rel="noopener"
                >
                  <Icon className={iconSpacingClassName} name="mail" />
                  {content.updatesLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
