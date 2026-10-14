import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ThemeContext, type Theme } from "./useTheme";
import { config } from "../config";

type ThemePreference = { theme: Theme; explicit: boolean };

const DEFAULT_PREFERENCE: ThemePreference = { theme: "light", explicit: false };

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") return DEFAULT_PREFERENCE;

  try {
    const stored = window.localStorage.getItem(config.themeStorageKey);
    if (stored === "light" || stored === "dark") {
      return { theme: stored, explicit: true };
    }
  } catch {
    // Private browsing and restricted storage still get a complete theme.
  }

  return DEFAULT_PREFERENCE;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState(getInitialPreference);
  const { theme, explicit } = preference;

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111214" : "#F6F5F1");
  }, [theme]);

  useEffect(() => {
    if (!explicit) return;

    try {
      window.localStorage.setItem(config.themeStorageKey, theme);
    } catch {
      // The preference remains effective for this visit if storage is blocked.
    }
  }, [theme, explicit]);

  useEffect(() => {
    const syncStoredPreference = (event: StorageEvent) => {
      if (event.key !== config.themeStorageKey && event.key !== null) return;

      if (event.newValue === "light" || event.newValue === "dark") {
        setPreference({ theme: event.newValue, explicit: true });
      } else {
        setPreference(DEFAULT_PREFERENCE);
      }
    };

    window.addEventListener("storage", syncStoredPreference);
    return () => window.removeEventListener("storage", syncStoredPreference);
  }, []);

  const setTheme = useCallback((value: Theme) => {
    setPreference({ theme: value, explicit: true });
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference((current) => ({
      theme: current.theme === "dark" ? "light" : "dark",
      explicit: true,
    }));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
