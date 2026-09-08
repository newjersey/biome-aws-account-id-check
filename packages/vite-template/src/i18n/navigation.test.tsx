import { renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { localizeHref, useLocalizeHref } from "@/i18n/navigation";

describe("localizeHref", () => {
  it("translates a canonical path to the locale-specific slug", () => {
    expect(localizeHref("/about", "en-US")).toBe("/en-US/about");
    expect(localizeHref("/about", "es-US")).toBe("/es-US/quienes-somos");
  });

  it("uses the locale-specific slug for the default locale", () => {
    expect(localizeHref("/about", DEFAULT_LOCALE)).toBe("/en-US/about");
  });

  it("returns just the locale prefix for the root path", () => {
    expect(localizeHref("/", "en-US")).toBe("/en-US");
    expect(localizeHref("/", "es-US")).toBe("/es-US");
  });

  it("passes through unknown paths unchanged", () => {
    expect(localizeHref("/some-unknown-path", "en-US")).toBe("/en-US/some-unknown-path");
    expect(localizeHref("/some-unknown-path", "es-US")).toBe("/es-US/some-unknown-path");
  });
});

describe("useLocalizeHref", () => {
  const renderWithLocale = (locale: string) =>
    renderHook(() => useLocalizeHref(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/${locale}/some-page`]}>
          <Routes>
            <Route path=":locale/*" element={children} />
          </Routes>
        </MemoryRouter>
      ),
    });

  it("translates a canonical path to the locale-specific slug", () => {
    const { result } = renderWithLocale("es-US");
    expect(result.current("/about")).toBe("/es-US/quienes-somos");
  });

  it("localizes the root path with the current locale", () => {
    const { result } = renderWithLocale("es-US");
    expect(result.current("/")).toBe("/es-US");
  });

  it("falls back to the default locale when no locale param is present", () => {
    const { result } = renderHook(() => useLocalizeHref(), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>,
    });
    expect(result.current("/about")).toBe(`/${DEFAULT_LOCALE}/about`);
  });
});
