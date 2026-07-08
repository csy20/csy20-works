import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTheme } from "../useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

const CURSOR_SPRING = { stiffness: 100, damping: 22, mass: 0.4 };

export function CursorGlow() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const showGlow = theme === "dark" && !shouldUseSafeMotion && hasFinePointer;

  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const cursorX = useSpring(x, CURSOR_SPRING);
  const cursorY = useSpring(y, CURSOR_SPRING);

  const frameRef = useRef(0);
  const lastRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    if (!showGlow) return;

    const moveCursor = (e: MouseEvent) => {
      if (e.clientX === lastRef.current.x && e.clientY === lastRef.current.y) {
        return;
      }
      lastRef.current.x = e.clientX;
      lastRef.current.y = e.clientY;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        x.set(e.clientX - 120);
        y.set(e.clientY - 120);
        frameRef.current = 0;
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      window.removeEventListener("mousemove", moveCursor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- x,y are stable motion values
  }, [showGlow]);

  if (!showGlow) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-[240px] w-[240px] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        background:
          "radial-gradient(circle, rgba(232,228,220,0.07) 0%, rgba(232,228,220,0) 68%)",
        mixBlendMode: "screen",
        filter: "blur(18px)",
        willChange: "transform",
      }}
    />
  );
}
