import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { socialLinks } from "../data/siteContent";
import { useState } from "react";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [socialsOpen, setSocialsOpen] = useState(false);

  return (
    <>
      {/* Desktop: Minimal top bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden items-center justify-between border-b border-[var(--border-soft)] bg-[var(--surface-glass)] px-6 py-3 backdrop-blur-md lg:flex"
      >
        <span className="font-serif-accent text-lg italic text-[var(--text-primary)]">
          csy20
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
        >
          <motion.div
            initial={false}
            animate={{ rotateY: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.div>
        </button>
      </motion.header>

      {/* Desktop top padding spacer */}
      <div className="hidden h-14 lg:block" />

      {/* Mobile: Bottom bar */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--dock-border)] bg-[var(--dock-bg)] px-2 py-2 shadow-lg backdrop-blur-md lg:hidden"
      >
        {/* Home */}
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

        {/* Socials */}
        <button
          type="button"
          onClick={() => setSocialsOpen(!socialsOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] ${
            socialsOpen
              ? "text-[var(--text-primary)] bg-[var(--dock-button-bg)]"
              : "text-[var(--text-secondary)]"
          }`}
          aria-label="Social links"
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
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)]"
        >
          <motion.div
            initial={false}
            animate={{ rotateY: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Socials popover */}
      {socialsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSocialsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-1/2 z-50 w-64 -translate-x-1/2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-xl lg:hidden"
          >
            <div className="space-y-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSocialsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                >
                  <Icon name={link.icon} size={18} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Mobile bottom padding spacer */}
      <div className="h-20 lg:hidden" />
    </>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
      style={{ color: "var(--text-primary)" }}
    >
      <path
        d="M12 3v1.75M12 19.25V21M21 12h-1.75M4.75 12H3M18.364 5.636l-1.238 1.238M6.874 17.126l-1.238 1.238M18.364 18.364l-1.238-1.238M6.874 6.874 5.636 5.636M15.25 12a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
      style={{ color: "var(--text-primary)" }}
    >
      <path
        d="M20.25 15.25A8.5 8.5 0 0 1 8.75 3.75a8.5 8.5 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
