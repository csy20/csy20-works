import { motion } from "framer-motion";
import { Icon } from "./ui/Icon";
import { socialLinks } from "../data/siteContent";

export function Navigation() {
  return (
    <>
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--dock-border)] bg-[var(--dock-bg)] px-2 py-2 shadow-lg backdrop-blur-md"
      >
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
      </motion.nav>

      <div className="h-20" />
    </>
  );
}
