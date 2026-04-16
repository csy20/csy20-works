import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../useTheme";

export function ThemeTransitionOverlay() {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <AnimatePresence initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-current pointer-events-none"
          style={{
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
