import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { SunIcon, MoonIcon } from "./ui/ThemeIcons";
import { socialLinks, type SocialIcon } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";

const navLinkIcons: SocialIcon[] = [
  "github",
  "linkedin",
  "x",
  "youtube",
  "email",
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <motion.nav
      className="glass-dock fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--dock-border)] px-2 py-2 shadow-lg max-w-[95vw]"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      {...(!shouldUseSafeMotion && {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
      })}
    >
      <button
        type="button"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: shouldUseSafeMotion ? "auto" : "smooth",
          });
        }}
        className="flex min-h-11 min-w-11 sm:min-h-12 sm:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-90"
        aria-label="Home"
      >
        <Icon name="home" size={18} />
      </button>

      {socialLinks
        .filter((link) => navLinkIcons.includes(link.icon))
        .map((link) => {
          const isExternal = link.icon !== "email";
          return (
            <a
              key={link.label}
              href={link.href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex min-h-11 min-w-11 sm:min-h-12 sm:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-90"
              aria-label={link.label}
            >
              <Icon name={link.icon} size={18} />
            </a>
          );
        })}

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="flex min-h-11 min-w-11 sm:min-h-12 sm:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-90"
      >
        <motion.div
          {...(!shouldUseSafeMotion && {
            initial: false,
            animate: { rotateY: isDark ? 0 : 180 },
            transition: { duration: 0.3 },
          })}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.div>
      </button>
    </motion.nav>
  );
}
