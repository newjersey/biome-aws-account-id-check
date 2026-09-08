/**
 * Verifies delegated same-page focus behavior.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PageInteractions } from "@/controllers/PageInteractions";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

const MAIN_CONTENT_ID = "main-content";

/**
 * Verifies activation moves focus to the primary content destination.
 *
 * @param localeCase Locale and messages under test.
 */
const verifyPageInteractions = async ({ messages }: LocaleTestCase): Promise<void> => {
  const user = userEvent.setup();

  render(
    <>
      <PageInteractions />
      <a className="usa-skipnav" data-focus-target={MAIN_CONTENT_ID} href={`#${MAIN_CONTENT_ID}`}>
        {messages.shell.skipLinkLabel}
      </a>
      <main id={MAIN_CONTENT_ID}>Primary content</main>
    </>,
  );

  const skipLink = screen.getByRole("link", { name: messages.shell.skipLinkLabel });
  const mainContent = screen.getByRole("main");

  expect(skipLink).toHaveClass("usa-skipnav");
  expect(skipLink).toHaveAttribute("href", `#${MAIN_CONTENT_ID}`);

  await user.click(skipLink);

  expect(mainContent).toHaveFocus();
  expect(mainContent).toHaveAttribute("tabindex", "0");

  mainContent.blur();

  expect(mainContent).toHaveAttribute("tabindex", "-1");
};

describe("PageInteractions", () => {
  it.each(LOCALE_TEST_CASES)("$locale moves focus to the primary content", verifyPageInteractions);
});
