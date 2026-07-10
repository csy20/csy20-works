import { useMemo } from "react";
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

const DOCK_BUTTON_CLASS =
  "flex shrink-0 min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 md:min-h-12 md:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-95 active:bg-[var(--dock-button-hover)]";

/**
 * Bottom dock — plain fixed nav (no Framer Motion on the shell).
 * Motion transforms on a fixed bar break centering and can fight `bottom`.
 */
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
    <nav
      className="glass-dock fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-0 sm:gap-1 md:gap-1.5 rounded-full border border-[var(--dock-border)] px-1 py-1 sm:px-1.5 sm:py-1.5 md:px-2 md:py-2 shadow-lg max-w-[min(100vw-1rem,calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-1rem))]"
      aria-label="Site navigation"
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
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
