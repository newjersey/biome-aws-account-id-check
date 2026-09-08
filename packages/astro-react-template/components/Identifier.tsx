/**
 * Renders Grove's State of New Jersey identifier.
 */

import {
  IdentifierGov,
  IdentifierLink,
  IdentifierLinkItem,
  IdentifierLinks,
  IdentifierLogo,
  IdentifierLogos,
  IdentifierMasthead,
  Identifier as TrussworksIdentifier,
} from "@trussworks/react-uswds";

import type { IdentifierMessages, NavigationItem } from "@/content/messages/types";

const NEW_JERSEY_LOGO_PATH = "/assets/grove/dist/img/nj-logo-gray-20.png";
const NEW_JERSEY_HREF = "https://www.nj.gov/";

/**
 * Describes content rendered by the State identifier.
 */
export interface IdentifierProps {
  /** Localized State identifier content. */
  readonly content: IdentifierMessages;
}

/**
 * Renders Grove's required State identifier.
 *
 * @param props Identifier input.
 * @returns The agency identity, required links, and copyright notice.
 */
export const Identifier = ({ content }: IdentifierProps) => {
  const navigationItems: readonly NavigationItem[] = [
    { label: content.governorLabel, href: "https://www.nj.gov/governor/admin/about/" },
    { label: content.lieutenantGovernorLabel, href: "https://www.nj.gov/governor/admin/lt/" },
    { label: content.homeLabel, href: NEW_JERSEY_HREF },
    { label: content.servicesLabel, href: "https://www.nj.gov/nj/gov/njgov/alphaserv.html" },
    { label: content.departmentsLabel, href: "https://www.nj.gov/nj/gov/deptserv/" },
    { label: content.faqLabel, href: "https://www.nj.gov/faqs/" },
    { label: content.contactLabel, href: "https://www.nj.gov/nj/feedback.html" },
    { label: content.privacyLabel, href: "https://www.nj.gov/nj/privacy.html" },
    { label: content.legalLabel, href: "https://www.nj.gov/nj/legal.html" },
    { label: content.accessibilityLabel, href: "https://www.nj.gov/nj/accessibility.html" },
    { label: content.recordsLabel, href: "https://www.nj.gov/opra/" },
  ];
  const copyright = content.copyright.replace("{year}", String(new Date().getFullYear()));

  return (
    <TrussworksIdentifier>
      <IdentifierMasthead aria-label={content.label}>
        <IdentifierLogos>
          <IdentifierLogo href={NEW_JERSEY_HREF}>
            <img
              alt={content.logoAlt}
              className="usa-identifier__logo-img"
              height={144}
              src={NEW_JERSEY_LOGO_PATH}
              width={144}
            />
          </IdentifierLogo>
        </IdentifierLogos>
        <div className="usa-identifier__identity">
          <p className="usa-identifier__identity-disclaimer">
            {content.disclaimerPrefix} <a href={NEW_JERSEY_HREF}>{content.stateName}</a>.
          </p>
        </div>
      </IdentifierMasthead>
      <IdentifierLinks navProps={{ "aria-label": content.navigationLabel }}>
        {navigationItems.map((item) => (
          <IdentifierLinkItem key={item.href}>
            <IdentifierLink className="usa-link" href={item.href}>
              {item.label}
            </IdentifierLink>
          </IdentifierLinkItem>
        ))}
      </IdentifierLinks>
      <IdentifierGov aria-label={content.copyrightLabel}>
        <div className="usa-identifier__usagov-description">{copyright}</div>
      </IdentifierGov>
    </TrussworksIdentifier>
  );
};
