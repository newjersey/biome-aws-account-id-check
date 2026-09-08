/**
 * Renders Grove's stateless language-selector view.
 */

"use client";

import { LanguageSelectorButton } from "@trussworks/react-uswds";
import type { RefObject } from "react";

import type { LanguageSelectorMessages } from "@/content/messages/types";
import { LANGUAGE_DESCRIPTORS } from "@/i18n/languages";
import type { AppLocale, TextDirection } from "@/i18n/locales";
import { Link } from "@/i18n/navigation";

/**
 * Identifies the responsive header location of a language selector.
 */
export type LanguageSelectorPlacement = "desktop" | "mobile";

/**
 * Describes the stateless language-selector view.
 */
export interface LanguageSelectorProps {
  /** Element reference used for outside-click detection. */
  readonly containerRef: RefObject<HTMLLIElement | null>;
  /** Localized selector labels. */
  readonly content: LanguageSelectorMessages;
  /** Locale currently displayed by the page. */
  readonly currentLocale: AppLocale;
  /** Writing direction used by the current locale. */
  readonly direction: TextDirection;
  /** Whether the options are visible. */
  readonly isOpen: boolean;
  /** Toggles the language options. */
  readonly onToggle: () => void;
  /** Unique identifier connecting the trigger to the options list. */
  readonly optionsId: string;
  /** Responsive header location rendered by this selector instance. */
  readonly placement: LanguageSelectorPlacement;
  /** Current locale-independent pathname. */
  readonly pathname: string;
  /** Trigger reference used for focus restoration. */
  readonly triggerRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Renders Grove's language selector without owning interaction state.
 *
 * @param props Language-selector input.
 * @returns The language selector and localized options.
 */
export const LanguageSelector = ({
  containerRef,
  content,
  currentLocale,
  direction,
  isOpen,
  onToggle,
  optionsId,
  placement,
  pathname,
  triggerRef,
}: LanguageSelectorProps) => {
  const containerClassName =
    placement === "mobile"
      ? "usa-language-container usa-language--small display-block desktop:display-none"
      : "usa-language-container usa-language--small display-none desktop:display-block";
  const submenuClassName =
    direction === "rtl"
      ? "usa-language__submenu left-0 right-auto z-top"
      : "usa-language__submenu left-auto right-0 z-top";

  return (
    <nav
      aria-label={content.navigationLabel}
      className={containerClassName}
      data-language-selector-placement={placement}
    >
      <ul className="usa-language__primary usa-accordion">
        <li className="usa-language__primary-item" ref={containerRef}>
          <LanguageSelectorButton
            className="usa-button--outline"
            controls={optionsId}
            isOpen={isOpen}
            label={content.buttonLabel}
            onToggle={onToggle}
            ref={triggerRef}
          />
          <ul className={submenuClassName} hidden={!isOpen} id={optionsId}>
            {LANGUAGE_DESCRIPTORS.map((descriptor) => {
              const isCurrent = descriptor.locale === currentLocale;

              return (
                <li className="usa-language__submenu-item" key={descriptor.locale}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    href={pathname}
                    hrefLang={descriptor.locale}
                    locale={descriptor.locale}
                  >
                    <span dir={descriptor.direction} lang={descriptor.locale}>
                      <strong>{descriptor.nativeName}</strong>
                    </span>
                    {descriptor.englishName ? (
                      <bdi lang="en">{` (${descriptor.englishName})`}</bdi>
                    ) : null}
                    {isCurrent ? (
                      <span className="usa-sr-only">{` ${content.currentLanguageLabel}`}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
