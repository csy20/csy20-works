import { createContext, useContext } from "react";

export const CAT_BOOT_KEY = "csy20-cat-boot";

export type CatStart = {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
};

export type CatBootValue = {
  catReady: boolean;
  origin: CatStart | null;
  releaseCat: (origin: CatStart | null) => void;
};

export const CatBootContext = createContext<CatBootValue | null>(null);

export function hasPlayedCatBoot() {
  if (import.meta.env.MODE === "test") return true;
  try {
    return sessionStorage.getItem(CAT_BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

export function markCatBootPlayed() {
  try {
    sessionStorage.setItem(CAT_BOOT_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function useCatBoot() {
  const context = useContext(CatBootContext);
  if (!context) {
    return {
      catReady: true,
      origin: null,
      releaseCat: () => {},
    };
  }
  return context;
}
