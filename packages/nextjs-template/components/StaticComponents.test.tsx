/**
 * Verifies localized contracts for the stateless Grove components.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { GraphicList } from "@/components/GraphicList";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { Identifier } from "@/components/Identifier";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

const featuresForCase = ({ messages }: LocaleTestCase) => [
  messages.home.accessibleFeature,
  messages.home.consistencyFeature,
  messages.home.developmentFeature,
  messages.home.operationsFeature,
];

const verifyHero = ({ messages }: LocaleTestCase): void => {
  render(<Hero content={messages.home} />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: `${messages.home.heroHeadingLead} ${messages.home.heading}`,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: messages.home.primaryActionLabel })).toHaveClass(
    "usa-button",
  );
};

const verifyGraphicList = (localeCase: LocaleTestCase): void => {
  const { messages } = localeCase;
  const { container } = render(
    <GraphicList features={featuresForCase(localeCase)} label={messages.home.featureHeading} />,
  );

  expect(screen.getByRole("region", { name: messages.home.featureHeading })).toBeInTheDocument();
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  expect(container.querySelectorAll('img[alt=""]')).toHaveLength(4);
};

const verifyBanner = ({ direction, messages }: LocaleTestCase): void => {
  const { container } = render(<Banner content={messages.shell} direction={direction} />);

  expect(
    screen.getByRole("region", { name: messages.shell.officialSiteBannerLabel }),
  ).toBeInTheDocument();
  expect(screen.getByRole("img", { name: messages.shell.stateSealAlt })).toHaveClass("height-auto");
  expect(screen.getByRole("link", { name: messages.shell.officialSiteLabel })).toHaveClass(
    "display-flex",
    "flex-align-center",
    "line-height-sans-2",
    "minh-4",
  );
  expect(container.querySelector('use[href$="#mail"]')).not.toBeNull();
};

const verifyFooter = ({ messages }: LocaleTestCase): void => {
  render(<Footer content={messages.footer} />);

  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: messages.footer.navigationLabel }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: messages.footer.returnToTopLabel })).toHaveAttribute(
    "data-focus-target",
    "top",
  );
  expect(screen.getByRole("link", { name: messages.footer.contactEmailLabel })).toHaveAttribute(
    "href",
    "mailto:team@innovation.nj.gov",
  );
};

const verifyIdentifier = ({ messages }: LocaleTestCase): void => {
  render(<Identifier content={messages.identifier} />);

  expect(screen.getByRole("region", { name: messages.identifier.label })).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: messages.identifier.navigationLabel }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: messages.identifier.accessibilityLabel }),
  ).toHaveAttribute("href", "https://www.nj.gov/nj/accessibility.html");
  expect(
    screen.getByRole("region", { name: messages.identifier.copyrightLabel }),
  ).toHaveTextContent(String(new Date().getFullYear()));
};

const verifyIcon = (): void => {
  const { container } = render(<Icon className="usa-icon--size-3" name="mail" />);

  expect(container.querySelector("svg")).toHaveClass("usa-icon", "usa-icon--size-3");
  expect(container.querySelector("use")).toHaveAttribute(
    "href",
    "/assets/grove/dist/img/sprite.svg#mail",
  );
};

describe("Stateless Grove components", () => {
  it.each(LOCALE_TEST_CASES)("$locale renders the hero contract", verifyHero);
  it.each(LOCALE_TEST_CASES)("$locale renders the graphic-list contract", verifyGraphicList);
  it.each(LOCALE_TEST_CASES)("$locale renders the banner contract", verifyBanner);
  it.each(LOCALE_TEST_CASES)("$locale renders the footer contract", verifyFooter);
  it.each(LOCALE_TEST_CASES)("$locale renders the identifier contract", verifyIdentifier);
  it("renders decorative sprite icons", verifyIcon);
});
