import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Icon } from "../components/ui/Icon";
import { techStack, type StackItem } from "../data/siteContent";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import {
  cardVariants,
  chipVariants,
  hoverChip,
  staggerContainer,
  staggerFast,
} from "../components/animations/motion";

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "platform", label: "Platform" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

function buildGroupedMap(): Record<CategoryKey, StackItem[]> {
  const map = Object.fromEntries(
    categories.map((c) => [c.key, [] as StackItem[]]),
  ) as Record<CategoryKey, StackItem[]>;

  for (const item of techStack) {
    map[item.category].push(item);
  }
  return map;
}

const groupedTechStack = buildGroupedMap();

const pillClassName =
  "tech-pill inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--sd-pill-border)] bg-[var(--sd-pill-bg)] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[var(--sd-pill-text)] transition-colors duration-200 hover:border-[var(--sd-pill-border-hover)] hover:bg-[var(--sd-pill-bg-hover)]";

const cardClassName =
  "glass-panel-dark relative min-w-0 rounded-xl border border-[var(--sd-panel-border)] p-3.5 sm:p-5";

function TechPillContent({ item }: { item: StackItem }) {
  return (
    <>
      <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-[var(--sd-pill-icon-bg)]">
        <Icon name={item.icon} size={14} />
      </span>
      <span className="font-medium whitespace-nowrap">{item.name}</span>
    </>
  );
}

function CategoryStats() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
      {categories.map((cat) => (
        <div key={cat.key} className={cardClassName}>
          <p className="font-display text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--sd-muted)]">
            {cat.label}
          </p>
          <p className="mt-1 font-serif-accent text-xl sm:text-2xl tracking-tight text-[var(--sd-text)] tabular-nums">
            {groupedTechStack[cat.key].length}
          </p>
        </div>
      ))}
    </div>
  );
}

function CategoryPills() {
  return (
    <div className="space-y-6 sm:space-y-7">
      {categories.map((cat) => {
        const items = groupedTechStack[cat.key];
        if (!items.length) return null;
        return (
          <div key={cat.key}>
            <p className="font-display text-[11px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--sd-muted)] mb-2.5 sm:mb-3 ml-0.5">
              {cat.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item.name} className={pillClassName}>
                  <TechPillContent item={item} />
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const AnimatedTechPill = memo(function AnimatedTechPill({
  item,
}: {
  item: StackItem;
}) {
  return (
    <motion.span
      variants={chipVariants}
      whileHover={hoverChip}
      whileTap={{ scale: 0.98 }}
      className={pillClassName}
    >
      <TechPillContent item={item} />
    </motion.span>
  );
});

function AnimatedStackBody() {
  return (
    <div className="space-y-7 sm:space-y-8">
      <motion.div
        className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4"
        variants={staggerContainer}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.key}
            variants={cardVariants}
            className={cardClassName}
          >
            <p className="font-display text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--sd-muted)]">
              {cat.label}
            </p>
            <p className="mt-1 font-serif-accent text-xl sm:text-2xl tracking-tight text-[var(--sd-text)] tabular-nums">
              {groupedTechStack[cat.key].length}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="space-y-6 sm:space-y-7">
        {categories.map((cat) => {
          const items = groupedTechStack[cat.key];
          if (!items.length) return null;
          return (
            <motion.div key={cat.key} variants={staggerFast}>
              <motion.p
                variants={chipVariants}
                className="font-display text-[11px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--sd-muted)] mb-2.5 sm:mb-3 ml-0.5"
              >
                {cat.label}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerFast}
              >
                {items.map((item) => (
                  <AnimatedTechPill key={item.name} item={item} />
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function StaticStackBody() {
  return (
    <div className="space-y-7 sm:space-y-8">
      <CategoryStats />
      <CategoryPills />
    </div>
  );
}

export function StackSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  let body: ReactNode;
  if (shouldUseSafeMotion) {
    body = <StaticStackBody />;
  } else {
    body = <AnimatedStackBody />;
  }

  return (
    <Section id="stack" title="Tech stack" subtitle="What I use">
      {body}
    </Section>
  );
}
