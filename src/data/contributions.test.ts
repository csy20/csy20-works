import { describe, expect, it } from "vitest";
import snapshot from "./contributions.generated.json";
import {
  contributionRepositories,
  contributionSummary,
  contributions,
  curatedContributionExclusions,
  formatContributionDate,
  getContributionDate,
  getContributionStatus,
  summarizeContributions,
} from "./contributions";

describe("local contribution evidence", () => {
  it("distinguishes merged pull requests from closed and open ones", () => {
    expect(
      getContributionStatus({
        state: "closed",
        mergedAt: "2026-10-12T15:01:16Z",
      }),
    ).toBe("merged");
    expect(getContributionStatus({ state: "closed", mergedAt: null })).toBe(
      "closed",
    );
    expect(getContributionStatus({ state: "open", mergedAt: null })).toBe(
      "open",
    );
  });

  it("derives counts from curated records while retaining excluded evidence in the snapshot", () => {
    expect(contributionSummary.total).toBe(contributions.length);
    expect(
      contributionSummary.merged +
        contributionSummary.open +
        contributionSummary.closed,
    ).toBe(contributions.length);
    expect(contributionSummary.repositories).toBe(
      contributionRepositories.length,
    );
    expect(
      contributionRepositories.reduce(
        (total, repository) => total + repository.total,
        0,
      ),
    ).toBe(contributions.length);
    expect(snapshot.records).toHaveLength(snapshot.total);

    for (const url of Object.keys(curatedContributionExclusions)) {
      expect(snapshot.records.some((record) => record.url === url)).toBe(true);
      expect(contributions.some((record) => record.url === url)).toBe(false);
    }
  });

  it("contains unique direct evidence destinations and matching merge states", () => {
    expect(new Set(contributions.map((record) => record.url)).size).toBe(
      contributions.length,
    );

    for (const record of contributions) {
      expect(record.url).toBe(
        `https://github.com/${record.repository}/pull/${record.number}`,
      );
      expect(record.repository.split("/")[0]).not.toBe("csy20");
      expect(record.status === "merged").toBe(Boolean(record.mergedAt));
      expect(Number.isNaN(Date.parse(getContributionDate(record)))).toBe(false);
    }
  });

  it("uses merge, closure, or opening dates according to actual status", () => {
    const merged = contributions.find((record) => record.status === "merged");
    const closed = contributions.find((record) => record.status === "closed");
    const open = contributions.find((record) => record.status === "open");
    expect(merged).toBeDefined();
    expect(closed).toBeDefined();
    expect(open).toBeDefined();

    if (!merged || !closed || !open)
      throw new Error("Missing status evidence in snapshot.");
    expect(getContributionDate(merged)).toBe(merged.mergedAt);
    expect(getContributionDate(closed)).toBe(closed.closedAt);
    expect(getContributionDate(open)).toBe(open.createdAt);
    expect(formatContributionDate("2026-10-12T23:59:59Z")).toBe("12 Oct 2026");
    expect(summarizeContributions([])).toEqual({
      total: 0,
      merged: 0,
      open: 0,
      closed: 0,
      repositories: 0,
    });
  });
});
