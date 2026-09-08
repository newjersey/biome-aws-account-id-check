/**
 * Verifies localized header and language-selector interactions at every viewport.
 */

import { expect, type Locator, type Page, test } from "@playwright/test";

import type { LanguageDescriptor } from "@/i18n/languages";
import { LANGUAGE_DESCRIPTORS } from "@/i18n/languages";
import type { AppLocale } from "@/i18n/locales";
import { textDirectionForLocale } from "@/i18n/locales";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

/**
 * Describes localized browser-test input.
 */
interface LocalizedInteractionParams {
  /** Browser page provided by Playwright. */
  readonly page: Page;
  /** Locale route and messages under test. */
  readonly localeCase: LocaleTestCase;
}

/**
 * Describes one language-option assertion.
 */
interface LanguageOptionAssertionParams {
  /** Language option expected in the selector. */
  readonly descriptor: LanguageDescriptor;
  /** Open language-options list containing the option. */
  readonly options: Locator;
}

/**
 * Returns the target locale used to verify one language change.
 *
 * @param sourceLocale Locale currently displayed.
 * @returns A different supported target locale.
 */
const targetLocaleForSource = (sourceLocale: AppLocale): AppLocale => {
  return sourceLocale === "en-US" ? "ar-SA" : "en-US";
};

/**
 * Returns the canonical route for one supported locale.
 *
 * @param locale Locale whose route is required.
 * @returns Canonical localized route.
 */
const canonicalRouteForLocale = (locale: AppLocale): string => {
  return locale === "en-US" ? "/" : `/${locale}`;
};

/**
 * Returns whether an element is fully contained by the browser viewport.
 *
 * @param element Element whose rendered bounds are inspected.
 * @returns Whether every edge is within the viewport.
 */
const elementIsInsideViewport = (element: Element): boolean => {
  const bounds = element.getBoundingClientRect();

  return (
    bounds.top >= 0 &&
    bounds.left >= 0 &&
    bounds.bottom <= window.innerHeight &&
    bounds.right <= window.innerWidth
  );
};

/**
 * Returns whether a mobile language trigger is contained by its header row.
 *
 * @param element Language-selector trigger.
 * @returns Whether the trigger's vertical edges stay inside the navbar.
 */
const elementIsInsideNavbar = (element: Element): boolean => {
  if (!element.closest('[data-language-selector-placement="mobile"]')) {
    return true;
  }

  const navbar = element.closest(".usa-navbar");

  if (!navbar) {
    return false;
  }

  const elementBounds = element.getBoundingClientRect();
  const navbarBounds = navbar.getBoundingClientRect();

  return elementBounds.top >= navbarBounds.top && elementBounds.bottom <= navbarBounds.bottom;
};

/**
 * Returns whether the element is exposed at all four inset corners.
 *
 * @param element Element checked for ancestor clipping or overlap.
 * @returns Whether the element owns the visible content at each corner.
 */
const elementIsExposed = (element: Element): boolean => {
  const bounds = element.getBoundingClientRect();
  const fractions = [0.1, 0.25, 0.5, 0.75, 0.9];
  const points = fractions.flatMap((verticalFraction) =>
    fractions.map(
      (horizontalFraction) =>
        [
          bounds.left + bounds.width * horizontalFraction,
          bounds.top + bounds.height * verticalFraction,
        ] as const,
    ),
  );

  return points.every(([x, y]) => {
    const visibleElement = document.elementFromPoint(x, y);

    return visibleElement !== null && element.contains(visibleElement);
  });
};

/**
 * Returns whether every mobile language option is fully visible in its panel.
 *
 * @param element Open language-options list.
 * @returns Whether mobile options require no hidden overflow.
 */
const mobileOptionsAreFullyVisible = (element: Element): boolean => {
  if (!element.closest('[data-language-selector-placement="mobile"]')) {
    return true;
  }

  const bounds = element.getBoundingClientRect();
  const options = element.querySelectorAll("a");

  return [...options].every((option) => {
    const optionBounds = option.getBoundingClientRect();
    const visibleElement = document.elementFromPoint(
      optionBounds.left + optionBounds.width / 2,
      optionBounds.top + optionBounds.height / 2,
    );

    return (
      optionBounds.top >= bounds.top &&
      optionBounds.bottom <= bounds.bottom &&
      visibleElement !== null &&
      option.contains(visibleElement)
    );
  });
};

