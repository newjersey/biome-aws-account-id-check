/**
 * Coordinates focus for same-page navigation targets.
 */

import { useEffect } from "react";

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

/**
 * Registers delegated same-page focus behavior.
 *
 * @returns No rendered output.
 */
export const PageInteractions = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const targetId = link?.dataset.focusTarget;

      if (targetId) {
        focusTarget(targetId);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};
