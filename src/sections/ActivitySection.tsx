import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Section } from "../components/ui/Section";
import { useTheme } from "../components/useTheme";
import { useState, useEffect } from "react";

function SkeletonBlocks() {
  return (
    <div className="flex gap-[4px]" aria-hidden="true">
      {Array.from({ length: 52 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-[4px]">
          {Array.from({ length: 7 }).map((_, j) => (
            <div
              key={j}
              className="h-[13px] w-[13px] rounded-sm bg-[var(--border-soft)]"
              style={{ opacity: 0.4 + Math.random() * 0.3 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ActivitySection() {
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <Section id="activity" title="Activity" subtitle="Open source">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 sm:p-6"
      >
        <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          GitHub contributions
        </p>
        <div className="overflow-x-auto pb-1 min-h-[110px]">
          {ready ? (
            <GitHubCalendar
              username="csy20"
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={13}
              blockMargin={4}
              fontSize={13}
            />
          ) : (
            <SkeletonBlocks />
          )}
        </div>
      </motion.div>
    </Section>
  );
}
