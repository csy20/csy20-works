import snapshot from "./contributions.generated.json";

export type ContributionStatus = "merged" | "open" | "closed";

export type Contribution = {
  repository: string;
  number: number;
  title: string;
  url: string;
  status: ContributionStatus;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  mergedAt: string | null;
};

export type ContributionSummary = {
  total: number;
  merged: number;
  open: number;
  closed: number;
  repositories: number;
};

// Keep curation separate from generated data so refreshes preserve it.
// This wallpaper asset submission remains in the snapshot, outside the technical view.
export const curatedContributionExclusions: Readonly<Record<string, string>> = {
  "https://github.com/notparth2005/walli/pull/1":
    "Wallpaper asset submission; this section focuses on engineering contributions.",
};

export function getContributionStatus(record: {
  state: string;
  mergedAt: string | null;
}): ContributionStatus {
  if (record.mergedAt) return "merged";
  return record.state === "open" ? "open" : "closed";
}

export function summarizeContributions(
  records: readonly Contribution[],
): ContributionSummary {
  return {
    total: records.length,
    merged: records.filter((record) => record.status === "merged").length,
    open: records.filter((record) => record.status === "open").length,
    closed: records.filter((record) => record.status === "closed").length,
    repositories: new Set(records.map((record) => record.repository)).size,
  };
}

export const contributionSnapshot = {
  generatedAt: snapshot.generatedAt,
  sourceHref: snapshot.sourceHref,
  sourceUrl: snapshot.sourceUrl,
  coverage: snapshot.coverage,
  complete: snapshot.complete,
  total: snapshot.total,
};

export const contributions: readonly Contribution[] = snapshot.records
  .filter((record) => !(record.url in curatedContributionExclusions))
  .map((record) => ({ ...record, status: getContributionStatus(record) }))
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

export const contributionSummary = summarizeContributions(contributions);

export const contributionRepositories = [
  ...new Set(contributions.map((record) => record.repository)),
]
  .map((repository) => ({
    repository,
    ...summarizeContributions(
      contributions.filter((record) => record.repository === repository),
    ),
  }))
  .sort(
    (a, b) => b.total - a.total || a.repository.localeCompare(b.repository),
  );

export function getContributionDate(record: Contribution): string {
  return record.mergedAt ?? record.closedAt ?? record.createdAt;
}

export function formatContributionDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
