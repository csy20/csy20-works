import { useState } from "react";
import {
  mergedContributionRepositories,
  mergedContributionSummary,
  mergedContributions,
  contributionSnapshot,
  formatContributionDate,
  getContributionDate,
} from "../data/contributions";

const previewCount = 5;

export function ActivitySection() {
  const [selectedRepository, setSelectedRepository] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const selectedContributions =
    selectedRepository === "all"
      ? mergedContributions
      : mergedContributions.filter(
          (record) => record.repository === selectedRepository,
        );
  const visibleContributions = showAll
    ? selectedContributions
    : selectedContributions.slice(0, previewCount);

  function selectRepository(repository: string) {
    setSelectedRepository(repository);
    setShowAll(false);
  }

  return (
    <section
      id="open-source"
      className="section open-source-section"
      aria-labelledby="open-source-title"
    >
      <div className="container">
        <header className="section-heading">
          <div>
            <p className="eyebrow">02 / Open source</p>
            <h2 id="open-source-title">Better software, together.</h2>
          </div>
          <p>
            Upstream work on runtime behavior, API correctness, and developer
            tools. Every change has a review trail.
          </p>
        </header>

        <dl
          className="contribution-summary"
          aria-label="Selected upstream contribution summary"
        >
          <div>
            <dt>Merged</dt>
            <dd>{mergedContributionSummary.merged}</dd>
          </div>
          <div>
            <dt>Repositories</dt>
            <dd>{mergedContributionSummary.repositories}</dd>
          </div>
        </dl>

        <div className="contribution-browser">
          <aside
            className="contribution-sidebar"
            aria-label="Filter contributions by repository"
          >
            <p className="eyebrow contribution-filter-label">
              Browse repositories
            </p>
            <div
              className="repository-options"
              role="group"
              aria-label="Repositories"
            >
              <button
                type="button"
                className="repository-option"
                aria-pressed={selectedRepository === "all"}
                aria-controls="contribution-results"
                onClick={() => selectRepository("all")}
              >
                <span>All repositories</span>
                <span className="repository-count">
                  {mergedContributionSummary.total}
                </span>
              </button>
              {mergedContributionRepositories.map((item) => (
                <button
                  key={item.repository}
                  type="button"
                  className="repository-option"
                  aria-pressed={selectedRepository === item.repository}
                  aria-controls="contribution-results"
                  onClick={() => selectRepository(item.repository)}
                >
                  <span className="repository-name">{item.repository}</span>
                  <span className="repository-count">{item.total}</span>
                </button>
              ))}
            </div>
          </aside>

          <div id="contribution-results" className="contribution-results">
            <div className="contribution-results-heading">
              <h3>
                {selectedRepository === "all"
                  ? "Merged upstream pull requests"
                  : selectedRepository}
              </h3>
              <p role="status" aria-live="polite">
                {selectedContributions.length} pull{" "}
                {selectedContributions.length === 1 ? "request" : "requests"}
              </p>
            </div>
            <ol className="contribution-list">
              {visibleContributions.map((record) => {
                const date = getContributionDate(record);
                return (
                  <li className="contribution-row" key={record.url}>
                    <div className="contribution-meta">
                      <a
                        className="contribution-repository"
                        href={`https://github.com/${record.repository}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {record.repository}
                      </a>
                      <span className="contribution-number">
                        #{record.number}
                      </span>
                    </div>
                    <a
                      className="contribution-title"
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{record.title}</span>
                      <span className="contribution-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                    <div className="contribution-state">
                      <span className="contribution-status status-merged">
                        <span className="status-dot" aria-hidden="true" />
                        Merged
                      </span>
                      <time dateTime={date}>
                        {formatContributionDate(date)}
                      </time>
                    </div>
                  </li>
                );
              })}
            </ol>
            {selectedContributions.length > previewCount && (
              <button
                className="text-button contribution-expand"
                type="button"
                aria-expanded={showAll}
                aria-controls="contribution-results"
                onClick={() => setShowAll((previous) => !previous)}
              >
                {showAll
                  ? "Show fewer contributions"
                  : `Show ${selectedContributions.length - previewCount} more contributions`}
                <span aria-hidden="true">{showAll ? "−" : "+"}</span>
              </button>
            )}
          </div>
        </div>

        <div className="contribution-footnote">
          <p>
            Merged technical contributions · Snapshot{" "}
            <time dateTime={contributionSnapshot.generatedAt}>
              {formatContributionDate(contributionSnapshot.generatedAt)}
            </time>
            .
          </p>
          <a
            className="inline-link"
            href={contributionSnapshot.sourceHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            All upstream PRs <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
