import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const ComponentWithError = () => {
  throw new Error("test");
};

describe("<ErrorBoundary />", () => {
  it("displays an error message when a child component throws", () => {
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>,
    );

    screen.getByText("Something went wrong");
  });

  it("does not display the error message when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>This should still be present</div>
      </ErrorBoundary>,
    );

    screen.getByText("This should still be present");
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });
});
