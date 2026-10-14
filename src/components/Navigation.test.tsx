import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "./Navigation";

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.restoreAllMocks());

function renderNavigation() {
  render(
    <>
      <section id="hero" />
      <section id="projects" />
      <section id="open-source" />
      <section id="contact" />
      <Navigation placement="header" />
    </>,
  );
}

describe("Navigation", () => {
  it("provides four semantic header links without social or theme controls", () => {
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
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
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

  it("lets keyboard users reach every header destination", async () => {
    renderNavigation();
    const user = userEvent.setup();
    for (const name of ["Home", "Work", "Open source", "Contact"]) {
      await user.tab();
      expect(screen.getByRole("link", { name })).toHaveFocus();
    }
  });
});
