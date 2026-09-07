import { techStack } from "../data/siteContent";

const categories = [
  { key: "frontend", label: "Interface" },
  { key: "backend", label: "Systems" },
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

export function StackSection() {
  return (
    <section
      id="stack"
      className="stack-section relative min-w-0 overflow-x-clip"
    >
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 pb-14 pt-16 sm:pb-24 sm:pt-24 lg:px-8">
        <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Tools
        </p>
        <h2 className="mb-10 font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:mb-12 sm:text-4xl lg:text-5xl">
          I ship in
        </h2>

        <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
          {categories.map((cat) => {
            const names = grouped[cat.key];
            if (!names.length) return null;
            return (
              <div
                key={cat.key}
                className="min-w-0 border-t border-[var(--border-soft)] pt-5"
              >
                <h3 className="mb-3 font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {cat.label}
                </h3>
                <ul className="m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1 gap-y-1.5 p-0">
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
