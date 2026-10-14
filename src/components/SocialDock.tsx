import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../data/siteContent";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { MoonIcon, SunIcon } from "./ui/ThemeIcons";

const dockLinks = socialLinks.filter((link) => link.icon !== "instagram");

function useDockMagnification() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let media: MediaQueryList;
    try {
      media = window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      );
    } catch {
      return;
    }
    const update = () => setAllowed(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return allowed;
}

export function SocialDock() {
  const { theme, toggleTheme } = useTheme();
  const canMagnify = useDockMagnification();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const icon = (node: ReactNode, index: number) => {
    const distance =
      hoveredIndex === null ? Infinity : Math.abs(hoveredIndex - index);
    return (
      <motion.span
        className="dock-icon"
        aria-hidden="true"
        animate={
          canMagnify && distance < 2
            ? {
                scale: distance === 0 ? 1.14 : 1.05,
                y: distance === 0 ? -2 : -1,
              }
            : { scale: 1, y: 0 }
        }
        transition={{ duration: canMagnify ? 0.16 : 0 }}
      >
        {node}
      </motion.span>
    );
  };

  return (
    <nav
      className="dock-shell"
      aria-label="Social shortcuts"
      onPointerLeave={() => setHoveredIndex(null)}
    >
      <a
        className="dock-item"
        href="#hero"
        aria-label="Home"
        onPointerEnter={() => setHoveredIndex(0)}
      >
        {icon(<Icon name="home" size={20} />, 0)}
        <span className="dock-tooltip" aria-hidden="true">
          Home
        </span>
      </a>
      {dockLinks.map((link, index) => {
        const external = !link.href.startsWith("mailto:");
        return (
          <a
            key={link.icon}
            className="dock-item"
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={`${link.label}${external ? " (opens in a new tab)" : ""}`}
            onPointerEnter={() => setHoveredIndex(index + 1)}
          >
            {icon(<Icon name={link.icon} size={20} />, index + 1)}
            <span className="dock-tooltip" aria-hidden="true">
              {link.icon === "x" ? "X" : link.label}
            </span>
          </a>
        );
      })}
      <button
        className="dock-item"
        type="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        onClick={toggleTheme}
        onPointerEnter={() => setHoveredIndex(dockLinks.length + 1)}
      >
        {icon(
          theme === "dark" ? <SunIcon /> : <MoonIcon />,
          dockLinks.length + 1,
        )}
        <span className="dock-tooltip" aria-hidden="true">
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </span>
      </button>
    </nav>
  );
}
