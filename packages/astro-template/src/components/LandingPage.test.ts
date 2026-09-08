/**
 * Verifies the assembled Astro homepage output.
 */

// @vitest-environment node

import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { MESSAGE_CATALOG } from "@/content/messages/catalog";
import type { AppLocale } from "@/i18n/locales";
import { textDirectionForLocale } from "@/i18n/locales";
import LandingPage from "@/src/components/LandingPage.astro";

const renderHomepage = async (locale: AppLocale): Promise<Document> => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(LandingPage, {
    props: { locale },
  });

  return new JSDOM(html).window.document;
};

describe("LandingPage", () => {
  it.each(["en-US", "ar-SA"] as const)("renders the %s document contract", async (locale) => {
    const document = await renderHomepage(locale);
    const messages = MESSAGE_CATALOG[locale];
    const languageOptions = document.querySelectorAll("a[hreflang]");

    expect(document.documentElement.lang).toBe(locale);
    expect(document.documentElement.dir).toBe(textDirectionForLocale(locale));
    expect(document.title).toBe(messages.home.metadataTitle);
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      messages.home.metadataDescription,
    );
    expect(document.querySelector("main#main-content")).not.toBeNull();
    expect(document.querySelector("footer.usa-footer")).not.toBeNull();
    expect(document.querySelector(".usa-identifier")).not.toBeNull();
    expect(languageOptions).toHaveLength(14);
    expect(document.querySelector("#language-options-mobile")).not.toBeNull();
    expect(document.querySelector("#language-options-desktop")).not.toBeNull();
    expect(document.querySelectorAll(`a[hreflang="${locale}"][aria-current="page"]`)).toHaveLength(
      2,
    );
  });

  it("loads Grove CSS and JavaScript without a client framework", async () => {
    const document = await renderHomepage("en-US");

    expect(document.querySelector('link[href="/assets/grove/dist/css/styles.css"]')).not.toBeNull();
    expect(
      document.querySelector('script[src="/assets/grove/dist/js/uswds-init.min.js"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('script[src="/assets/grove/dist/js/uswds.min.js"]'),
    ).not.toBeNull();
    expect(document.querySelector("astro-island")).toBeNull();
  });
});
