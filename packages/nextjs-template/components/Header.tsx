/**
 * Renders Grove's stateless basic-header view.
 */

"use client";

import { Header as TrussworksHeader } from "@trussworks/react-uswds";
import type { MouseEventHandler, RefObject } from "react";

import { Icon } from "@/components/Icon";
import { LanguageSelector, type LanguageSelectorPlacement } from "@/components/LanguageSelector";
import { GROVE_DOCUMENTATION_HREF } from "@/config/externalLinks";
import type { NavigationItem, ShellMessages } from "@/content/messages/types";
import type { AppLocale, TextDirection } from "@/i18n/locales";
import { Link } from "@/i18n/navigation";

/**
 * Describes Grove header state and event handlers.
 */
export interface HeaderProps {
  /** Mobile close control used for initial menu focus. */
  readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
  /** Localized application-shell content. */
  readonly content: ShellMessages;
  /** Locale currently displayed by the page. */
  readonly currentLocale: AppLocale;
  /** Desktop language-selector item used for outside-click detection. */
  readonly desktopLanguageContainerRef: RefObject<HTMLLIElement | null>;
  /** Desktop language-selector trigger used for focus restoration. */
  readonly desktopLanguageTriggerRef: RefObject<HTMLButtonElement | null>;
  /** Writing direction used by the current locale. */
  readonly direction: TextDirection;
  /** Whether the mobile navigation is visible. */
  readonly isNavigationOpen: boolean;
  /** Mobile menu trigger used for focus restoration. */
  readonly menuButtonRef: RefObject<HTMLButtonElement | null>;
  /** Mobile language-selector item used for outside-click detection. */
  readonly mobileLanguageContainerRef: RefObject<HTMLLIElement | null>;
  /** Mobile language-selector trigger used for focus restoration. */
  readonly mobileLanguageTriggerRef: RefObject<HTMLButtonElement | null>;
  /** Closes the mobile navigation. */
  readonly onCloseNavigation: MouseEventHandler<HTMLElement>;
  /** Closes the mobile navigation after internal navigation. */
  readonly onNavigate: MouseEventHandler<HTMLAnchorElement>;
  /** Opens the mobile navigation. */
  readonly onOpenNavigation: MouseEventHandler<HTMLButtonElement>;
  /** Toggles the desktop language selector. */
  readonly onToggleDesktopLanguage: () => void;
  /** Toggles the mobile language selector. */
  readonly onToggleMobileLanguage: () => void;
  /** Language selector that is currently expanded. */
  readonly openLanguageSelector: LanguageSelectorPlacement | null;
  /** Unique identifier prefix connecting each language trigger and menu. */
  readonly optionsIdPrefix: string;
  /** Current locale-independent pathname. */
  readonly pathname: string;
}

/**
 * Renders Grove's responsive basic header without owning interaction state.
 *
 * @param props Header view input.
 * @returns The localized site identity and navigation.
 */
export const Header = ({
  closeButtonRef,
  content,
  currentLocale,
  desktopLanguageContainerRef,
  desktopLanguageTriggerRef,
  direction,
  isNavigationOpen,
  menuButtonRef,
  mobileLanguageContainerRef,
  mobileLanguageTriggerRef,
  onCloseNavigation,
  onNavigate,
  onOpenNavigation,
  onToggleDesktopLanguage,
  onToggleMobileLanguage,
  openLanguageSelector,
  optionsIdPrefix,
  pathname,
}: HeaderProps) => {
  const navigationClassName = isNavigationOpen ? "usa-nav is-visible" : "usa-nav";
  const overlayClassName = isNavigationOpen
    ? "usa-overlay border-0 padding-0 is-visible"
    : "usa-overlay border-0 padding-0";
  const languageContainerClassName =
    direction === "rtl"
      ? "margin-2 desktop:margin-y-0 desktop:margin-left-0 desktop:margin-right-auto"
      : "margin-2 desktop:margin-y-0 desktop:margin-left-auto desktop:margin-right-0";
  const navigationItems: readonly NavigationItem[] = [
    { label: content.homeLabel, href: "/", isCurrent: pathname === "/" },
    { label: content.foundationLabel, href: "/#features" },
    { label: content.nextStepsLabel, href: "/#next-steps" },
  ];

  return (
    <>
      <button
        aria-hidden="true"
        className={overlayClassName}
        onClick={onCloseNavigation}
        tabIndex={-1}
        type="button"
      />
      <TrussworksHeader basic>
        <div className="usa-nav-container position-relative z-500">
          <div className="usa-navbar">
            <div className="usa-logo" id="site-logo">
              <em className="usa-logo__text">
                <Link aria-label={content.homeLabel} href="/" locale={currentLocale}>
                  {content.siteName}
                </Link>
              </em>
            </div>
            <LanguageSelector
              containerRef={mobileLanguageContainerRef}
              content={content.languageSelector}
              currentLocale={currentLocale}
              direction={direction}
              isOpen={openLanguageSelector === "mobile"}
              onToggle={onToggleMobileLanguage}
              optionsId={`${optionsIdPrefix}-mobile`}
              pathname={pathname}
              placement="mobile"
              triggerRef={mobileLanguageTriggerRef}
            />
            <button
              aria-controls="primary-navigation"
              aria-expanded={isNavigationOpen}
              className="usa-menu-btn"
              onClick={onOpenNavigation}
              ref={menuButtonRef}
              type="button"
            >
              {content.menuLabel}
            </button>
          </div>
          <nav
            aria-label={content.navigationLabel}
            className={navigationClassName}
            id="primary-navigation"
          >
            <button
              aria-label={content.closeNavigationLabel}
              className="usa-nav__close"
              onClick={onCloseNavigation}
              ref={closeButtonRef}
              type="button"
            >
              <Icon name="close" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              {navigationItems.map((item) => {
                const className = item.isCurrent ? "usa-nav__link usa-current" : "usa-nav__link";

                return (
                  <li className="usa-nav__primary-item" key={item.href}>
                    <Link
                      aria-current={item.isCurrent ? "page" : undefined}
                      className={className}
                      href={item.href}
                      locale={currentLocale}
                      onClick={onNavigate}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href={GROVE_DOCUMENTATION_HREF}>
                  <span>{content.groveDocumentationLabel}</span>
                </a>
              </li>
            </ul>
            <div className={languageContainerClassName}>
              <LanguageSelector
                containerRef={desktopLanguageContainerRef}
                content={content.languageSelector}
                currentLocale={currentLocale}
                direction={direction}
                isOpen={openLanguageSelector === "desktop"}
                onToggle={onToggleDesktopLanguage}
                optionsId={`${optionsIdPrefix}-desktop`}
                pathname={pathname}
                placement="desktop"
                triggerRef={desktopLanguageTriggerRef}
              />
            </div>
          </nav>
        </div>
      </TrussworksHeader>
    </>
  );
};
