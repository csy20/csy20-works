import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../components/animations/motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { Icon } from "../components/ui/Icon";
import { Section } from "../components/ui/Section";
import { config } from "../config";
import {
  contributionGroups,
  contributionStats,
  type Contribution,
  type ContributionGroup,
} from "../data/contributions";

const REPO_DOMAIN: Record<string, string> = {
  "semantica-agi/semantica": "AI & memory",
  "topoteretes/cognee": "AI & memory",
  "google/gvisor": "Systems & infrastructure",
  "dart-lang/sdk": "Language tooling",
  "internetarchive/openlibrary": "Open knowledge",
  "agent-of-empires/agent-of-empires": "Developer tools",
  "redhat-et/ripwire": "Developer tools",
  "xevrion/breakscale": "Systems & infrastructure",
};

function parseRepo(repo: string) {
  const slash = repo.indexOf("/");
  return slash === -1
    ? { owner: "", name: repo }
    : { owner: repo.slice(0, slash), name: repo.slice(slash + 1) };
}

function formatStars(stars: number) {
  return stars >= 1000
    ? `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : stars.toLocaleString("en-US");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function MergeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="5" r="2.5" />
      <circle cx="7" cy="19" r="2.5" />
      <circle cx="17" cy="5" r="2.5" />
      <path d="M7 7.5v9M17 7.5v1a5 5 0 0 1-5 5H7" />
    </svg>
  );
}

function PatchLink({
  patch,
  latest = false,
}: {
  patch: Contribution;
  latest?: boolean;
}) {
  const date = patch.mergedAt ?? patch.createdAt;

  return (
    <li>
      <a
        href={patch.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`oss-patch ${latest ? "oss-patch--latest" : ""}`}
      >
        <span className="oss-patch-icon">
          <MergeIcon size={latest ? 21 : 17} />
        </span>
        <span className="oss-patch-content">
          <span className="oss-patch-meta">
            <span>#{patch.number}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={date}>{formatDate(date)}</time>
            {latest && <span className="oss-latest-label">Latest merge</span>}
          </span>
          <span className="oss-patch-title">{patch.title}</span>
        </span>
        <span className="oss-patch-arrow">
          <Icon name="external-link" size={16} />
        </span>
      </a>
    </li>
  );
}

function RepositoryPanel({ group }: { group: ContributionGroup }) {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const [expanded, setExpanded] = useState(false);
  const { owner, name } = parseRepo(group.repo);
  const patches = useMemo(
    () =>
      [...group.items].sort((a, b) =>
        (b.mergedAt ?? b.createdAt).localeCompare(a.mergedAt ?? a.createdAt),
      ),
    [group.items],
  );
  const visiblePatches = expanded ? patches : patches.slice(0, 4);
  const remaining = patches.length - 4;

  return (
    <motion.article
      id="oss-repository-panel"
      className="oss-repository-panel"
      aria-labelledby="oss-repository-name"
      {...(!shouldUseSafeMotion && {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, ease: EASE_OUT },
      })}
    >
      <header className="oss-repository-header">
        <div className="oss-repository-eyebrow">
          <span className="oss-label">
            {REPO_DOMAIN[group.repo] ?? "Apps & community"}
          </span>
          <span className="oss-merged-badge">
            <MergeIcon size={14} />
            {group.merged} merged
          </span>
        </div>
        <h3 id="oss-repository-name" className="oss-repository-name">
          {name}
        </h3>
        <div className="oss-repository-meta">
          <span>{owner}</span>
          <span className="oss-repository-stars">
            <Icon name="star" size={13} />
            {formatStars(group.stars)} stars
          </span>
        </div>
        <p className="oss-repository-description">{group.summary}</p>
        <a
          href={`https://github.com/${group.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="oss-repository-link"
        >
          <Icon name="github" size={15} />
          Explore repository
          <Icon name="external-link" size={12} />
        </a>
      </header>

      <div className="oss-patches-heading">
        <h4 className="oss-label">Merged contributions</h4>
        <span>Latest first</span>
      </div>
      <ul id="oss-patch-list" className="oss-patch-list">
        {visiblePatches.map((patch, index) => (
          <PatchLink key={patch.url} patch={patch} latest={index === 0} />
        ))}
      </ul>
      {remaining > 0 && (
        <div className="oss-patches-footer">
          <button
            type="button"
            className="oss-expand-button"
            aria-expanded={expanded}
            aria-controls="oss-patch-list"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? "Show fewer contributions"
              : `Show ${remaining} more contribution${remaining === 1 ? "" : "s"}`}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
          <span className="oss-patch-count">
            {visiblePatches.length} of {patches.length}
          </span>
        </div>
      )}
    </motion.article>
  );
}

export function ExperienceSection() {
  const [selectedRepo, setSelectedRepo] = useState(
    () =>
      contributionGroups.find((group) => group.featured)?.repo ??
      contributionGroups[0]?.repo ??
      "",
  );
  const selectedGroup =
    contributionGroups.find((group) => group.repo === selectedRepo) ??
    contributionGroups[0];

  if (!selectedGroup) return null;

  return (
    <Section
      id="experience"
      title="Open source"
      subtitle="Upstream contributions"
    >
      <div className="oss-showcase">
        <div className="oss-intro">
          <p className="oss-intro-copy">
            Making the tools I use a little better.
            <span>
              Fixes, features, and thoughtful improvements — contributed back to
              the projects that make my work possible.
            </span>
          </p>
          <dl className="oss-stats">
            <div>
              <dt>Patches merged</dt>
              <dd>{contributionStats.merged}</dd>
            </div>
            <div>
              <dt>Codebases</dt>
              <dd>{contributionStats.projects}</dd>
            </div>
          </dl>
        </div>

        <div className="oss-workspace">
          <div className="oss-repositories">
            <div className="oss-repositories-heading">
              <p className="oss-label">The codebases</p>
              <span>{String(contributionGroups.length).padStart(2, "0")}</span>
            </div>
            <nav
              className="oss-repository-nav"
              aria-label="Contribution repositories"
            >
              {contributionGroups.map((group, index) => {
                const { owner, name } = parseRepo(group.repo);
                const active = group.repo === selectedGroup.repo;

                return (
                  <button
                    key={group.repo}
                    type="button"
                    className="oss-repository-button"
                    data-active={active}
                    aria-pressed={active}
                    aria-controls="oss-repository-panel"
                    aria-label={`${name}, ${group.merged} merged contribution${group.merged === 1 ? "" : "s"}`}
                    onClick={() => setSelectedRepo(group.repo)}
                  >
                    <span className="oss-repository-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="oss-repository-button-copy">
                      <span className="oss-repository-button-name">{name}</span>
                      <span className="oss-repository-owner">{owner}</span>
                    </span>
                    <span className="oss-repository-count" aria-hidden="true">
                      {group.merged}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="oss-repositories-note" aria-hidden="true">
              <MergeIcon size={19} />
              <p>
                Small patches.
                <br />
                Shared progress.
              </p>
            </div>
          </div>

          <RepositoryPanel key={selectedGroup.repo} group={selectedGroup} />
        </div>

        <div className="oss-footer">
          <p>Every patch, part of something bigger.</p>
          <a
            href={`https://github.com/${config.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow along on GitHub
            <Icon name="external-link" size={12} />
          </a>
        </div>
      </div>
    </Section>
  );
}
