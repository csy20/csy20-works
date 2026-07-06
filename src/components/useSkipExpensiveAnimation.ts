import { useContext } from "react";
import { MotionSafeContext } from "./MotionSafeContext";
import { useMediaQuery } from "./hooks/useMediaQuery";

export function useSkipExpensiveAnimation() {
  const prefersReducedMotion = useContext(MotionSafeContext);
  const isCoarsePointer = useMediaQuery("(pointer: coarse), (hover: none)");
  return prefersReducedMotion || isCoarsePointer;
}
