import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

const slideVariants = {
  initial: { y: 0 },
  enter: {
    y: "-100vh",
    transition: { duration: 0.55, ease: EASE },
    transitionEnd: { display: "none" },
  },
};

export function InkTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-screen w-screen bg-[var(--text-primary)]"
        initial="initial"
        animate="enter"
        variants={slideVariants}
      />
      {children}
    </>
  );
}
