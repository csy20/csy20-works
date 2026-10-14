import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
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
      <App />
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
        project.title === "Bytewise"
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
    expect(screen.getByText("Shipped · Google Play")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("preserves expanded project content when switching themes", async () => {
    const user = userEvent.setup();
    const { container } = renderApp();
    await user.click(screen.getAllByText("Engineering notes")[0]!);
    const detail = container.querySelector("#speech-relay details")!;
    expect(detail).toHaveAttribute("open");
    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
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
