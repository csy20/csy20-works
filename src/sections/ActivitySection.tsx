import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Section } from "../components/ui/Section";
import { useTheme } from "../components/useTheme";
import { useSkipExpensiveAnimation } from "../components/useSkipExpensiveAnimation";
import { config } from "../config";

export function ActivitySection() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useSkipExpensiveAnimation();

  return (
    <Section id="activity" title="Activity" subtitle="Open source">
      <motion.div
        className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 sm:p-6"
        {...(!shouldUseSafeMotion && {
          variants: {
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          },
        })}
      >
        <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          GitHub contributions
        </p>
        <div className="overflow-x-auto pb-1 min-h-[110px]">
          <GitHubCalendar
            username={config.githubUsername}
            colorScheme={theme === "dark" ? "dark" : "light"}
            blockSize={13}
            blockMargin={4}
            fontSize={13}
          />
        </div>
      </motion.div>
    </Section>
  );
}
