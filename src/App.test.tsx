import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { profile, techStack } from "./data/siteContent";

vi.mock("react-github-calendar", () => ({
  GitHubCalendar: () => <div data-testid="github-calendar" />,
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useInView: () => true,
    useReducedMotion: () => true,
  };
});

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

describe("App", () => {
  it("renders all sections and content correctly", async () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("heading", { name: profile.name }),
    ).toBeInTheDocument();

    expect(screen.getByText(profile.handle)).toBeInTheDocument();

    expect(screen.getByText(profile.heroDescription)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Tech stack" }),
    ).toBeInTheDocument();

    const stackSection = container.querySelector("#stack");
    expect(stackSection).not.toBeNull();

    for (const item of techStack) {
      expect(
        within(stackSection as HTMLElement).getByText(item.name),
      ).toBeInTheDocument();
    }

    expect(
      await screen.findByRole("heading", { name: "Activity" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("github-calendar")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Apps & Projects" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "MediaPipe AI" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Bytewise" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "Get in touch" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Send email/i }),
    ).toBeInTheDocument();
  });
});
