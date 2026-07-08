import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { MotionSafeProvider } from "./components/MotionSafeProvider";
import { profile, techStack } from "./data/siteContent";

vi.mock("react-github-calendar", () => ({
  GitHubCalendar: () => <div data-testid="github-calendar" />,
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useInView: () => true,
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

function renderApp() {
  return render(
    <ThemeProvider>
      <MotionSafeProvider>
        <App />
      </MotionSafeProvider>
    </ThemeProvider>,
  );
}

describe("App", () => {
  it("renders all sections and content correctly", async () => {
    const { container } = renderApp();

    expect(
      screen.getByRole("heading", { name: profile.name }),
    ).toBeInTheDocument();

    expect(screen.getByText(profile.handle)).toBeInTheDocument();

    expect(screen.getByText(profile.heroDescription)).toBeInTheDocument();

    const stackHeading = await screen.findByRole(
      "heading",
      { name: "Tech stack" },
      { timeout: 5000 },
    );
    expect(stackHeading).toBeInTheDocument();

    const stackSection = container.querySelector("#stack");
    expect(stackSection).not.toBeNull();

    for (const item of techStack) {
      expect(
        within(stackSection as HTMLElement).getByText(item.name),
      ).toBeInTheDocument();
    }

    expect(
      await screen.findByRole(
        "heading",
        { name: "Activity" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();

    expect(screen.getByTestId("github-calendar")).toBeInTheDocument();

    expect(
      await screen.findByRole(
        "heading",
        { name: "Apps & Projects" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "MediaPipe AI" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "Bytewise" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole(
        "heading",
        { name: "Get in touch" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Send email/i }),
    ).toBeInTheDocument();
  });
});
