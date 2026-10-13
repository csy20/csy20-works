import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "../components/animations/motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Section } from "../components/ui/Section";
import {
  contributionGroups,
  contributionStats,
  type Contribution,
  type ContributionGroup,
} from "../data/contributions";

type ContributionWithRepo = Contribution & { repo: string };

type DomainId = "all" | "ai" | "systems" | "language" | "other";

const REPO_DOMAIN: Record<string, Exclude<DomainId, "all">> = {
  "semantica-agi/semantica": "ai",
  "topoteretes/cognee": "ai",
  "google/gvisor": "systems",
  "dart-lang/sdk": "language",
  "internetarchive/openlibrary": "other",
  "agent-of-empires/agent-of-empires": "other",
  "redhat-et/ripwire": "other",
};

const DOMAIN_META: Record<
  Exclude<DomainId, "all">,
  { label: string; order: number }
> = {
  ai: { label: "AI & memory", order: 0 },
  systems: { label: "Systems", order: 1 },
  language: { label: "Language", order: 2 },
  other: { label: "Apps & community", order: 3 },
};

const DOMAIN_FILTERS: { id: DomainId; label: string }[] = [
  { id: "all", label: "All signals" },
  { id: "ai", label: "AI & memory" },
  { id: "systems", label: "Systems" },
  { id: "language", label: "Language" },
  { id: "other", label: "Apps & more" },
];

function parseRepo(full: string) {
  const slash = full.indexOf("/");
  if (slash === -1) return { owner: full, name: "" };
  return { owner: full.slice(0, slash), name: full.slice(slash + 1) };
}

