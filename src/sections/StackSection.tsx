import { techStack } from "../data/siteContent";

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "platform", label: "Platform" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

const grouped = (() => {
  const map = Object.fromEntries(
    categories.map((c) => [c.key, [] as string[]]),
  ) as Record<CategoryKey, string[]>;
  for (const item of techStack) {
    map[item.category].push(item.name);
  }
  return map;
})();

/**
 * Tech stack — intentionally boring DOM.
 * No Framer, no Section wrapper, no SVG icons, no glass, no nested cards.
 * Mobile GPUs were ghost-painting layered pills; this is text + solid bg only.
 */
export function StackSection() {
  return (
    <section id="stack" className="stack-section relative">
      <div className="mx-auto w-full max-w-5xl px-4 pb-14 pt-14 sm:pb-24 sm:pt-24 lg:px-8">
        <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          What I use
        </p>
        <h2 className="mb-8 font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:mb-10 sm:text-4xl lg:text-5xl">
          Tech stack
        </h2>

        {/* Counts — single row of plain boxes */}
        <div className="mb-8 flex flex-wrap gap-2 sm:mb-10 sm:gap-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="min-w-[4.5rem] flex-1 rounded-lg bg-[var(--surface-raised)] px-3 py-2.5 sm:min-w-0 sm:px-4 sm:py-3"
            >
              <div className="font-display text-[10px] uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                {cat.label}
              </div>
              <div className="font-serif-accent text-xl text-[var(--text-primary)] sm:text-2xl">
                {grouped[cat.key].length}
              </div>
            </div>
          ))}
        </div>

        {/* Categories — simple stacked blocks, tools as comma-free chips in one flow */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {categories.map((cat) => {
            const names = grouped[cat.key];
            if (!names.length) return null;
            return (
              <div key={cat.key}>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {cat.label}
                  </h3>
                  <span className="font-display text-xs text-[var(--text-muted)]">
                    {names.length}
                  </span>
                </div>
                {/*
                  Single flat list of text labels — no nested borders, no icons,
                  no absolute layers. Hardest layout for GPU to “trail”.
                */}
                <p className="font-display text-sm leading-8 text-[var(--text-secondary)] sm:text-[15px] sm:leading-9">
                  {names.map((name, i) => (
                    <span key={name}>
                      <span className="text-[var(--text-primary)]">{name}</span>
                      {i < names.length - 1 ? (
                        <span
                          className="mx-2 text-[var(--text-muted)]"
                          aria-hidden
                        >
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
