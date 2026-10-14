import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";
import { config } from "../config";

function mockSystemTheme(dark: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const media = {
    matches: dark,
    media: "(prefers-color-scheme: dark)",
    addEventListener: vi.fn((_, listener) => listeners.add(listener)),
    removeEventListener: vi.fn((_, listener) => listeners.delete(listener)),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(
    media as unknown as MediaQueryList,
  );

  return (matches: boolean) => {
    media.matches = matches;
    act(() => {
      listeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent),
      );
    });
  };
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  document.head.append(meta);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.remove());
});

describe("ThemeProvider", () => {
  it("defaults to the light theme and ignores the operating system", () => {
    const changeSystemTheme = mockSystemTheme(true);
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });

    expect(result.current.theme).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#F6F5F1",
    );
    expect(window.localStorage.getItem(config.themeStorageKey)).toBeNull();

    changeSystemTheme(false);
    expect(result.current.theme).toBe("light");
    expect(window.localStorage.getItem(config.themeStorageKey)).toBeNull();
  });

  it("preserves a stored preference over the operating system", () => {
    mockSystemTheme(true);
    window.localStorage.setItem(config.themeStorageKey, "light");
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });

    expect(result.current.theme).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#F6F5F1",
    );
  });

  it("persists a deliberate switch and stops following system changes", () => {
    const changeSystemTheme = mockSystemTheme(false);
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");
    expect(window.localStorage.getItem(config.themeStorageKey)).toBe("dark");

    changeSystemTheme(false);
    expect(result.current.theme).toBe("dark");

    act(() => result.current.setTheme("light"));
    expect(window.localStorage.getItem(config.themeStorageKey)).toBe("light");
  });

  it("ignores invalid stored values and falls back safely without browser APIs", () => {
    window.localStorage.setItem(config.themeStorageKey, "sepia");
    vi.spyOn(window, "matchMedia").mockImplementation(() => {
      throw new Error("matchMedia is unavailable");
    });
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.theme).toBe("light");
  });

  it("works when storage reads and writes are blocked", () => {
    mockSystemTheme(true);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage is unavailable");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage is unavailable");
    });
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.theme).toBe("light");

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("synchronizes another tab and returns to the light default when storage clears", () => {
    mockSystemTheme(true);
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: config.themeStorageKey,
          newValue: "light",
        }),
      );
    });
    expect(result.current.theme).toBe("light");

    act(() => window.dispatchEvent(new StorageEvent("storage", { key: null })));
    expect(result.current.theme).toBe("light");
  });

  it("keeps expanded content and child state when switching themes", async () => {
    mockSystemTheme(false);
    function Content() {
      const { toggleTheme } = useTheme();
      return (
        <>
          <details>
            <summary>Engineering detail</summary>
            <p>Technical evidence</p>
          </details>
          <button onClick={toggleTheme}>Change theme</button>
        </>
      );
    }
    render(
      <ThemeProvider>
        <Content />
      </ThemeProvider>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Engineering detail"));
    expect(
      screen.getByText("Technical evidence").closest("details"),
    ).toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Change theme" }));
    expect(
      screen.getByText("Technical evidence").closest("details"),
    ).toHaveAttribute("open");
  });
});
