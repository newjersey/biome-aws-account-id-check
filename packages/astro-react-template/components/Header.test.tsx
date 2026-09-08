/**
 * Verifies the stateless Grove header and its React controller.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HeaderController } from "@/controllers/HeaderController";
import { LANGUAGE_DESCRIPTORS } from "@/i18n/languages";
import type { LocaleTestCase } from "@/tests/localeCases";
import { LOCALE_TEST_CASES } from "@/tests/localeCases";

/**
 * Describes localized link props accepted by the navigation test double.
 */
interface MockLocalizedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link content rendered by the test double. */
  readonly children: ReactNode;
  /** Link destination passed by the component. */
  readonly href: string;
  /** Locale handled by the production navigation wrapper. */
  readonly locale?: string;
}

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, locale: _locale, ...props }: MockLocalizedLinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const verifyHeaderController = async ({
  direction,
  locale,
  messages,
}: LocaleTestCase): Promise<void> => {
  const user = userEvent.setup();
  render(
    <HeaderController
      content={messages.shell}
      currentLocale={locale}
      direction={direction}
      pathname="/"
    />,
  );

  const menuButton = screen.getByRole("button", { name: messages.shell.menuLabel });
  expect(menuButton).toHaveAttribute("aria-controls", "primary-navigation");
  await user.click(menuButton);

  const closeButton = screen.getByRole("button", { name: messages.shell.closeNavigationLabel });
  expect(closeButton).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(menuButton).toHaveFocus();
  expect(menuButton).toHaveAttribute("aria-expanded", "false");

  const languageButtons = screen.getAllByRole("button", {
    name: messages.shell.languageSelector.buttonLabel,
  });
  const languageButton = languageButtons.find((button) =>
    button.getAttribute("aria-controls")?.endsWith("-mobile"),
  );

  expect(languageButtons).toHaveLength(2);
  if (!languageButton) {
    throw new Error("Expected a mobile language-selector trigger.");
  }

  await user.click(languageButton);
  await user.keyboard("{Escape}");
  expect(languageButton).toHaveFocus();
  expect(languageButton).toHaveAttribute("aria-expanded", "false");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
};

const verifyHeader = async ({ direction, locale, messages }: LocaleTestCase): Promise<void> => {
  const user = userEvent.setup();
  const onOpenNavigation = vi.fn();
  const onCloseNavigation = vi.fn();
  const onNavigate = vi.fn();
  const onToggleDesktopLanguage = vi.fn();
  const onToggleMobileLanguage = vi.fn();

  const { container } = render(
    <Header
      closeButtonRef={createRef<HTMLButtonElement>()}
      content={messages.shell}
      currentLocale={locale}
      desktopLanguageContainerRef={createRef<HTMLLIElement>()}
      desktopLanguageTriggerRef={createRef<HTMLButtonElement>()}
      direction={direction}
      isNavigationOpen={false}
      menuButtonRef={createRef<HTMLButtonElement>()}
      mobileLanguageContainerRef={createRef<HTMLLIElement>()}
      mobileLanguageTriggerRef={createRef<HTMLButtonElement>()}
      onCloseNavigation={onCloseNavigation}
      onNavigate={onNavigate}
      onOpenNavigation={onOpenNavigation}
      onToggleDesktopLanguage={onToggleDesktopLanguage}
      onToggleMobileLanguage={onToggleMobileLanguage}
      openLanguageSelector={null}
      optionsIdPrefix={`language-options-${locale}`}
      pathname="/"
    />,
  );

  const navigation = screen.getByRole("navigation", { name: messages.shell.navigationLabel });
  const menuButton = screen.getByRole("button", { name: messages.shell.menuLabel });
  const homeLinks = screen.getAllByRole("link", { name: messages.shell.homeLabel });

  expect(navigation).toHaveAttribute("id", "primary-navigation");
  expect(menuButton).toHaveAttribute("aria-controls", "primary-navigation");
  expect(homeLinks.some((link) => link.getAttribute("aria-current") === "page")).toBe(true);
  expect(
    screen.getByRole("link", { name: messages.shell.groveDocumentationLabel }),
  ).toHaveAttribute("href", "https://grove.nj.gov/");
  expect(container.querySelector('use[href$="#close"]')).not.toBeNull();
  expect(screen.queryByRole("search")).not.toBeInTheDocument();
  expect(container.querySelector(`#language-options-${locale}-mobile`)).toBeInTheDocument();
  expect(container.querySelector(`#language-options-${locale}-desktop`)).toBeInTheDocument();

  await user.click(menuButton);
  expect(onOpenNavigation).toHaveBeenCalledOnce();

  await user.click(screen.getByRole("link", { name: messages.shell.foundationLabel }));
  expect(onNavigate).toHaveBeenCalledOnce();
};

const verifyLanguageSelector = ({ locale, direction, messages }: LocaleTestCase): void => {
  const optionsId = `language-options-${locale}`;
  const { container } = render(
    <LanguageSelector
      containerRef={createRef<HTMLLIElement>()}
      content={messages.shell.languageSelector}
      currentLocale={locale}
      direction={direction}
      isOpen
      onToggle={vi.fn()}
      optionsId={optionsId}
      placement="desktop"
      pathname="/"
      triggerRef={createRef<HTMLButtonElement>()}
    />,
  );

  const trigger = screen.getByRole("button", {
    name: messages.shell.languageSelector.buttonLabel,
  });
  const options = container.querySelector(`#${optionsId}`);
  const currentLink = container.querySelector<HTMLAnchorElement>(`a[hreflang="${locale}"]`);
  const nativeName = currentLink?.querySelector(`[lang="${locale}"]`);

  expect(trigger).toHaveAttribute("aria-controls", optionsId);
  expect(options).not.toBeNull();
  expect(within(options as HTMLElement).getAllByRole("link")).toHaveLength(
    LANGUAGE_DESCRIPTORS.length,
  );
  expect(currentLink).toHaveAttribute("aria-current", "page");
  expect(currentLink).not.toHaveAttribute("aria-label");
  expect(nativeName).toHaveAttribute("dir", direction);
};

describe("Grove header", () => {
  it.each(LOCALE_TEST_CASES)("$locale manages the header controller", verifyHeaderController);
  it.each(LOCALE_TEST_CASES)("$locale renders the stateless header", verifyHeader);
  it.each(LOCALE_TEST_CASES)("$locale renders native language semantics", verifyLanguageSelector);
});
