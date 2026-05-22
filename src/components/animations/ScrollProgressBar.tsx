import { motion, useScroll } from "framer-motion";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldUseSafeMotion = useAnimationSafeMode();

  if (shouldUseSafeMotion) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] h-[3px] w-full origin-left bg-[var(--accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
