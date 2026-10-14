import { writeFile } from "node:fs/promises";

// Public data only. Curated exclusions live in contributions.ts and survive refreshes.
const author = "csy20";
const query = `is:pr author:${author} -user:${author}`;
const sourceUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100&sort=updated&order=desc`;
const records = [];
let expectedTotal = 0;

for (let page = 1; page <= 10; page += 1) {
  const response = await fetch(`${sourceUrl}&page=${page}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "csy20-portfolio-snapshot",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub snapshot request failed (${response.status}). Existing data was preserved.`,
    );
  }

  const result = await response.json();
  expectedTotal = result.total_count;

  if (result.incomplete_results || expectedTotal > 1000) {
    throw new Error(
      "GitHub returned an incomplete search. Existing data was preserved.",
    );
  }

  for (const item of result.items) {
    if (item.user.login.toLowerCase() !== author || !item.pull_request) {
      throw new Error(
        "Unexpected pull request record. Existing data was preserved.",
      );
    }

    records.push({
      repository: item.repository_url.replace(
        "https://api.github.com/repos/",
        "",
      ),
      number: item.number,
      title: item.title,
      url: item.html_url,
      state: item.state,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      closedAt: item.closed_at,
      mergedAt: item.pull_request.merged_at ?? null,
    });
  }

  if (records.length >= expectedTotal) break;
}

if (
  records.length !== expectedTotal ||
  new Set(records.map((item) => item.url)).size !== records.length
) {
  throw new Error(
    "GitHub returned missing or duplicate records. Existing data was preserved.",
  );
}

const snapshot = {
  generatedAt: new Date().toISOString(),
  author,
  query,
  sourceUrl,
  sourceHref: `https://github.com/pulls?q=${encodeURIComponent(query)}`,
  coverage:
    "Public upstream pull requests authored by csy20, excluding repositories owned by csy20. Curated technical evidence is filtered separately.",
  complete: true,
  total: records.length,
  records: records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
};

await writeFile(
  new URL("../src/data/contributions.generated.json", import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`,
);
console.log(
  `Saved ${records.length} public upstream pull requests. Curated exclusions were preserved.`,
);