/**
 * Verifies one selector option preserves native language metadata.
 *
 * @param params Option assertion input.
 */
const verifyLanguageOption = async ({
  descriptor,
  options,
}: LanguageOptionAssertionParams): Promise<void> => {
  const option = options.locator(`a[hreflang="${descriptor.locale}"]`);
  await expect(option).toBeVisible();
  await expect(
    option.locator(`span[lang="${descriptor.locale}"][dir="${descriptor.direction}"]`),
  ).toHaveCount(1);
};

/**
 * Verifies responsive header controls close with Escape and restore focus.
 *
 * @param params Localized browser-test input.
 */
const verifyLocalizedHeaderInteraction = async ({
  page,
  localeCase,
}: LocalizedInteractionParams): Promise<void> => {
  const { messages, route } = localeCase;
  await page.goto(route);

  const navigation = page.getByRole("navigation", { name: messages.shell.navigationLabel });
  const menuButton = page.getByRole("button", { name: messages.shell.menuLabel });

  if (await menuButton.isVisible()) {
    await menuButton.click();
    await expect(navigation).toBeVisible();
    await expect(
      page.getByRole("button", { name: messages.shell.closeNavigationLabel }),
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(navigation).not.toBeVisible();
    await expect(menuButton).toBeFocused();
  } else {
    await expect(navigation).toBeVisible();
  }

  const languageButton = page.getByRole("button", {
    name: messages.shell.languageSelector.buttonLabel,
  });
  await expect.poll(() => languageButton.evaluate(elementIsInsideNavbar)).toBe(true);
  await languageButton.click();
  await expect(languageButton).toHaveAttribute("aria-expanded", "true");
  const optionsId = await languageButton.getAttribute("aria-controls");

  if (!optionsId) {
    throw new Error("Expected the language trigger to identify its options.");
  }

  const languageOptions = page.locator(`[id="${optionsId}"]`);
  await expect(languageOptions).toBeVisible();
  await expect.poll(() => languageOptions.evaluate(elementIsInsideViewport)).toBe(true);
  await expect.poll(() => languageOptions.evaluate(elementIsExposed)).toBe(true);
  await expect.poll(() => languageOptions.evaluate(mobileOptionsAreFullyVisible)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(languageButton).toBeFocused();
  await expect(languageButton).toHaveAttribute("aria-expanded", "false");
};

/**
 * Verifies all options and one localized route transition from the source locale.
 *
 * @param params Localized browser-test input.
 */
const verifyLocalizedLanguageSelection = async ({
  page,
  localeCase,
}: LocalizedInteractionParams): Promise<void> => {
  const { locale, messages, route } = localeCase;
  await page.goto(route);

  const languageButton = page.getByRole("button", {
    name: messages.shell.languageSelector.buttonLabel,
  });
  await languageButton.click();
  const optionsId = await languageButton.getAttribute("aria-controls");

  if (!optionsId) {
    throw new Error("Expected the language trigger to identify its options.");
  }

  const languageOptions = page.locator(`[id="${optionsId}"]`);
  await Promise.all(
    LANGUAGE_DESCRIPTORS.map((descriptor) =>
      verifyLanguageOption({ descriptor, options: languageOptions }),
    ),
  );

  const targetLocale = targetLocaleForSource(locale);
  await languageOptions.locator(`a[hreflang="${targetLocale}"]`).click();

  await expect.poll(() => new URL(page.url()).pathname).toBe(canonicalRouteForLocale(targetLocale));
  await expect(page.locator("html")).toHaveAttribute("lang", targetLocale);
  await expect(page.locator("html")).toHaveAttribute("dir", textDirectionForLocale(targetLocale));
};

/**
 * Registers interaction tests for one locale.
 *
 * @param localeCase Locale route and messages under test.
 */
const defineLocaleInteractionTests = (localeCase: LocaleTestCase): void => {
  test(`${localeCase.locale} manages responsive header focus`, async ({ page }) =>
    verifyLocalizedHeaderInteraction({ page, localeCase }));
  test(`${localeCase.locale} changes language from localized controls`, async ({ page }) =>
    verifyLocalizedLanguageSelection({ page, localeCase }));
};

LOCALE_TEST_CASES.forEach(defineLocaleInteractionTests);
