import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import home from "@/content/en-US/home.json";
import { renderWithRouter } from "@/test/renderWithRouter";
import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("renders heading and body", () => {
    renderWithRouter("/", <HomePage />);
    expect(screen.getByRole("heading", { name: home.heading })).toBeInTheDocument();
    expect(screen.getByText(home.body)).toBeInTheDocument();
  });
});
