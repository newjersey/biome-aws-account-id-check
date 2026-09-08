import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon/Icon";
import { LanguageSelector } from "@/components/LanguageSelector/LanguageSelector";
import { useLocalizeHref } from "@/i18n/navigation";
import { routePaths } from "@/routes/routePaths";
import "@/components/Header/Header.css";

const Header = () => {
  const { t } = useTranslation("common");
  const localizeHref = useLocalizeHref();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        handleMenuClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, handleMenuClose]);

  useEffect(() => {
    if (isMenuOpen) {
      closeButtonRef.current?.focus();
    } else {
      if (document.activeElement === closeButtonRef.current) {
        menuButtonRef.current?.focus();
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Overlay click is supplementary - primary close methods are button and Escape key */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Overlay click is supplementary - primary close methods are button and Escape key */}
      <div
        className={isMenuOpen ? "usa-overlay is-visible" : "usa-overlay"}
        onClick={handleMenuClose}
      ></div>
      <header className="usa-header usa-header--basic">
        <div className="usa-nav-container">
          <div className="usa-navbar app-navbar">
            <div className="usa-logo" id="basic-logo">
              <em className="usa-logo__text">
                <Link to={localizeHref(routePaths.home)} className="display-flex flex-align-center">
                  <img className="app-logo" src="/images/logo-img.png" alt="App logo" />
                  {t("header.agencyName")}
                </Link>
              </em>
            </div>
            <div className="desktop:display-none usa-language--small margin-right-2">
              <LanguageSelector />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="usa-menu-btn"
              onClick={handleMenuOpen}
              aria-expanded={isMenuOpen}
              aria-controls="basic-nav-section"
            >
              {t("header.menuText")}
            </button>
          </div>

          <nav
            id="basic-nav-section"
            aria-label="Primary navigation"
            className={isMenuOpen ? "usa-nav is-visible" : "usa-nav"}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="usa-nav__close"
              aria-label="Close navigation"
              onClick={handleMenuClose}
            >
              <Icon icon="close" />
            </button>

            <ul className="usa-nav__primary usa-accordion">
              <li className="usa-nav__primary-item">
                <Link
                  to={localizeHref("/register")}
                  className="usa-nav__link"
                  onClick={handleMenuClose}
                >
                  <span>{t("header.register")}</span>
                </Link>
              </li>
              <li className="usa-nav__primary-item">
                <Link
                  to={localizeHref("/signin")}
                  className="usa-nav__link"
                  onClick={handleMenuClose}
                >
                  <span>{t("header.signin")}</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="display-none desktop:display-flex usa-language-container">
            <LanguageSelector />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
