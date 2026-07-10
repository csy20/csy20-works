import { useMemo, type ReactNode } from "react";
import { MotionSafeContext } from "./MotionSafeContext";
import { useMediaQuery } from "./hooks/useMediaQuery";

/**
 * When true, skip heavy entrance/transform animations.
 * Covers a11y (reduced motion) and mobile GPU/compositing glitches
 * (coarse pointer or narrow viewports).
 */
export function MotionSafeProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const isCoarsePointer = useMediaQuery("(pointer: coarse), (hover: none)");
  const isNarrowViewport = useMediaQuery("(max-width: 639px)");

  const shouldUseSafeMotion = useMemo(
    () => prefersReducedMotion || isCoarsePointer || isNarrowViewport,
    [prefersReducedMotion, isCoarsePointer, isNarrowViewport],
  );

  return (
    <MotionSafeContext.Provider value={shouldUseSafeMotion}>
      {children}
    </MotionSafeContext.Provider>
  );
}
