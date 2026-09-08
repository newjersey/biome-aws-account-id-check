/**
 * Verifies the localized homepage composition.
 */

import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/[locale]/page";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    locale: _locale,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; locale?: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

/**
 * Disables the opt-in feedback integration for composition tests.
 */
const disableFeedbackWidget = (): void => {
  vi.stubEnv("NEXT_PUBLIC_FEEDBACK_WIDGET_ENABLED", "false");
};

/**
 * Renders one homepage through its locale route.
 *
 * @param locale Locale to render.
 * @returns The localized homepage element.
 */
const renderHomePage = async ({ locale, messages }: LocaleTestCase): Promise<void> => {
  const page = await HomePage({ params: Promise.resolve({ locale }) });

  render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {page}
    </NextIntlClientProvider>,
  );
};

/**
 * Verifies the starter page exposes its primary content through semantic landmarks.
 *
 * @param localeCase Locale and messages under test.
 */
const verifyStarterPageStructure = async (localeCase: LocaleTestCase): Promise<void> => {
  const { messages } = localeCase;
  await renderHomePage(localeCase);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: `${messages.home.heroHeadingLead} ${messages.home.heading}`,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: messages.shell.navigationLabel }),
  ).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(
    screen.getByRole("region", {
      name: messages.shell.officialSiteBannerLabel,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: messages.footer.navigationLabel }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", {
      name: messages.identifier.navigationLabel,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: messages.home.primaryActionLabel })).toHaveAttribute(
    "href",
    "https://grove.nj.gov/",
  );
  expect(screen.getByRole("link", { name: messages.home.callToActionLabel })).toHaveAttribute(
    "href",
    "https://grove.nj.gov/",
  );
  expect(screen.queryByTestId("feedback-widget")).not.toBeInTheDocument();
};

/**
 * Registers the localized homepage behavior tests.
 */
const defineHomePageTests = (): void => {
  beforeEach(disableFeedbackWidget);
  it.each(LOCALE_TEST_CASES)(
    "$locale renders an accessible Grove page structure",
    verifyStarterPageStructure,
  );
};

describe("HomePage", defineHomePageTests);
