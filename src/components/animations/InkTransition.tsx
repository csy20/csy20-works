import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function InkTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const slide = {
    initial: {
      y: 0,
    },
    enter: {
      y: "-100vh",
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as const },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[100] h-screen w-screen bg-[var(--text-primary)]"
          initial="initial"
          animate="enter"
          variants={slide}
        />
      )}
      {children}
    </>
  );
}
