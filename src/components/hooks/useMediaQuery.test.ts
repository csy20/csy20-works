import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners: Array<() => void> = [];
  const mediaQueryState = { matches: false };

  beforeEach(() => {
    listeners = [];
    mediaQueryState.matches = false;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return mediaQueryState.matches;
      },
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_: string, listener: () => void) => {
        listeners.push(listener);
      },
      removeEventListener: (_: string, listener: () => void) => {
        listeners = listeners.filter((l) => l !== listener);
      },
      dispatchEvent: vi.fn(),
    }));
  });

  it("returns false initially when query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(pointer: coarse)"));
    expect(result.current).toBe(false);
  });

  it("returns true initially when query matches", () => {
    mediaQueryState.matches = true;
    const { result } = renderHook(() => useMediaQuery("(pointer: coarse)"));
    expect(result.current).toBe(true);
  });

  it("updates when the media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(pointer: coarse)"));
    expect(result.current).toBe(false);

    mediaQueryState.matches = true;
    act(() => {
      listeners.forEach((l) => l());
    });

    expect(result.current).toBe(true);
  });
});
