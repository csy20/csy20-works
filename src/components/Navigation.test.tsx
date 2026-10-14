import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "./Navigation";
import { ThemeProvider } from "./ThemeProvider";
import { config } from "../config";
import { socialLinks } from "../data/siteContent";

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.restoreAllMocks());

function renderNavigation() {
  render(
    <ThemeProvider>
      <section id="hero" />
      <section id="projects" />
      <section id="open-source" />
      <section id="contact" />
      <Navigation />
    </ThemeProvider>,
  );
}

describe("Navigation", () => {
  it("provides semantic section links, a real GitHub destination, and a theme button", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        return { top: this.id === "hero" ? 0 : 1000 } as DOMRect;
      },
    );
    renderNavigation();

    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "Main navigation",
    );
    for (const [name, href] of [
      ["Home", "#hero"],
      ["Work", "#projects"],
      ["Open source", "#open-source"],
      ["Contact", "#contact"],
    ] as const) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(
      screen.getByRole("link", { name: /GitHub profile/ }),
    ).toHaveAttribute(
      "href",
      socialLinks.find((link) => link.icon === "github")?.href,
    );
    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toHaveAttribute("type", "button");
  });

  it("updates the active section as the reading position changes", async () => {
    const sectionTops: Record<string, number> = {
      hero: 0,
      projects: 1000,
      "open-source": 2000,
      contact: 3000,
    };
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        return { top: sectionTops[this.id] ?? 0 } as DOMRect;
      },
    );
    renderNavigation();

    sectionTops["projects"] = -30;
    window.dispatchEvent(new Event("scroll"));
    await waitFor(() =>
      expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
        "aria-current",
        "location",
      ),
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );

    sectionTops["open-source"] = -30;
    window.dispatchEvent(new Event("scroll"));
    await waitFor(() =>
      expect(screen.getByRole("link", { name: "Open source" })).toHaveAttribute(
        "aria-current",
        "location",
      ),
    );
  });

  it("lets keyboard users focus the dock and switch persistent themes", async () => {
    renderNavigation();
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();

    const themeButton = screen.getByRole("button", {
      name: "Switch to dark theme",
    });
    themeButton.focus();
    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveFocus();
    expect(window.localStorage.getItem(config.themeStorageKey)).toBe("dark");
  });
});
