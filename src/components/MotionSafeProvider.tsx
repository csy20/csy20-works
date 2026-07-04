import { type ReactNode } from "react";
import { MotionSafeContext } from "./MotionSafeContext";
import { useMediaQuery } from "./hooks/useMediaQuery";

export function MotionSafeProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  return (
    <MotionSafeContext.Provider value={prefersReducedMotion}>
      {children}
    </MotionSafeContext.Provider>
  );
}
