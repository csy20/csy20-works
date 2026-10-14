import { useEffect, useState } from "react";
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
      const navigationBottom =
        document.querySelector(".section-nav")?.getBoundingClientRect()
          .bottom ?? 72;
      // Include anchored headings below the fixed navigation on short screens.
      const readingLine = Math.max(
        navigationBottom + 72,
        Math.min(220, Math.max(144, window.innerHeight * 0.28)),
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

export function Navigation({ placement = "header" }: { placement?: "header" }) {
  const activeSection = useActiveSection();

  return (
    <nav
      className={`section-nav section-nav-${placement}`}
      aria-label="Main navigation"
    >
      {sectionLinks.map((section) => (
        <a
          key={section.id}
          className="section-nav-item"
          href={`#${section.id}`}
          aria-label={section.label}
          aria-current={activeSection === section.id ? "location" : undefined}
        >
          <span aria-hidden="true">
            <SectionIcon name={section.icon} />
          </span>
          <span className="header-tooltip" aria-hidden="true">
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
