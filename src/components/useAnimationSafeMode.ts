import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function hasCoarsePointer() {
  return window.matchMedia("(pointer: coarse), (hover: none)").matches;
}

export function useAnimationSafeMode() {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(() =>
    typeof window === "undefined" ? false : hasCoarsePointer(),
  );

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse), (hover: none)");
    const sync = () => setIsCoarsePointer(media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  return Boolean(prefersReducedMotion || isCoarsePointer);
}
