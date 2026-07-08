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
        initial={{ opacity: 0.22, scale: 1.01 }}
        animate={{ opacity: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
