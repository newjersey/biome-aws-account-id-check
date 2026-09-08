import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LOCALE_NAMES } from "@/i18n/locales";
import { LanguageSelector } from "./LanguageSelector";

const renderAtPath = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path=":locale/*" element={<LanguageSelector />} />
      </Routes>
    </MemoryRouter>,
  );

describe("<LanguageSelector />", () => {
  it("shows the Spanish option when the current locale is en-US", () => {
    renderAtPath("/en-US");
    const link = screen.getByRole("link", { name: LOCALE_NAMES["es-US"] });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/es-US");
  });

  it("shows the English option when the current locale is es-US", () => {
    renderAtPath("/es-US");
    const link = screen.getByRole("link", { name: LOCALE_NAMES["en-US"] });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/en-US");
  });

  it("preserves the page path when toggling from en-US to es-US", () => {
    renderAtPath("/en-US/about");
    const link = screen.getByRole("link", { name: LOCALE_NAMES["es-US"] });
    expect(link).toHaveAttribute("href", "/es-US/quienes-somos");
  });

  it("preserves the page path when toggling from es-US to en-US", () => {
    renderAtPath("/es-US/quienes-somos");
    const link = screen.getByRole("link", { name: LOCALE_NAMES["en-US"] });
    expect(link).toHaveAttribute("href", "/en-US/about");
  });

  it("sets lang and hrefLang attributes on the toggle link", () => {
    renderAtPath("/en-US");
    const link = screen.getByRole("link", { name: LOCALE_NAMES["es-US"] });
    expect(link).toHaveAttribute("lang", "es-US");
    expect(link).toHaveAttribute("hreflang", "es-US");
  });
});
