import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./components/SoundProvider";
import {
  profile,
  projects,
  resumeUrl,
  socialLinks,
  techStack,
} from "./data/siteContent";

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, "", "/");
});
const renderApp = () =>
  render(
    <ThemeProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </ThemeProvider>,
  );

describe("portfolio", () => {
  it("renders the complete evidence-first portfolio and preserves every project destination", () => {
    const { container } = renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building useful software, from model to product.",
    );
    expect(screen.getByText(profile.heroDescription)).toBeVisible();
    for (const id of ["hero", "projects", "open-source", "stack", "contact"])
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    for (const project of projects) {
      const article =
        project.title === "02_OS" ||
        project.title === "Speech Relay" ||
        project.title === "Bytewise" ||
        project.title === "Nen"
          ? screen
              .getByRole("heading", {
                name: new RegExp(
                  `^${project.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
                ),
              })
              .closest("article")!
          : screen
              .getByText(project.title, { exact: true })
              .closest("details")!;
      for (const link of project.links)
        expect(
          article.querySelector(`a[href="${link.href}"]`),
        ).toBeInTheDocument();
    }
    for (const link of socialLinks)
      expect(
        container.querySelector(`a[href="${link.href}"]`),
      ).toBeInTheDocument();
    expect(
      container.querySelector(`a[href="${resumeUrl}"]`),
    ).toBeInTheDocument();
    for (const item of techStack)
      expect(
        within(container.querySelector("#stack") as HTMLElement).getByText(
          item.name,
        ),
      ).toBeVisible();
    expect(screen.getByText("Public alpha", { exact: true })).toBeVisible();
    const nen = container.querySelector("article#nen") as HTMLElement;
    expect(nen).toBeInTheDocument();
    expect(within(nen).getByText("Published on Google Play")).toBeVisible();
    expect(
      within(nen).getByRole("link", { name: "Get it on Google Play" }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=dev.csy20.nen",
    );
    expect(
      container.querySelector(".project-index-list")?.textContent,
    ).not.toContain("Nen");
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
    const header = within(container.querySelector(".masthead") as HTMLElement);
    const navigation = within(
      header.getByRole("navigation", { name: "Main navigation" }),
    );
    for (const [name, href] of [
      ["Home", "#hero"],
      ["Work", "#projects"],
      ["Open source", "#open-source"],
      ["Contact", "#contact"],
    ] as const) {
      expect(navigation.getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    }
    expect(navigation.getAllByRole("link")).toHaveLength(4);
    expect(header.queryByRole("button")).not.toBeInTheDocument();
    expect(
      header.queryByRole("link", { name: /GitHub/ }),
    ).not.toBeInTheDocument();

    const dock = within(
      screen.getByRole("navigation", { name: "Social shortcuts" }),
    );
    const dockDestinations = [
      { label: "Home", href: "#hero" },
      ...socialLinks.filter(
        (link) => link.icon !== "instagram" && link.icon !== "linkedin",
      ),
    ];
    const dockLinks = dock.getAllByRole("link");
    expect(dockLinks).toHaveLength(dockDestinations.length);
    for (const [index, destination] of dockDestinations.entries()) {
      const escapedLabel = destination.label.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      expect(dockLinks[index]).toHaveAccessibleName(
        new RegExp(`^${escapedLabel}(?: \\(opens in a new tab\\))?$`),
      );
      expect(dockLinks[index]).toHaveAttribute("href", destination.href);
    }
    expect(
      dock.getByRole("button", { name: "Switch to dark theme" }),
    ).toHaveAttribute("type", "button");
  });

  it("preserves expanded project content when switching themes", async () => {
    const user = userEvent.setup();
    const { container } = renderApp();
    await user.click(screen.getAllByText("Engineering notes")[0]!);
    const detail = container.querySelector("#speech-relay details")!;
    expect(detail).toHaveAttribute("open");
    screen.getByRole("button", { name: "Switch to dark theme" }).focus();
    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveFocus();
    expect(detail).toHaveAttribute("open");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("csy20-theme")).toBe("dark");
  });

  it("renders a home destination for unknown routes", () => {
    window.history.replaceState({}, "", "/missing");
    renderApp();
    expect(
      screen.getByRole("heading", { name: "This page is not here." }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
