import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Section } from "../components/ui/Section";
import { useTheme } from "../components/useTheme";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";

export function ActivitySection() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="activity" title="Activity" subtitle="Open source">
      {shouldUseSafeMotion ? (
        <div className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 sm:p-6">
          <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
            GitHub contributions
          </p>
          <div className="overflow-x-auto pb-1 min-h-[110px]">
            <GitHubCalendar
              username="csy20"
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={13}
              blockMargin={4}
              fontSize={13}
            />
          </div>
        </div>
      ) : (
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
            <GitHubCalendar
              username="csy20"
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={13}
              blockMargin={4}
              fontSize={13}
            />
          </div>
        </motion.div>
      )}
    </Section>
  );
}
