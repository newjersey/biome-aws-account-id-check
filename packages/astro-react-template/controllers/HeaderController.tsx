/**
 * Owns interaction state for Grove's stateless React header.
 */

import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Header } from "@/components/Header";
import type { LanguageSelectorPlacement } from "@/components/LanguageSelector";
import type { ShellMessages } from "@/content/messages/types";
import type { AppLocale, TextDirection } from "@/i18n/locales";

/**
 * Describes the header controller input.
 */
export interface HeaderControllerProps {
  /** Localized application-shell content. */
  readonly content: ShellMessages;
  /** Locale currently displayed by the page. */
  readonly currentLocale: AppLocale;
  /** Writing direction used by the current locale. */
  readonly direction: TextDirection;
  /** Current locale-independent pathname. */
  readonly pathname: string;
}

/**
 * Describes state and references used by header dismissal events.
 */
interface RegisterDismissalEventsParams {
  /** Whether the responsive navigation is expanded. */
  readonly isNavigationOpen: boolean;
  /** Container belonging to the active language selector. */
  readonly languageContainerRef: RefObject<HTMLLIElement | null>;
  /** Trigger belonging to the active language selector. */
  readonly languageTriggerRef: RefObject<HTMLButtonElement | null>;
  /** Language selector that is currently expanded. */
  readonly openLanguageSelector: LanguageSelectorPlacement | null;
  /** Updates responsive-navigation visibility. */
  readonly setIsNavigationOpen: Dispatch<SetStateAction<boolean>>;
  /** Updates the expanded language selector. */
  readonly setOpenLanguageSelector: Dispatch<SetStateAction<LanguageSelectorPlacement | null>>;
}

/**
 * Registers Escape and outside-pointer behavior for expanded header controls.
 *
 * @param params Active header state and references.
 * @returns Cleanup callback for registered document events.
 */
const registerDismissalEvents = ({
  isNavigationOpen,
  languageContainerRef,
  languageTriggerRef,
  openLanguageSelector,
  setIsNavigationOpen,
  setOpenLanguageSelector,
}: RegisterDismissalEventsParams): (() => void) | undefined => {
  if (!isNavigationOpen && !openLanguageSelector) {
    return undefined;
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") {
      return;
    }

    if (openLanguageSelector) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpenLanguageSelector(null);
      languageTriggerRef.current?.focus();
      return;
    }

    setIsNavigationOpen(false);
  };
  const handlePointerDown = (event: PointerEvent): void => {
    if (
      openLanguageSelector &&
      languageContainerRef.current &&
      !languageContainerRef.current.contains(event.target as Node)
    ) {
      setOpenLanguageSelector(null);
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("pointerdown", handlePointerDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("pointerdown", handlePointerDown);
  };
};

/**
 * Owns responsive-navigation and language-selector state.
 *
 * @param props Header controller input.
 * @returns The stateless Grove header connected to React behavior.
 */
export const HeaderController = ({
  content,
  currentLocale,
  direction,
  pathname,
}: HeaderControllerProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [openLanguageSelector, setOpenLanguageSelector] =
    useState<LanguageSelectorPlacement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const desktopLanguageContainerRef = useRef<HTMLLIElement>(null);
  const desktopLanguageTriggerRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileLanguageContainerRef = useRef<HTMLLIElement>(null);
  const mobileLanguageTriggerRef = useRef<HTMLButtonElement>(null);
  const navigationWasOpenRef = useRef(false);
  const optionsIdPrefix = useId();
  const activeLanguageContainerRef =
    openLanguageSelector === "mobile" ? mobileLanguageContainerRef : desktopLanguageContainerRef;
  const activeLanguageTriggerRef =
    openLanguageSelector === "mobile" ? mobileLanguageTriggerRef : desktopLanguageTriggerRef;

  useEffect(() => {
    if (isNavigationOpen) {
      closeButtonRef.current?.focus();
    } else if (navigationWasOpenRef.current) {
      menuButtonRef.current?.focus();
    }

    navigationWasOpenRef.current = isNavigationOpen;
  }, [isNavigationOpen]);

  useEffect(
    () =>
      registerDismissalEvents({
        isNavigationOpen,
        languageContainerRef: activeLanguageContainerRef,
        languageTriggerRef: activeLanguageTriggerRef,
        openLanguageSelector,
        setIsNavigationOpen,
        setOpenLanguageSelector,
      }),
    [activeLanguageContainerRef, activeLanguageTriggerRef, isNavigationOpen, openLanguageSelector],
  );

  const closeNavigation = (): void => {
    setOpenLanguageSelector(null);
    setIsNavigationOpen(false);
  };
  const toggleLanguageSelector = (placement: LanguageSelectorPlacement): void => {
    setOpenLanguageSelector((currentPlacement) =>
      currentPlacement === placement ? null : placement,
    );
  };

  return (
    <Header
      closeButtonRef={closeButtonRef}
      content={content}
      currentLocale={currentLocale}
      desktopLanguageContainerRef={desktopLanguageContainerRef}
      desktopLanguageTriggerRef={desktopLanguageTriggerRef}
      direction={direction}
      isNavigationOpen={isNavigationOpen}
      menuButtonRef={menuButtonRef}
      mobileLanguageContainerRef={mobileLanguageContainerRef}
      mobileLanguageTriggerRef={mobileLanguageTriggerRef}
      onCloseNavigation={closeNavigation}
      onNavigate={closeNavigation}
      onOpenNavigation={() => setIsNavigationOpen(true)}
      onToggleDesktopLanguage={() => toggleLanguageSelector("desktop")}
      onToggleMobileLanguage={() => toggleLanguageSelector("mobile")}
      openLanguageSelector={openLanguageSelector}
      optionsIdPrefix={optionsIdPrefix}
      pathname={pathname}
    />
  );
};
