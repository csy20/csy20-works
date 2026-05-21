import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Icon } from "../components/ui/Icon";
import { techStack, type StackItem } from "../data/siteContent";
import { useMemo } from "react";

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "platform", label: "Platform" },
] as const;

export function StackSection() {
  const grouped = useMemo(() => {
    const map: Record<string, StackItem[]> = {};
    for (const item of techStack) {
      (map[item.category] ??= []).push(item);
    }
    return map;
  }, []);

  return (
    <Section
      id="stack"
      title="Tech stack"
      subtitle="What I use"
      className="!pt-0"
    >
      <div className="space-y-8">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 sm:p-5"
            >
              <p className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                {cat.label}
              </p>
              <p className="mt-1 font-serif-accent text-2xl tracking-tight text-[var(--text-primary)]">
                {grouped[cat.key]?.length ?? 0}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const items = grouped[cat.key];
            if (!items?.length) return null;

            return (
              <motion.div
                key={cat.key}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3 ml-1">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <motion.span
                      key={item.name}
                      whileHover={{ y: -2, scale: 1.02 }}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)]">
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
