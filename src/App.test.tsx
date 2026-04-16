import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { profile, techStack } from "./data/siteContent";

vi.mock("react-github-calendar", () => ({
  GitHubCalendar: () => <div data-testid="github-calendar" />,
}));

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

describe("App stack showcase", () => {
  it("renders the updated stack section and every configured tool", () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: profile.heroTitle,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /What I actually build with\./i,
      }),
    ).toBeInTheDocument();

    const stackSection = container.querySelector("#stack");
    expect(stackSection).not.toBeNull();

    for (const item of techStack) {
      expect(
        within(stackSection as HTMLElement).getAllByText(item.name).length,
      ).toBeGreaterThan(0);
    }

    expect(screen.getByText(profile.heroSummary)).toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
    expect(screen.queryByText("Primary stack")).not.toBeInTheDocument();
    expect(container.querySelector("#about")).toBeNull();
    expect(
      within(stackSection as HTMLElement).getAllByText("React Native").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /I try to write code every day\./i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Swipe to see the full year/i)).toBeInTheDocument();
    expect(container.querySelector(".activity-scroll")).not.toBeNull();
  });
});
