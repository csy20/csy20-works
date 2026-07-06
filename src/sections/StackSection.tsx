import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Icon } from "../components/ui/Icon";
import { techStack } from "../data/siteContent";

import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { useSkipExpensiveAnimation } from "../components/useSkipExpensiveAnimation";

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "platform", label: "Platform" },
] as const;

function buildGroupedMap() {
  const map: Record<string, typeof techStack> = {};
  for (const item of techStack) {
    (map[item.category] ??= []).push(item);
  }
  return map;
}

const groupedTechStack = buildGroupedMap();

const categoriesGridVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categorySectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function StackSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const skipTouchHover = useSkipExpensiveAnimation();

  return (
    <Section
      id="stack"
      title="Tech stack"
      subtitle="What I use"
      dark={true}
      className="!pt-0"
    >
      <div className="space-y-8">
        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          {...(!shouldUseSafeMotion && {
            variants: categoriesGridVariants,
          })}
        >
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="glass-panel-dark relative rounded-xl border border-[var(--sd-panel-border)] p-4 sm:p-5"
            >
              <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--sd-muted)]">
                {cat.label}
              </p>
              <p className="mt-1 font-serif-accent text-2xl tracking-tight text-[var(--sd-text)]">
                {groupedTechStack[cat.key]?.length ?? 0}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const items = groupedTechStack[cat.key];
            if (!items?.length) return null;

            return (
              <motion.div
                key={cat.key}
                {...(!shouldUseSafeMotion && {
                  variants: categorySectionVariants,
                })}
              >
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--sd-muted)] mb-3 ml-1">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <motion.span
                      key={item.name}
                      {...(!skipTouchHover && {
                        whileHover: { y: -2, scale: 1.02 },
                      })}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--sd-pill-border)] bg-[var(--sd-pill-bg)] px-4 py-2 text-sm text-[var(--sd-pill-text)] transition-colors duration-200 hover:border-[var(--sd-pill-border-hover)] hover:bg-[var(--sd-pill-bg-hover)]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sd-pill-icon-bg)]">
                        <Icon name={item.icon} size={16} />
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
