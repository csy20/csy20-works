import { useContext } from "react";
import { MotionSafeContext } from "./MotionSafeContext";

export function useAnimationSafeMode() {
  return useContext(MotionSafeContext);
}
