import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../useTheme";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

export function ThemeTransitionOverlay() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();

  if (shouldUseSafeMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <AnimatePresence initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0 }}
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
