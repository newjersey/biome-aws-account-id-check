import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import about from "@/content/en-US/about.json";
import { renderWithRouter } from "@/test/renderWithRouter";
import AboutPage from "./AboutPage";

describe("<AboutPage />", () => {
  it("renders heading and body", () => {
    renderWithRouter("/", <AboutPage />);
    expect(screen.getByRole("heading", { name: about.heading })).toBeInTheDocument();
    expect(screen.getByText(about.body)).toBeInTheDocument();
  });
});
