import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { SunIcon, MoonIcon } from "./ui/ThemeIcons";
import { socialLinks, type SocialIcon } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";
import { EASE_OUT, springSnappy } from "./animations/motion";

const navLinkIcons: SocialIcon[] = [
  "github",
  "linkedin",
  "x",
  "youtube",
  "email",
];

/* Slightly tighter on xs so 7 controls fit ~320–360px without horizontal scroll */
const DOCK_BUTTON_CLASS =
  "flex shrink-0 min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 md:min-h-12 md:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-90 active:bg-[var(--dock-button-hover)] sm:hover:-translate-y-0.5 sm:transition-all";

export function Navigation() {
  const filteredSocialLinks = useMemo(() => {
    const seen = new Set<SocialIcon>();
    return socialLinks.filter((link) => {
      if (!navLinkIcons.includes(link.icon) || seen.has(link.icon))
        return false;
      seen.add(link.icon);
      return true;
    });
  }, []);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <motion.nav
      className="glass-dock fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-0 sm:gap-1 md:gap-1.5 rounded-full border border-[var(--dock-border)] px-1 py-1 sm:px-1.5 sm:py-1.5 md:px-2 md:py-2 shadow-lg max-w-[min(100vw-1rem,calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-1rem))]"
      style={{
        bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
      aria-label="Site navigation"
      {...(!shouldUseSafeMotion && {
        initial: { y: 28, opacity: 0, scale: 0.96 },
        animate: { y: 0, opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: EASE_OUT, delay: 0.35 },
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
        className={DOCK_BUTTON_CLASS}
        aria-label="Home"
      >
        <Icon name="home" size={17} />
      </button>

      {filteredSocialLinks.map((link) => {
        const isExternal = link.icon !== "email";
        return (
          <a
            key={link.label}
            href={link.href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={DOCK_BUTTON_CLASS}
            aria-label={link.label}
          >
            <Icon name={link.icon} size={17} />
          </a>
        );
      })}

      <span
        className="mx-0.5 h-4 w-px shrink-0 bg-[var(--dock-border)] sm:mx-1"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className={DOCK_BUTTON_CLASS}
      >
        <motion.div
          key={theme}
          {...(!shouldUseSafeMotion && {
            initial: { rotate: -90, opacity: 0, scale: 0.6 },
            animate: { rotate: 0, opacity: 1, scale: 1 },
            transition: springSnappy,
          })}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.div>
      </button>
    </motion.nav>
  );
}
