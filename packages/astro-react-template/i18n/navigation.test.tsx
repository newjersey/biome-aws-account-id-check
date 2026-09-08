/**
 * Verifies locale-aware anchor path handling.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Link, localizeHref } from "@/i18n/navigation";

describe("localized navigation", () => {
  it("keeps the default locale unprefixed", () => {
    expect(localizeHref("/#features", "en-US")).toBe("/#features");
  });

  it("prefixes non-default locale routes", () => {
    expect(localizeHref("/#features", "es-US")).toBe("/es-US#features");
  });

  it("renders an ordinary localized anchor", () => {
    render(
      <Link href="/application" locale="ar-SA">
        Application
      </Link>,
    );

    expect(screen.getByRole("link", { name: "Application" })).toHaveAttribute(
      "href",
      "/ar-SA/application",
    );
  });
});
