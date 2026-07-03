import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "../useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

export function CursorGlow() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const showGlow = theme === "dark" && !shouldUseSafeMotion && hasFinePointer;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 20 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (!showGlow) return;

    let frameId = 0;
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      if (e.clientX === lastX && e.clientY === lastY) return;
      lastX = e.clientX;
      lastY = e.clientY;

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        x.set(e.clientX - 100);
        y.set(e.clientY - 100);
        frameId = 0;
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("mousemove", moveCursor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- x,y are stable motion values, effect intentionally doesn't depend on them
  }, [showGlow]);

  if (!showGlow) return null;

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
