/**
 * Coordinates focus for same-page navigation targets.
 */

const removeTargetFromTabOrder = (event: FocusEvent): void => {
  const target = event.currentTarget;

  if (target instanceof HTMLElement) {
    target.tabIndex = -1;
  }
};

const focusTarget = (targetId: string): void => {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.tabIndex = 0;
  target.focus();
  target.addEventListener("blur", removeTargetFromTabOrder, { once: true });
};

const handleFocusLink = (event: MouseEvent): void => {
  const link = event.currentTarget;

  if (link instanceof HTMLAnchorElement) {
    const targetId = link.dataset.focusTarget;

    if (targetId) {
      focusTarget(targetId);
    }
  }
};

const registerFocusLinks = (): void => {
  const links = document.querySelectorAll<HTMLAnchorElement>("a[data-focus-target]");

  for (const link of links) {
    link.addEventListener("click", handleFocusLink);
  }
};

const handleNestedLanguageEscape = (event: KeyboardEvent): void => {
  if (event.key !== "Escape" || !(event.target instanceof Element)) {
    return;
  }

  const languageMenu = event.target.closest(".usa-language__primary");
  const languageButton = languageMenu?.querySelector<HTMLButtonElement>(".usa-language__link");

  if (languageButton?.getAttribute("aria-expanded") !== "true") {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  languageButton.click();
  languageButton.focus();
};

registerFocusLinks();
document.addEventListener("keydown", handleNestedLanguageEscape, { capture: true });
