import generated from "./contributions.generated.json";

export type ContributionStatus = "merged" | "open" | "closed";

export type Contribution = {
  source: "github" | "gerrit";
  repo: string;
  stars: number;
  number: number;
  title: string;
  url: string;
  status: ContributionStatus;
  createdAt: string;
  mergedAt: string | null;
};

export type ContributionGroup = {
  repo: string;
  stars: number;
  summary: string;
  featured: boolean;
  items: Contribution[];
  merged: number;
};

/** Hand-written impact line per repo. Repos without one fall back to a generic summary. */
const curated: Record<string, { summary: string; featured?: boolean }> = {
  "semantica-agi/semantica": {
    summary:
      "Graph-native context infrastructure for accountable AI. Vector-store concurrency fixes, knowledge-graph content screening, MCP provenance, explorer refactor and docs.",
    featured: true,
  },
  "topoteretes/cognee": {
    summary:
      "Open-source AI memory platform. Fixed ingestion of schema-qualified SQL tables; API error mapping in review.",
    featured: true,
  },
  "google/gvisor": {
    summary:
      "Application kernel for containers. TCP receive-buffer exhaustion handling with small segments.",
    featured: true,
  },
  "dart-lang/sdk": {
    summary:
      "Dart analysis server: resource-provider I/O timing instrumentation.",
    featured: true,
  },
  "internetarchive/openlibrary": {
    summary: "Spam-check and reCAPTCHA refactor to explicit request params.",
  },
  "agent-of-empires/agent-of-empires": {
    summary: "TUI names the host terminal tab after the selected session.",
  },
  "redhat-et/ripwire": {
    summary:
      "Symbol resolution fix: literal receivers no longer pin unrelated functions.",
  },
};

const hiddenUrls = new Set(["https://github.com/notparth2005/walli/pull/1"]);

const items = (generated.items as Contribution[]).filter(
  (c) => c.status === "merged" && !hiddenUrls.has(c.url),
);

export const contributionGroups: ContributionGroup[] = (() => {
  const map = new Map<string, Contribution[]>();
  for (const c of items) {
    map.set(c.repo, [...(map.get(c.repo) ?? []), c]);
  }
  return [...map.entries()]
    .map(([repo, list]) => {
      const info = curated[repo];
      const first = list[0];
      const merged = list.filter((c) => c.status === "merged").length;
      return {
        repo,
        stars: first?.stars ?? 0,
        summary: info?.summary ?? first?.title ?? "",
        featured: Boolean(info?.featured),
        items: list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        merged,
      };
    })
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.merged - a.merged ||
        b.stars - a.stars,
    );
})();

export const contributionStats = {
  merged: items.filter((c) => c.status === "merged").length,
  open: items.filter((c) => c.status === "open").length,
  projects: new Set(
    items.filter((c) => c.status === "merged").map((c) => c.repo),
  ).size,
};
