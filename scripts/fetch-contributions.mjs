// Fetches PRs authored by csy20 on repos csy20 does not own, with repo stars,
// and writes src/data/contributions.generated.json. Run: npm run contributions
import { writeFile } from "node:fs/promises";

const USER = "csy20";
const OUT = new URL("../src/data/contributions.generated.json", import.meta.url);
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "csy20-works-contributions",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

const q = encodeURIComponent(`author:${USER} type:pr -user:${USER}`);
const search = await gh(
  `https://api.github.com/search/issues?q=${q}&per_page=100&sort=created`,
);

const stars = new Map();
const items = [];
for (const i of search.items) {
  const repo = i.repository_url.split("/repos/")[1];
  if (!stars.has(repo)) {
    const r = await gh(`https://api.github.com/repos/${repo}`);
    stars.set(repo, r.stargazers_count);
  }
  const merged = Boolean(i.pull_request?.merged_at);
  items.push({
    source: "github",
    repo,
    stars: stars.get(repo),
    number: i.number,
    title: i.title,
    url: i.html_url,
    status: merged ? "merged" : i.state === "open" ? "open" : "closed",
    createdAt: i.created_at,
    mergedAt: i.pull_request?.merged_at ?? null,
  });
}

await writeFile(
  OUT,
  JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2) +
    "\n",
);
console.log(`Wrote ${items.length} contributions`);
