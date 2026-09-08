/**
 * Renders Grove's default agency footer.
 */

import {
  Address,
  FooterNav,
  Logo,
  SocialLinks,
  Footer as TrussworksFooter,
} from "@trussworks/react-uswds";
import Image from "next/image";

import { GROVE_DOCUMENTATION_HREF } from "@/config/externalLinks";
import type { FooterMessages, NavigationItem, SocialLink } from "@/content/messages/types";

const AGENCY_LOGO_PATH = "/assets/grove/dist/img/logo-img.png";
const CONTACT_WEBSITE_HREF = "https://innovation.nj.gov/";
const CONTACT_EMAIL_HREF = "mailto:team@innovation.nj.gov";

/**
 * Describes content rendered by the agency footer.
 */
export interface FooterProps {
  /** Localized footer content. */
  readonly content: FooterMessages;
}

/**
 * Renders Grove's default footer with localized navigation and contact information.
 *
 * @param props Footer input.
 * @returns The footer navigation and agency contact information.
 */
export const Footer = ({ content }: FooterProps) => {
  const navigationItems: readonly NavigationItem[] = [
    { label: content.foundationLabel, href: "#features" },
    { label: content.nextStepsLabel, href: "#next-steps" },
    { label: content.groveDocumentationLabel, href: GROVE_DOCUMENTATION_HREF },
  ];
  const socialLinks: readonly SocialLink[] = [
    {
      label: content.githubLabel,
      href: "https://github.com/newjersey",
      iconPath: "/assets/grove/dist/img/usa-icons/github.svg",
    },
    {
      label: content.storybookLabel,
      href: "https://storybook.grove.nj.gov/",
      iconPath: "/assets/grove/dist/img/usa-icons/launch.svg",
    },
  ];

  const returnToTop = (
    <div className="grid-container usa-footer__return-to-top">
      <a data-focus-target="top" href="#top">
        {content.returnToTopLabel}
      </a>
    </div>
  );
  const primary = (
    <div className="grid-container">
      <FooterNav
        aria-label={content.navigationLabel}
        links={navigationItems.map((item) => (
          <a className="usa-footer__primary-link" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        size="medium"
      />
    </div>
  );
  const secondary = (
    <div className="grid-row grid-gap">
      <Logo
        heading={<h3 className="usa-footer__logo-heading">{content.agencyName}</h3>}
        image={
          <Image
            alt=""
            className="usa-footer__logo-img height-auto"
            height={140}
            src={AGENCY_LOGO_PATH}
            width={140}
          />
        }
        size="medium"
      />
      <div className="usa-footer__contact-links mobile-lg:grid-col-6">
        <SocialLinks
          links={socialLinks.map((item) => (
            <a className="usa-social-link" href={item.href} key={item.href}>
              <Image
                alt={item.label}
                className="usa-social-link__icon"
                height={24}
                src={item.iconPath}
                width={24}
              />
            </a>
          ))}
        />
        <h3 className="usa-footer__contact-heading">{content.contactHeading}</h3>
        <Address
          items={[
            <a href={CONTACT_WEBSITE_HREF} key={CONTACT_WEBSITE_HREF}>
              {content.contactWebsiteLabel}
            </a>,
            <a href={CONTACT_EMAIL_HREF} key={CONTACT_EMAIL_HREF}>
              {content.contactEmailLabel}
            </a>,
          ]}
          size="medium"
        />
      </div>
    </div>
  );

  return <TrussworksFooter primary={primary} returnToTop={returnToTop} secondary={secondary} />;
};
