import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Section } from "../components/ui/Section";
import { useTheme } from "../components/useTheme";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { useMediaQuery } from "../components/hooks/useMediaQuery";
import { config } from "../config";

class CalendarErrorBoundary extends Component<{ children: ReactNode }> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(_error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn(
        "[ActivitySection] GitHubCalendar failed:",
        info.componentStack,
      );
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <p className="text-sm text-[var(--text-muted)]">
          GitHub contributions unavailable right now.
        </p>
      );
    }
    return this.props.children;
  }
}

const activityCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ActivitySection() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const blockSize = isSmallScreen ? 10 : 13;
  const blockMargin = isSmallScreen ? 2 : 4;

  return (
    <Section id="activity" title="Activity" subtitle="Open source">
      <motion.div
        className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 sm:p-6"
        {...(!shouldUseSafeMotion && {
          variants: activityCardVariants,
        })}
      >
        <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          GitHub contributions
        </p>
        <div className="overflow-x-auto pb-1 min-h-[110px]">
          <CalendarErrorBoundary>
            <GitHubCalendar
              username={config.githubUsername}
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={blockSize}
              blockMargin={blockMargin}
              fontSize={13}
            />
          </CalendarErrorBoundary>
        </div>
      </motion.div>
    </Section>
  );
}
