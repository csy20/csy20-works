import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { colophon, profile, resumeUrl, socialLinks } from "../data/siteContent";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { useSkipExpensiveAnimation } from "../components/useSkipExpensiveAnimation";
import { config } from "../config";
import {
  cardVariants,
  fadeUp,
  hoverLift,
  staggerContainer,
} from "../components/animations/motion";

const publicSocials = socialLinks.filter((l) => l.icon !== "email");

export function ContactSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const skipTouchHover = useSkipExpensiveAnimation();

  return (
    <Section id="contact" title="Studio" subtitle="Work">
      <div className="space-y-8 sm:space-y-10">
        <motion.div
          {...(!shouldUseSafeMotion && { variants: fadeUp })}
          className="border border-[var(--border)] bg-[var(--surface)] px-5 py-8 sm:px-10 sm:py-12"
        >
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {profile.availability}
          </p>
          <p className="mt-4 max-w-md font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Write about the problem, not the stack.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              href={`mailto:${config.email}`}
              className="w-full sm:w-auto"
            >
              Email
              <Icon name="arrow-right" size={14} />
            </Button>
            <Button
              variant="secondary"
              href={resumeUrl}
              className="w-full sm:w-auto"
            >
              CV
              <Icon name="download" size={14} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5"
          {...(!shouldUseSafeMotion && { variants: staggerContainer })}
        >
          {publicSocials.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              {...(!skipTouchHover && {
                whileHover: hoverLift,
                whileTap: { scale: 0.98 },
              })}
              className="flex min-h-14 items-center gap-3 bg-[var(--surface)] p-4 sm:gap-4 max-lg:last:col-span-2"
            >
              <span className="text-[var(--text-secondary)]">
                <Icon name={link.icon} size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-medium text-[var(--text-primary)]">
                  {link.label}
                </p>
                <p className="truncate text-xs text-[var(--text-muted)]">
                  {link.detail}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <p className="font-display text-[11px] tracking-[0.12em] uppercase text-[var(--text-muted)]">
          {colophon}
        </p>
      </div>
    </Section>
  );
}
