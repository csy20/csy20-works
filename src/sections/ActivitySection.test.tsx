import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  mergedContributionRepositories,
  mergedContributionSummary,
  mergedContributions,
  contributionSnapshot,
  contributions,
  formatContributionDate,
} from "../data/contributions";
import { ActivitySection } from "./ActivitySection";

describe("Open source evidence", () => {
  it("starts with a compact, expandable view and real evidence links", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    expect(
      screen.getByRole("heading", { name: "Better software, together." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Merged upstream pull requests" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /All repositories/ }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(5);

    await user.click(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    );
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(mergedContributionSummary.total);
    expect(
      screen.getByRole("button", { name: /Show fewer contributions/ }),
    ).toHaveAttribute("aria-expanded", "true");

    for (const record of mergedContributions) {
      expect(screen.getByRole("link", { name: record.title })).toHaveAttribute(
        "href",
        record.url,
      );
    }
    expect(
      container.querySelectorAll("a[href^='https:']").length,
    ).toBeGreaterThan(mergedContributionSummary.total);
  });

  it("excludes open and closed pull requests and repositories without merged work", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    await user.click(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    );

    expect(screen.queryByText("Open", { exact: true })).not.toBeInTheDocument();
    expect(
      screen.queryByText("Closed", { exact: true }),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".status-open")).not.toBeInTheDocument();
    expect(container.querySelector(".status-closed")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      `${mergedContributionSummary.total} pull requests`,
    );
    const repositoryOptions = screen.getByRole("group", {
      name: "Repositories",
    });
    expect(within(repositoryOptions).getAllByRole("button")).toHaveLength(
      mergedContributionRepositories.length + 1,
    );
    for (const record of contributions.filter(
      (record) => record.status !== "merged",
    )) {
      expect(
        screen.queryByRole("link", { name: record.title }),
      ).not.toBeInTheDocument();
      if (
        !mergedContributions.some(
          (item) => item.repository === record.repository,
        )
      ) {
        expect(
          within(repositoryOptions).queryByRole("button", {
            name: new RegExp(record.repository),
          }),
        ).not.toBeInTheDocument();
      }
    }
    for (const repository of mergedContributionRepositories) {
      expect(
        within(repositoryOptions).getByRole("button", {
          name: (name) =>
            name.replace(/\s/g, "") ===
            `${repository.repository}${repository.total}`,
        }),
      ).toBeInTheDocument();
    }
  });

  it("filters merged evidence by keyboard and preserves direct evidence links", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    const repository = screen.getByRole("button", {
      name: /redhat-et\/ripwire/,
    });
    repository.focus();
    await user.keyboard("{Enter}");

    expect(repository).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: /All repositories/ }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status")).toHaveTextContent("1 pull request");
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(1);
    const results = container.querySelector("#contribution-results");
    if (!results) throw new Error("Contribution result region is missing.");
    expect(
      within(results as HTMLElement).getByText("Merged", { exact: true }),
    ).toBeInTheDocument();
    expect(
      within(results as HTMLElement).queryByText("Closed", { exact: true }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "fix(ts): literal receivers no longer pin unrelated same-named functions",
      }),
    ).toHaveAttribute("href", "https://github.com/redhat-et/ripwire/pull/244");
  });

  it("resets expansion when the selected merged repository changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    await user.click(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    );
    await user.click(
      screen.getByRole("button", { name: /topoteretes\/cognee/ }),
    );
    const results = container.querySelector("#contribution-results");
    if (!results) throw new Error("Contribution result region is missing.");
    expect(
      within(results as HTMLElement).getByText("Merged", { exact: true }),
    ).toBeInTheDocument();
    expect(
      within(results as HTMLElement).queryByText("Closed", { exact: true }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 pull request");
    expect(
      within(results as HTMLElement).getAllByRole("listitem"),
    ).toHaveLength(1);
    expect(
      screen.queryByRole("button", { name: /Show fewer contributions/ }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /All repositories/ }));
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(5);
    expect(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("retains expanded content across presentation rerenders", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ActivitySection />);
    await user.click(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    );
    rerender(<ActivitySection />);
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(mergedContributionSummary.total);
    expect(screen.getByText(/Snapshot/)).toHaveTextContent(
      formatContributionDate(contributionSnapshot.generatedAt),
    );
  });
});
