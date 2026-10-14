# Chitresh Yadav / csy20

A portfolio focused on Backend and Applied ML: measured speech systems, local agent tooling, shipped mobile products, and upstream engineering work.

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Vitest. Fonts, portraits, project logos, resume, and contribution evidence are served locally.

## Run locally

```bash
npm ci
npm run dev
```

For a production preview:

```bash
npm run build
npm run preview
```

## Validate

```bash
npm run lint
npm test -- --run
npm run build
```

## Content and themes

- `src/data/siteContent.ts`: identity, capabilities, projects, case studies, resume, and social links.
- `src/data/contributions.generated.json`: public GitHub evidence, bundled without a runtime API request.
- `src/data/contributions.ts`: derived summaries, status handling, and persistent curation exclusions.
- `src/config.ts`: optional `VITE_EMAIL`, `VITE_RESUME_URL`, and `VITE_THEME_STORAGE_KEY` overrides.
- `src/index.css`: semantic light/dark design tokens and responsive layouts.

Refresh contribution evidence with `node scripts/update-contributions.mjs`. Failed or incomplete requests preserve the last snapshot. No credentials are needed.

The two themes follow the initial system preference and persist an explicit selection under `csy20-theme` by default. The Vite pre-paint plugin keeps customized keys synchronized with React.

## Hosting

The existing static deployment is preserved. `docker compose up --build` serves Nginx on port 8080. CI publishes main to `csy20.me`; the redesign review branch stays local.

Read [the redesign notes](docs/REDESIGN.md) for review/revert instructions, screenshots, design rationale, validation, and remaining limitations.
