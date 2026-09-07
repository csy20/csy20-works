import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../useTheme";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

export function ThemeTransitionOverlay() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();

  if (shouldUseSafeMotion) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        initial={{ clipPath: "circle(0% at 50% 94%)", opacity: 1 }}
        animate={{
          clipPath: "circle(160% at 50% 94%)",
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 0.8,
          times: [0, 0.55, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{
          background: theme === "dark" ? "#141414" : "#f4ebe0",
        }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
