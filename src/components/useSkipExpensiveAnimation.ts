import { useMediaQuery } from "./hooks/useMediaQuery";

export function useSkipExpensiveAnimation() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const isCoarsePointer = useMediaQuery("(pointer: coarse), (hover: none)");
  return prefersReducedMotion || isCoarsePointer;
}
