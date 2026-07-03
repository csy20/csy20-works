import { useMediaQuery } from "./hooks/useMediaQuery";

export function useAnimationSafeMode() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
