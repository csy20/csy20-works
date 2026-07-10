import { useContext } from "react";
import { MotionSafeContext } from "./MotionSafeContext";

/**
 * Skip hover/magnetic/transform-heavy interactions.
 * Aligns with MotionSafeProvider (reduced-motion, touch, narrow screens).
 */
export function useSkipExpensiveAnimation() {
  return useContext(MotionSafeContext);
}
