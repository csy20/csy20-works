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

const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

type ThemePreference = { theme: Theme; explicit: boolean };

function getSystemTheme(): Theme {
  try {
    return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return { theme: "light", explicit: false };
  }

  try {
    const stored = window.localStorage.getItem(config.themeStorageKey);
    if (stored === "light" || stored === "dark") {
      return { theme: stored, explicit: true };
    }
  } catch {
    // Private browsing and restricted storage still get a complete theme.
  }

  return { theme: getSystemTheme(), explicit: false };
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
    if (explicit) return;

    let media: MediaQueryList;
    try {
      media = window.matchMedia(SYSTEM_THEME_QUERY);
    } catch {
      return;
    }

    const updateSystemPreference = (event: MediaQueryListEvent) => {
      setPreference((current) =>
        current.explicit
          ? current
          : { theme: event.matches ? "dark" : "light", explicit: false },
      );
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateSystemPreference);
      return () => media.removeEventListener("change", updateSystemPreference);
    }

    // Support older WebKit without making media APIs a rendering dependency.
    media.addListener?.(updateSystemPreference);
    return () => media.removeListener?.(updateSystemPreference);
  }, [explicit]);

  useEffect(() => {
    const syncStoredPreference = (event: StorageEvent) => {
      if (event.key !== config.themeStorageKey && event.key !== null) return;

      if (event.newValue === "light" || event.newValue === "dark") {
        setPreference({ theme: event.newValue, explicit: true });
      } else {
        setPreference({ theme: getSystemTheme(), explicit: false });
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
