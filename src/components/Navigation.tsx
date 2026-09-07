import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { SunIcon, MoonIcon } from "./ui/ThemeIcons";
import { socialLinks, type SocialIcon } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";
import { useSound } from "./useSound";
import { springSnappy } from "./animations/motion";

const navLinkIcons: SocialIcon[] = [
  "github",
  "linkedin",
  "x",
  "youtube",
  "email",
];

const DOCK_BUTTON_CLASS =
  "flex shrink-0 min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 md:min-h-12 md:min-w-12 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)] active:scale-95 active:bg-[var(--dock-button-hover)]";

type DockEntry = {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon: ReactNode;
  external?: boolean;
};

function dockScale(distance: number) {
  if (distance === 0) return { scale: 1.18, y: -8 };
  if (distance === 1) return { scale: 1.08, y: -4 };
  return { scale: 1, y: 0 };
}

/**
 * Bottom dock — shell stays untransformed (motion on the nav itself
 * previously broke centering). Icons pop locally, like a quiet macOS dock.
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
  const { playDockTick } = useSound();
  const isDark = theme === "dark";
  const shouldUseSafeMotion = useAnimationSafeMode();
  const [hovered, setHovered] = useState<number | null>(null);
  const canMagnify = !shouldUseSafeMotion;

  const items = useMemo<DockEntry[]>(() => {
    const home: DockEntry = {
      key: "home",
      label: "Home",
      onClick: () => {
        window.scrollTo({
          top: 0,
          behavior: shouldUseSafeMotion ? "auto" : "smooth",
        });
      },
      icon: <Icon name="home" size={17} />,
    };

    const socials: DockEntry[] = filteredSocialLinks.map((link) => ({
      key: link.label,
      label: link.label,
      href: link.href,
      icon: <Icon name={link.icon} size={17} />,
      external: link.icon !== "email",
    }));

    const themeToggle: DockEntry = {
      key: "theme",
      label: isDark ? "Light theme" : "Dark theme",
      onClick: toggleTheme,
      icon: isDark ? <SunIcon /> : <MoonIcon />,
    };

    return [home, ...socials, themeToggle];
  }, [filteredSocialLinks, isDark, shouldUseSafeMotion, toggleTheme]);

  const controlsStart = items.length - 1;

  return (
    <nav
      className="glass-dock dock-enter fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex -translate-x-1/2 items-end gap-0 sm:gap-1 md:gap-1.5 rounded-full border border-[var(--dock-border)] px-1 py-1 sm:px-1.5 sm:py-1.5 md:px-2 md:py-2 shadow-lg max-w-[min(100vw-1rem,calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-1rem))]"
      aria-label="Site navigation"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, index) => (
        <span key={item.key} className="contents">
          {index === controlsStart && (
            <span
              className="mx-0.5 self-center h-4 w-px shrink-0 bg-[var(--dock-border)] sm:mx-1"
              aria-hidden="true"
            />
          )}
          <DockItem
            item={item}
            scale={
              canMagnify && hovered !== null
                ? dockScale(Math.abs(index - hovered))
                : { scale: 1, y: 0 }
            }
            showLabel={canMagnify && hovered === index}
            onHover={() => {
              setHovered(index);
              playDockTick();
            }}
            animate={canMagnify}
          />
        </span>
      ))}
    </nav>
  );
}

function DockItem({
  item,
  scale,
  showLabel,
  onHover,
  animate,
}: {
  item: DockEntry;
  scale: { scale: number; y: number };
  showLabel: boolean;
  onHover: () => void;
  animate: boolean;
}) {
  const inner = item.href ? (
    <a
      href={item.href}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={DOCK_BUTTON_CLASS}
      aria-label={item.label}
    >
      {item.icon}
    </a>
  ) : (
    <button
      type="button"
      onClick={item.onClick}
      className={DOCK_BUTTON_CLASS}
      aria-label={item.label}
    >
      {item.icon}
    </button>
  );

  return (
    <motion.div
      className="relative flex shrink-0 flex-col items-center"
      onMouseEnter={onHover}
      style={{ transformOrigin: "bottom center" }}
      {...(animate
        ? {
            animate: scale,
            transition: springSnappy,
            whileTap: { scale: 0.92 },
          }
        : {})}
    >
      {showLabel && (
        <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-[var(--accent)] px-2 py-0.5 font-display text-[10px] tracking-wide text-[var(--accent-fg)]">
          {item.label}
        </span>
      )}
      {inner}
    </motion.div>
  );
}