function formatStars(stars: number) {
  if (stars >= 10_000) {
    return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return stars.toLocaleString("en-US");
}

function formatWhen(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function prSortKey(pr: Contribution) {
  return pr.mergedAt ?? pr.createdAt;
}

function repoDomain(repo: string): Exclude<DomainId, "all"> {
  return REPO_DOMAIN[repo] ?? "other";
}

function nodeLayout(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 38;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: EASE_OUT },
};

function Constellation({
  groups,
  activeRepo,
  domain,
  onSelect,
}: {
  groups: ContributionGroup[];
  activeRepo: string;
  domain: DomainId;
  onSelect: (repo: string) => void;
}) {
  const maxMerged = Math.max(1, ...groups.map((g) => g.merged));

  return (
    <svg
      className="oss-constellation"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Repository constellation map"
    >
      <circle className="oss-orbit-ring" cx="50" cy="50" r="38" />
      <circle className="oss-orbit-ring" cx="50" cy="50" r="24" />

      {groups.map((group, index) => {
        const { x, y } = nodeLayout(index, groups.length);
        const active = group.repo === activeRepo;

        return (
          <g key={group.repo}>
            <line
              className="oss-orbit-link"
              data-active={active}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
            />
          </g>
        );
      })}

      <circle
        cx="50"
        cy="50"
        r="4.2"
        fill="var(--accent)"
        stroke="var(--surface-soft)"
        strokeWidth="0.6"
      />
      <text
        x="50"
        y="57.5"
        textAnchor="middle"
        className="fill-[var(--text-muted)] font-display text-[3px] uppercase tracking-[0.2em]"
      >
        merged
      </text>

      {groups.map((group, index) => {
        const { x, y } = nodeLayout(index, groups.length);
        const { name } = parseRepo(group.repo);
        const dimmed = domain !== "all" && repoDomain(group.repo) !== domain;
        const active = group.repo === activeRepo;
        const r = 2.2 + (group.merged / maxMerged) * 2.4;
        const label = name.length > 11 ? `${name.slice(0, 10)}…` : name;

        return (
          <g
            key={`node-${group.repo}`}
            className="oss-orbit-node"
            data-dimmed={dimmed}
            data-active={active}
            onClick={() => onSelect(group.repo)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(group.repo);
              }
            }}
            role="button"
            tabIndex={dimmed ? -1 : 0}
            aria-label={`${group.repo}, ${group.merged} merged pull requests`}
            aria-pressed={active}
          >
            <circle className="oss-node-core" cx={x} cy={y} r={r} />
            <text
              x={x}
              y={y + r + 3.8}
              textAnchor="middle"
              className="fill-[var(--text-secondary)] font-display text-[2.8px] uppercase tracking-[0.08em]"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const MergeBroadcast = memo(function MergeBroadcast({
  pr,
  paused,
  onTogglePause,
  onPrev,
  onNext,
  index,
  total,
}: {
  pr: ContributionWithRepo;
  paused: boolean;
  onTogglePause: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  const { name } = parseRepo(pr.repo);
  const when = formatWhen(pr.mergedAt ?? pr.createdAt);
  const shouldUseSafeMotion = useAnimationSafeMode();

  const content = (
    <div className="relative z-[1] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span className="oss-live-dot" aria-hidden />
          Live merge feed
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="min-h-9 min-w-9 border border-[var(--border)] bg-[var(--surface)] font-display text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
            onClick={onPrev}
            aria-label="Previous merge"
          >
            ←
          </button>
          <button
            type="button"
            className="min-h-9 min-w-9 border border-[var(--border)] bg-[var(--surface)] font-display text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
            onClick={onNext}
            aria-label="Next merge"
          >
            →
          </button>
          <button
            type="button"
            className="min-h-9 border border-[var(--border)] bg-[var(--surface)] px-3 font-display text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
            onClick={onTogglePause}
            aria-pressed={paused}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <p className="font-serif-accent text-2xl leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl text-balance">
        {pr.title}
      </p>

      <p className="font-display text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {name} · #{pr.number}
        {when ? ` · ${when}` : ""}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button href={pr.url} variant="primary" compact>
          Read patch
          <Icon name="external-link" size={12} />
        </Button>
        <span className="font-display text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {index + 1} / {total}
        </span>
      </div>
    </div>
  );

  if (shouldUseSafeMotion) {
    return content;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pr.url} {...fadeSlide}>
        {content}
      </motion.div>
    </AnimatePresence>
  );
});

export function ExperienceSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const [domain, setDomain] = useState<DomainId>("all");
  const [selectedRepo, setSelectedRepo] = useState(
    () => contributionGroups[0]?.repo ?? "",
  );
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activePatchUrl, setActivePatchUrl] = useState<string | null>(null);

  const spotlightPRs = useMemo(() => {
    const rows: ContributionWithRepo[] = contributionGroups.flatMap((g) =>
      g.items.map((pr) => ({ ...pr, repo: g.repo })),
    );
    return rows.sort((a, b) => prSortKey(b).localeCompare(prSortKey(a)));
  }, []);

  const visibleGroups = useMemo(() => {
    if (domain === "all") return contributionGroups;
    return contributionGroups.filter((g) => repoDomain(g.repo) === domain);
  }, [domain]);

  const displayRepo = useMemo(() => {
    if (visibleGroups.some((g) => g.repo === selectedRepo)) return selectedRepo;
    return visibleGroups[0]?.repo ?? selectedRepo;
  }, [visibleGroups, selectedRepo]);

  const selectedGroup = useMemo(
    () =>
      contributionGroups.find((g) => g.repo === displayRepo) ??
      contributionGroups[0],
    [displayRepo],
  );

  const domainSpectrum = useMemo(() => {
    const counts = new Map<Exclude<DomainId, "all">, number>();
    for (const group of contributionGroups) {
      const id = repoDomain(group.repo);
      counts.set(id, (counts.get(id) ?? 0) + group.merged);
    }
    const max = Math.max(1, ...counts.values());
    return (Object.keys(DOMAIN_META) as Exclude<DomainId, "all">[])
      .sort((a, b) => DOMAIN_META[a].order - DOMAIN_META[b].order)
      .map((id) => ({
        id,
        label: DOMAIN_META[id].label,
        count: counts.get(id) ?? 0,
        width: Math.round(((counts.get(id) ?? 0) / max) * 100),
      }))
      .filter((row) => row.count > 0);
  }, []);

  const spotlightPR = spotlightPRs[spotlightIndex] ?? spotlightPRs[0] ?? null;

  const highlightedPatchUrl = activePatchUrl ?? spotlightPR?.url ?? null;

  const goSpotlight = (index: number) => {
    const pr = spotlightPRs[index];
    if (!pr) return;
    setSpotlightIndex(index);
    setSelectedRepo(pr.repo);
    setActivePatchUrl(pr.url);
  };

  useEffect(() => {
    if (shouldUseSafeMotion || paused || spotlightPRs.length === 0) return;
    const timer = window.setInterval(() => {
      setSpotlightIndex((i) => {
        const next = (i + 1) % spotlightPRs.length;
        const pr = spotlightPRs[next];
        if (pr) {
          setSelectedRepo(pr.repo);
          setActivePatchUrl(pr.url);
        }
        return next;
      });
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, shouldUseSafeMotion, spotlightPRs]);

  if (!selectedGroup || !spotlightPR) return null;

  return (
    <Section id="experience" title="Open source" subtitle="Patch frequency">
      <div className="oss-shell">
        <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
            Upstream work visualized as signal: tune the band, follow the live
            merge feed, then inspect patches in each codebase.
          </p>
          <p className="font-display text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {contributionStats.merged} merges · {contributionStats.projects}{" "}
            repos
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-[var(--border)] px-4 py-3 sm:px-6">
          {DOMAIN_FILTERS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="oss-domain-chip shrink-0"
              data-active={domain === chip.id}
              onClick={() => setDomain(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="oss-broadcast border-b border-[var(--border)] px-4 py-6 sm:px-6 sm:py-8">
          <MergeBroadcast
            pr={spotlightPR}
            paused={paused}
            onTogglePause={() => setPaused((p) => !p)}
            onPrev={() => {
              setPaused(true);
              goSpotlight(
                (spotlightIndex - 1 + spotlightPRs.length) %
                  spotlightPRs.length,
              );
            }}
            onNext={() => {
              setPaused(true);
              goSpotlight((spotlightIndex + 1) % spotlightPRs.length);
            }}
            index={spotlightIndex}
            total={spotlightPRs.length}
          />
        </div>

        <div className="grid gap-px bg-[var(--border)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex items-center justify-center bg-[var(--surface)] p-4 sm:p-6">
            <Constellation
              groups={contributionGroups}
              activeRepo={displayRepo}
              domain={domain}
              onSelect={(repo) => {
                setPaused(true);
                setSelectedRepo(repo);
                const first = contributionGroups.find((g) => g.repo === repo)
                  ?.items[0];
                if (first) setActivePatchUrl(first.url);
              }}
            />
          </div>

          <div className="bg-[var(--surface-soft)] p-5 sm:p-7">
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Codebase intel
            </p>
            <h3 className="mt-2 font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:text-3xl">
              {parseRepo(selectedGroup.repo).name}
            </h3>
            <p className="mt-1 font-display text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {selectedGroup.repo} · ★ {formatStars(selectedGroup.stars)} ·{" "}
              {selectedGroup.merged} merged
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
              {selectedGroup.summary}
            </p>

            <p className="mt-6 mb-3 font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Patch stack
            </p>
            <div className="oss-patch-grid">
              {selectedGroup.items.map((pr) => (
                <a
                  key={pr.url}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oss-patch-chip"
                  data-active={highlightedPatchUrl === pr.url}
                  onMouseEnter={() => setActivePatchUrl(pr.url)}
                  onFocus={() => setActivePatchUrl(pr.url)}
                >
                  <span className="shrink-0 font-display text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    #{pr.number}
                  </span>
                  <span className="truncate">{pr.title}</span>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Button
                href={`https://github.com/${selectedGroup.repo}`}
                variant="secondary"
                compact
              >
                <Icon name="github" size={14} />
                Open on GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-5 sm:px-6">
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Impact spectrum
          </p>
          <p className="mt-1 font-serif-accent text-xl tracking-tight text-[var(--text-primary)]">
            Where merges cluster
          </p>
          <div className="oss-spectrum-row mt-4">
            {domainSpectrum.map((row) => (
              <div key={row.id}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="font-display text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {row.label}
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    {row.count} merge{row.count === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="oss-spectrum-track">
                  <div
                    className="oss-spectrum-fill"
                    style={{ width: `${row.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
