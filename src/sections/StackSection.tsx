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
 * Tech stack — plain text layout, wrap-safe on narrow screens.
 */
export function StackSection() {
  return (
    <section
      id="stack"
      className="stack-section relative min-w-0 overflow-x-clip"
    >
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 pb-14 pt-14 sm:pb-24 sm:pt-24 lg:px-8">
        <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          What I use
        </p>
        <h2 className="mb-8 font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:mb-10 sm:text-4xl lg:text-5xl">
          Tech stack
        </h2>

        {/* Counts */}
        <div className="mb-8 grid min-w-0 grid-cols-4 gap-2 sm:mb-10 sm:gap-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="min-w-0 rounded-lg bg-[var(--surface-raised)] px-1.5 py-2.5 text-center sm:px-3 sm:py-3"
            >
              <div className="truncate font-display text-[9px] uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                {cat.label}
              </div>
              <div className="font-serif-accent text-lg text-[var(--text-primary)] sm:text-2xl">
                {grouped[cat.key].length}
              </div>
            </div>
          ))}
        </div>

        {/* Categories — wrap each tool as its own unit so nothing clips mid-word */}
        <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
          {categories.map((cat) => {
            const names = grouped[cat.key];
            if (!names.length) return null;
            return (
              <div key={cat.key} className="min-w-0">
                <div className="mb-2 flex min-w-0 items-baseline justify-between gap-3">
                  <h3 className="min-w-0 truncate font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {cat.label}
                  </h3>
                  <span className="shrink-0 font-display text-xs text-[var(--text-muted)]">
                    {names.length}
                  </span>
                </div>
                <ul className="flex min-w-0 list-none flex-wrap items-center gap-x-1 gap-y-1.5 p-0 m-0">
                  {names.map((name, i) => (
                    <li
                      key={name}
                      className="inline-flex max-w-full min-w-0 items-center"
                    >
                      <span className="max-w-full break-words font-display text-sm text-[var(--text-primary)] sm:text-[15px]">
                        {name}
                      </span>
                      {i < names.length - 1 ? (
                        <span
                          className="mx-1.5 shrink-0 select-none text-[var(--text-muted)]"
                          aria-hidden
                        >
                          ·
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
