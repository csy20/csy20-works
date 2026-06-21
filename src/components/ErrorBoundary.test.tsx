import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Child content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders error UI when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const Thrower = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Reload page")).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
