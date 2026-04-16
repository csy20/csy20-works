import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../useTheme";

function supportsFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function CursorGlow() {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(() =>
    typeof window === "undefined" ? false : supportsFinePointer(),
  );

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 20 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const syncPointer = () => setHasFinePointer(media.matches);

    syncPointer();
    media.addEventListener("change", syncPointer);

    return () => media.removeEventListener("change", syncPointer);
  }, []);

  useEffect(() => {
    if (theme !== "dark" || shouldReduceMotion || !hasFinePointer) return;

    let frameId = 0;

    const moveCursor = (e: MouseEvent) => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        x.set(e.clientX - 100);
        y.set(e.clientY - 100);
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [hasFinePointer, x, y, theme, shouldReduceMotion]);

  if (theme !== "dark" || shouldReduceMotion || !hasFinePointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[200px] w-[200px] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
        mixBlendMode: "screen",
        filter: "blur(20px)",
      }}
    />
  );
}
