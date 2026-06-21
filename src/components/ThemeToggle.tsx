import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { SunIcon, MoonIcon } from "./ui/ThemeIcons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex" }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </motion.div>
    </button>
  );
}
