/**
 * Verifies every localized homepage against Grove and WCAG page contracts.
 */

import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, type Route, test } from "@playwright/test";

import type { FeedbackWidgetLanguage } from "@/config/feedbackWidget";
import { feedbackWidgetLanguageForLocale } from "@/config/feedbackWidget";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

const FEEDBACK_API_PATTERN = "**/app/feedback/dev**";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/**
 * Describes localized browser-test input.
 */
interface LocalizedPageTestParams {
  /** Browser page provided by Playwright. */
  readonly page: Page;
  /** Locale route and messages under test. */
  readonly localeCase: LocaleTestCase;
}

/**
 * Describes official widget text for one supported language.
 */
interface FeedbackWidgetExpectations {
  /** Initial feedback question. */
  readonly prompt: string;
  /** Positive rating button label. */
  readonly positiveLabel: string;
  /** Follow-up question displayed after a positive rating. */
  readonly positiveFollowUp: string;
}

const FEEDBACK_EXPECTATIONS: Readonly<Record<FeedbackWidgetLanguage, FeedbackWidgetExpectations>> =
  {
    en: {
      prompt: "Did you find what you were looking for on this page?",
      positiveLabel: "Yes",
      positiveFollowUp:
        "Great! We're looking for ways to improve this page — what ideas come to mind?",
    },
    es: {
      prompt: "¿Encontraste lo que buscabas en esta página?",
      positiveLabel: "Sí",
      positiveFollowUp:
        "¡Excelente! Estamos buscando formas de mejorar esta página. ¿Qué ideas se te ocurren?",
    },
  };

/**
 * Returns whether rendered content exceeds the document viewport.
 *
 * @returns Whether the document has horizontal overflow.
 */
const documentHasHorizontalOverflow = (): boolean => {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
};

/**
 * Returns the vertical center offset between a banner and its official-site link.
 *
 * @param banner Official-site banner element.
 * @returns Absolute center difference in CSS pixels.
 */
const bannerLinkCenterOffset = (banner: Element): number => {
  const link = banner.querySelector<HTMLAnchorElement>('a[href="https://www.nj.gov/"]');

  if (!link) {
    return Number.POSITIVE_INFINITY;
  }

  const bannerBounds = banner.getBoundingClientRect();
  const linkBounds = link.getBoundingClientRect();

  return Math.abs(
    (bannerBounds.top + bannerBounds.bottom - linkBounds.top - linkBounds.bottom) / 2,
  );
};

/**
 * Verifies that localized banner text is vertically centered.
 *
 * @param page Browser page containing the official-site banner.
 * @param label Localized accessible banner label.
 */
const verifyBannerAlignment = async (page: Page, label: string): Promise<void> => {
  const officialSiteBanner = page.getByRole("region", { name: label });

  await expect(officialSiteBanner).toBeVisible();
  await expect
    .poll(() => officialSiteBanner.evaluate(bannerLinkCenterOffset))
    .toBeLessThanOrEqual(1);
};

/**
 * Removes focus from the currently active element.
 */
const blurActiveElement = (): void => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

/**
 * Provides a deterministic response for any feedback API request.
 *
 * @param route Intercepted feedback request.
 */
const fulfillFeedbackRequest = async (route: Route): Promise<void> => {
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({ feedbackId: "playwright-feedback" }),
    status: 200,
  });
};

/**
 * Verifies localized landmarks, content contracts, overflow, and automated WCAG rules.
 *
 * @param params Localized browser-test input.
 */
