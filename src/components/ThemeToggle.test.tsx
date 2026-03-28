import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "./ThemeProvider";

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Remove theme classes
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders the theme toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("toggles theme when clicked", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");

    // Click to toggle theme
    await user.click(button);

    // Verify localStorage was updated
    const storedTheme = localStorage.getItem("csy20-theme");
    expect(storedTheme).toBeTruthy();
  });

  it("respects initial theme from localStorage", () => {
    localStorage.setItem("csy20-theme", "dark");
    document.documentElement.classList.add("dark");

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
