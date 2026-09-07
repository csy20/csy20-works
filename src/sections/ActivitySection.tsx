import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { proof } from "../data/siteContent";
import { cardVariants } from "../components/animations/motion";

export function ActivitySection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="activity" title="At a glance" subtitle="Proof">
      <div className="grid gap-px overflow-hidden rounded-none border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
        {proof.map((item) => (
          <motion.div
            key={item.label}
            className="bg-[var(--surface)] px-5 py-6 sm:px-6 sm:py-8"
            {...(!shouldUseSafeMotion && { variants: cardVariants })}
          >
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {item.label}
            </p>
            <p className="mt-3 font-serif-accent text-3xl tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-[var(--text-secondary)]">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
