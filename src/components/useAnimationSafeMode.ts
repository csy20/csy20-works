import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./hooks/useMediaQuery";

export function useAnimationSafeMode() {
  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery("(pointer: coarse), (hover: none)");

  return Boolean(prefersReducedMotion || isCoarsePointer);
}
