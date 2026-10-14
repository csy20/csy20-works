import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  contributionSnapshot,
  contributionSummary,
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
    ).toHaveLength(contributionSummary.total);
    expect(
      screen.getByRole("button", { name: /Show fewer contributions/ }),
    ).toHaveAttribute("aria-expanded", "true");

    for (const record of contributions) {
      expect(screen.getByRole("link", { name: record.title })).toHaveAttribute(
        "href",
        record.url,
      );
    }
    expect(
      container.querySelectorAll("a[href^='https:']").length,
    ).toBeGreaterThan(contributionSummary.total);
  });

  it("filters by keyboard and describes open work honestly", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    const repository = screen.getByRole("button", { name: /google\/gvisor/ });
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
      within(results as HTMLElement).getByText("Open", { exact: true }),
    ).toBeInTheDocument();
    expect(
      within(results as HTMLElement).queryByText("Merged", { exact: true }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "tcp: handle receive-buffer exhaustion with small segments",
      }),
    ).toHaveAttribute("href", "https://github.com/google/gvisor/pull/15325");
  });

  it("separates closed work from merged work and resets expansion when the repository changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<ActivitySection />);
    await user.click(
      screen.getByRole("button", { name: /Show \d+ more contributions/ }),
    );
    await user.click(screen.getByRole("button", { name: /dart-lang\/sdk/ }));
    const results = container.querySelector("#contribution-results");
    if (!results) throw new Error("Contribution result region is missing.");
    expect(
      within(results as HTMLElement).getByText("Closed", { exact: true }),
    ).toBeInTheDocument();
    expect(
      within(results as HTMLElement).queryByText("Merged", { exact: true }),
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
    ).toHaveLength(contributionSummary.total);
    expect(screen.getByText(/Snapshot/)).toHaveTextContent(
      formatContributionDate(contributionSnapshot.generatedAt),
    );
  });
});
