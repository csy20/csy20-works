import { Section } from "../components/ui/Section";
import { Icon } from "../components/ui/Icon";
import { techStack, type StackItem } from "../data/siteContent";

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

const grouped = buildGroupedMap();

/**
 * Tech stack — zero Framer Motion, zero glass/backdrop layers.
 * Solid surfaces only so mobile GPUs never ghost-paint pills.
 */
export function StackSection() {
  return (
    <Section id="stack" title="Tech stack" subtitle="What I use">
      {/* Summary counts */}
      <div className="mb-6 grid grid-cols-4 gap-2 sm:mb-8 sm:gap-3">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="min-w-0 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] px-2 py-3 text-center sm:px-3 sm:py-4"
          >
            <p className="font-display text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.15em]">
              {cat.label}
            </p>
            <p className="mt-0.5 font-serif-accent text-lg tabular-nums tracking-tight text-[var(--text-primary)] sm:mt-1 sm:text-2xl">
              {grouped[cat.key].length}
            </p>
          </div>
        ))}
      </div>

      {/* One solid card per category — skills as a simple list/grid */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {categories.map((cat) => {
          const items = grouped[cat.key];
          if (!items.length) return null;

          return (
            <article
              key={cat.key}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 sm:p-5"
            >
              <header className="mb-3 flex items-baseline justify-between gap-2 border-b border-[var(--border-soft)] pb-2.5 sm:mb-4 sm:pb-3">
                <h3 className="font-display text-sm font-medium tracking-wide text-[var(--text-primary)] sm:text-base">
                  {cat.label}
                </h3>
                <span className="shrink-0 font-display text-xs tabular-nums text-[var(--text-muted)]">
                  {items.length} tools
                </span>
              </header>

              <ul className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-primary)] px-2.5 py-2 sm:min-h-11 sm:px-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--surface-raised)] text-[var(--text-secondary)]">
                        <Icon name={item.icon} size={14} />
                      </span>
                      <span className="min-w-0 truncate font-display text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                        {item.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
