import { type RenderResult, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DEFAULT_LOCALE } from "@/i18n/locales";

export const renderWithRouter = (pathname: string, children: React.ReactNode): RenderResult => {
  const fullPath = pathname.startsWith(`/${DEFAULT_LOCALE}`)
    ? pathname
    : `/${DEFAULT_LOCALE}${pathname}`;
  return render(
    <MemoryRouter initialEntries={[fullPath]}>
      <Routes>
        <Route path=":locale/*" element={children} />
      </Routes>
    </MemoryRouter>,
  );
};
