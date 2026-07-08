import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Section } from "../components/ui/Section";
import { useTheme } from "../components/useTheme";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { useMediaQuery } from "../components/hooks/useMediaQuery";
import { config } from "../config";
import { cardVariants } from "../components/animations/motion";

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

export function ActivitySection() {
  const { theme } = useTheme();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const blockSize = isSmallScreen ? 10 : 13;
  const blockMargin = isSmallScreen ? 2 : 4;

  return (
    <Section id="activity" title="Activity" subtitle="Open source">
      <motion.div
        className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3 sm:p-6"
        {...(!shouldUseSafeMotion && { variants: cardVariants })}
      >
        <p className="font-display text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3 sm:mb-4">
          GitHub contributions
        </p>
        <div className="overflow-x-auto overscroll-x-contain pb-1 min-h-[100px] sm:min-h-[110px] [scrollbar-width:thin]">
          <CalendarErrorBoundary>
            <div className="w-max min-w-full">
              <GitHubCalendar
                username={config.githubUsername}
                colorScheme={theme === "dark" ? "dark" : "light"}
                blockSize={blockSize}
                blockMargin={blockMargin}
                fontSize={isSmallScreen ? 11 : 13}
              />
            </div>
          </CalendarErrorBoundary>
        </div>
      </motion.div>
    </Section>
  );
}
