import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { CursorGlow } from "./CursorGlow";
import { ThemeProvider } from "../ThemeProvider";

const STORAGE_KEY = "csy20-theme";
const defaultMatchMediaImpl = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe("CursorGlow", () => {
  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    vi.mocked(window.matchMedia).mockImplementation(defaultMatchMediaImpl);
  });

  it("renders nothing when theme is light", () => {
    const { container } = render(
      <ThemeProvider>
        <CursorGlow />
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the glow element when theme is dark and pointer is fine", () => {
    localStorage.setItem(STORAGE_KEY, "dark");

    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(pointer: fine)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <ThemeProvider>
        <CursorGlow />
      </ThemeProvider>,
    );

    expect(container.firstChild).not.toBeNull();
  });
});
