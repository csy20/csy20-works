import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { MotionSafeProvider } from "./components/MotionSafeProvider";
import { SoundProvider } from "./components/SoundProvider";
import { profile, techStack } from "./data/siteContent";

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
        <SoundProvider>
          <App />
        </SoundProvider>
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

    expect(screen.getByText(profile.heroDescription)).toBeInTheDocument();

    const stackHeading = await screen.findByRole(
      "heading",
      { name: "I ship in" },
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
        { name: "At a glance" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole(
        "heading",
        { name: "Selected work" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /^Speech Relay$/ }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /^Bytewise$/ }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /^Router Agent$/ }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /^MediaPipe AI$/ }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "Studio" }, { timeout: 5000 }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: /^Email$/i }).length,
    ).toBeGreaterThan(0);
  });
});
