import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { EASE_INK } from "./motion";

const slideVariants = {
  initial: { y: 0 },
  enter: {
    y: "-100%",
    transition: { duration: 0.55, ease: EASE_INK },
  },
};

export function InkTransition({ children }: { children: ReactNode }) {
  const shouldUseSafeMotion = useAnimationSafeMode();

  if (shouldUseSafeMotion) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] bg-[var(--bg-primary)]"
        initial="initial"
        animate="enter"
        variants={slideVariants}
      />
      {children}
    </>
  );
}
