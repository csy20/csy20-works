import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { SunIcon, MoonIcon } from "./ui/ThemeIcons";
import { socialLinks } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const shouldUseSafeMotion = useAnimationSafeMode();

  const content = (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)]"
        aria-label="Home"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.icon !== "email" ? "_blank" : undefined}
          rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)]"
          aria-label={link.label}
        >
          <Icon name={link.icon} size={18} />
        </a>
      ))}

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)]"
      >
        {shouldUseSafeMotion ? (
          <div>{isDark ? <SunIcon /> : <MoonIcon />}</div>
        ) : (
          <motion.div
            initial={false}
            animate={{ rotateY: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.div>
        )}
      </button>
    </>
  );

  if (shouldUseSafeMotion) {
    return (
      <nav className="glass-dock fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--dock-border)] px-2 py-2 shadow-lg">
        {content}
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="glass-dock fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--dock-border)] px-2 py-2 shadow-lg"
    >
      {content}
    </motion.nav>
  );
}
