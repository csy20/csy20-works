import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTheme } from "../useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

const CURSOR_SPRING = { stiffness: 120, damping: 20 };

export function CursorGlow() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const showGlow = theme === "dark" && !shouldUseSafeMotion && hasFinePointer;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const cursorX = useSpring(x, CURSOR_SPRING);
  const cursorY = useSpring(y, CURSOR_SPRING);

  const frameRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!showGlow) return;

    const moveCursor = (e: MouseEvent) => {
      if (e.clientX === lastRef.current.x && e.clientY === lastRef.current.y)
        return;
      lastRef.current.x = e.clientX;
      lastRef.current.y = e.clientY;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        x.set(e.clientX - 100);
        y.set(e.clientY - 100);
        frameRef.current = 0;
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
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
