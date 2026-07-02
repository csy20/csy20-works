import { useReducedMotion } from "framer-motion";

export function useAnimationSafeMode() {
  const prefersReducedMotion = useReducedMotion();
  return Boolean(prefersReducedMotion);
}
