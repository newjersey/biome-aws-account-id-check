/**
 * Verifies every locale implements the complete topic catalog.
 */

import { describe, expect, test } from "vitest";

import { MESSAGE_CATALOG } from "@/content/messages/catalog";
import { APP_LOCALES } from "@/i18n/locales";

/**
 * Verifies all supported locales have independently composed topic content.
 */
const verifyLocalizedTopics = () => {
  expect(Object.keys(MESSAGE_CATALOG)).toEqual(APP_LOCALES);

  for (const locale of APP_LOCALES) {
    expect(Object.keys(MESSAGE_CATALOG[locale])).toEqual(["shell", "home", "footer", "identifier"]);
    expect(MESSAGE_CATALOG[locale].home.heading.length).toBeGreaterThan(0);
    expect(MESSAGE_CATALOG[locale].shell.languageSelector.buttonLabel.length).toBeGreaterThan(0);
  }
};

/**
 * Verifies official names and replaceable values remain consistent in every locale.
 */
const verifyCatalogInvariants = () => {
  for (const locale of APP_LOCALES) {
    const messages = MESSAGE_CATALOG[locale];

    expect(messages.shell.siteName).toBe("New Jersey Digital Service Starter");
    expect(messages.footer.agencyName).toBe("New Jersey Innovation Authority");
    expect(messages.identifier.stateName).toBe("State of New Jersey");
    expect(messages.identifier.governorLabel).toContain("Mikie Sherrill");
    expect(messages.identifier.lieutenantGovernorLabel).toContain("Dale G. Caldwell");
    expect(messages.identifier.copyright).toContain("{year}");
  }
};

/**
 * Registers localized catalog tests.
 */
const defineCatalogTests = () => {
  test("provides every topic for every supported locale", verifyLocalizedTopics);
  test("preserves official names and replaceable values", verifyCatalogInvariants);
};

describe("MESSAGE_CATALOG", defineCatalogTests);
