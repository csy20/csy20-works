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
        initial={{ opacity: 0.38, scale: 1.04 }}
        animate={{ opacity: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at 50% 88%, rgba(255,255,255,0.16), transparent 62%)"
              : "radial-gradient(circle at 50% 88%, rgba(214,122,62,0.22), transparent 62%)",
        }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