const verifyLocalizedHomepage = async ({
  page,
  localeCase,
}: LocalizedPageTestParams): Promise<void> => {
  const { direction, locale, messages, route } = localeCase;
  await page.route(FEEDBACK_API_PATTERN, fulfillFeedbackRequest);
  await page.goto(route);

  expect(new URL(page.url()).pathname).toBe(route);
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("html")).toHaveAttribute("dir", direction);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: `${messages.home.heroHeadingLead} ${messages.home.heading}`,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { exact: true, name: messages.home.primaryActionLabel }),
  ).toHaveClass(/(?:^|\s)usa-button(?:\s|$)/);
  await expect(
    page.getByRole("link", { exact: true, name: messages.home.callToActionLabel }),
  ).toHaveClass(/(?:^|\s)usa-button--big(?:\s|$)/);
  await verifyBannerAlignment(page, messages.shell.officialSiteBannerLabel);
  const skipNavigation = page.getByRole("link", { name: messages.shell.skipLinkLabel });
  const mainContent = page.getByRole("main");

  await expect(skipNavigation).toHaveAttribute("href", "#main-content");
  await page.keyboard.press("Tab");
  await expect(skipNavigation).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(mainContent).toBeFocused();
  await expect(mainContent).toHaveAttribute("tabindex", "0");
  await page.keyboard.press("Tab");
  await expect(mainContent).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("nav#primary-navigation")).toHaveAttribute(
    "aria-label",
    messages.shell.navigationLabel,
  );
  await expect(mainContent).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  const returnToTopLink = page.getByRole("link", { name: messages.footer.returnToTopLabel });
  const pageTop = page.locator("body#top");

  await expect(returnToTopLink).toHaveAttribute("href", "#top");
  await returnToTopLink.focus();
  await expect(returnToTopLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(pageTop).toBeFocused();
  await expect(pageTop).toHaveAttribute("tabindex", "0");
  await page.keyboard.press("Tab");
  await expect(pageTop).toHaveAttribute("tabindex", "-1");
  await page.evaluate(blurActiveElement);
  await expect(
    page.getByRole("navigation", { name: messages.footer.navigationLabel }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: messages.identifier.navigationLabel }),
  ).toBeVisible();
  const identifierLogo = page.locator(".usa-identifier__logo-img");

  await expect(identifierLogo).toBeVisible();
  await expect
    .poll(async () =>
      identifierLogo.evaluate((image) => ({
        height: image.getBoundingClientRect().height,
        width: image.getBoundingClientRect().width,
      })),
    )
    .toEqual({ height: 48, width: 48 });
  await expect(
    page.locator(`a[hreflang="${locale}"] span[lang="${locale}"][dir="${direction}"]`),
  ).toHaveCount(2);
  await expect.poll(() => page.evaluate(documentHasHorizontalOverflow)).toBe(false);

  const feedbackLanguage = feedbackWidgetLanguageForLocale(locale);
  if (feedbackLanguage) {
    await expect(page.getByText(FEEDBACK_EXPECTATIONS[feedbackLanguage].prompt)).toBeVisible();
  } else {
    await expect(page.locator("feedback-widget")).toHaveCount(0);
  }

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
};

/**
 * Verifies the feedback integration is localized or intentionally unavailable.
 *
 * @param params Localized browser-test input.
 */
const verifyLocalizedFeedback = async ({
  page,
  localeCase,
}: LocalizedPageTestParams): Promise<void> => {
  const { locale, route } = localeCase;
  const feedbackLanguage = feedbackWidgetLanguageForLocale(locale);
  await page.route(FEEDBACK_API_PATTERN, fulfillFeedbackRequest);
  await page.goto(route);

  if (!feedbackLanguage) {
    await expect(page.locator("feedback-widget")).toHaveCount(0);
    return;
  }

  const expectations = FEEDBACK_EXPECTATIONS[feedbackLanguage];
  await expect(page.getByText(expectations.prompt)).toBeVisible();
  await page.getByRole("button", { name: expectations.positiveLabel, exact: true }).click();
  await expect(page.getByText(expectations.positiveFollowUp)).toBeVisible();
};

/**
 * Registers page tests for one locale.
 *
 * @param localeCase Locale route and messages under test.
 */
const defineLocaleHomepageTests = (localeCase: LocaleTestCase): void => {
  test(`${localeCase.locale} meets localized page and WCAG contracts`, async ({ page }) =>
    verifyLocalizedHomepage({ page, localeCase }));
  test(`${localeCase.locale} exposes supported feedback behavior`, async ({ page }) =>
    verifyLocalizedFeedback({ page, localeCase }));
};

LOCALE_TEST_CASES.forEach(defineLocaleHomepageTests);
