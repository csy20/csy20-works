import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Icon } from "./ui/Icon";

const sectionLinks = [
  { id: "hero", label: "Home", icon: "home" },
  { id: "projects", label: "Work", icon: "work" },
  { id: "open-source", label: "Open source", icon: "source" },
  { id: "contact", label: "Contact", icon: "contact" },
] as const;

type SectionId = (typeof sectionLinks)[number]["id"];

function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = Math.min(
        220,
        Math.max(72, window.innerHeight * 0.28),
      );
      let current: SectionId = "hero";

      for (const section of sectionLinks) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }

      // Short contact sections still become active when the reader reaches them.
      const documentHeight = document.documentElement.scrollHeight;
      if (
        documentHeight > window.innerHeight &&
        window.scrollY + window.innerHeight >= documentHeight - 2 &&
        document.getElementById("contact")
      ) {
        current = "contact";
      }

      setActiveSection(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);
    observer?.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      observer?.disconnect();
    };
  }, []);

  return activeSection;
}

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

export function Navigation() {
  const activeSection = useActiveSection();
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
      aria-label="Main navigation"
      onPointerLeave={() => setHoveredIndex(null)}
    >
      {sectionLinks.map((section, index) => (
        <a
          key={section.id}
          className="dock-item"
          href={`#${section.id}`}
          aria-label={section.label}
          aria-current={activeSection === section.id ? "location" : undefined}
          onPointerEnter={() => setHoveredIndex(index)}
        >
          {icon(<SectionIcon name={section.icon} />, index)}
          <span className="dock-tooltip" aria-hidden="true">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

function SectionIcon({
  name,
}: {
  name: (typeof sectionLinks)[number]["icon"];
}) {
  if (name === "home") return <Icon name="home" size={20} />;
  if (name === "contact") return <Icon name="email" size={20} />;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "work" ? (
        <>
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v3h4v-3" />
        </>
      ) : (
        <>
          <circle cx="7" cy="5" r="2" />
          <circle cx="17" cy="6" r="2" />
          <circle cx="7" cy="19" r="2" />
          <path d="M7 7v10M17 8v2a4 4 0 0 1-4 4H7" />
        </>
      )}
    </svg>
  );
}
