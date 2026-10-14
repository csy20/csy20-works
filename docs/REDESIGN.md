# Portfolio redesign

Local review branch: `redesign/editorial-portfolio`. The starting main commit is `b07227d`. Nothing was pushed or deployed.

## Preview and revert

From `/home/csy20/Documents/dev/csy20-works`:

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open http://localhost:4173. Production preview: `npm run build` then `npm run preview -- --host 127.0.0.1 --port 4174`.

The implementation is committed only on the review branch. To return to the original portfolio after stopping the preview server:

```bash
git switch main
```

Return to the redesign with `git switch redesign/editorial-portfolio`. Avoid discarding any new edits you make during review.

The existing Docker workflow remains `docker compose up --build` (port 8080). Dockerfile, Compose, Nginx, CI, CNAME, resume, original portrait files, and original project logos are preserved. CI still publishes main; the review branch does not publish.

## Design decisions

Space Grotesk leads a compact editorial layout. Instrument Serif appears in a few italic accents. Warm paper / graphite themes share semantic tokens for readable text, surfaces, borders, accent, focus, status, and interaction states. Terracotta provides a restrained accent; project logos retain their original colors.

The hero establishes identity and purpose, offers selected work and resume links, and presents evidence before the project section. The original square portrait remains fully visible, framed like a small print; the mobile portrait sits alongside identity so actions arrive quickly.

Speech Relay has a code-native architecture illustration explicitly labelled as an illustration. 02_OS uses its actual logo and an explicit public-alpha status. Bytewise uses its actual logo, content categories, and the real Play Store destination. The three case studies explain the problem, implementation, decision, and outcome; native inline details provide deeper engineering notes. Five additional projects remain discoverable, including Nen's shipped Play Store status.

Open-source work is a bundled evidence browser with repository filtering, status counts, dates, and direct PR links. On desktop the repository list scrolls independently; on mobile it becomes a horizontal keyboard-accessible selector. The initial five records can expand to the full technical snapshot. Counts distinguish merged, open, and closed without merge.

Home / Work / Open source / Contact form a compact navigation capsule in the top-right header. A separate centered floating pill follows the supplied social-dock reference: Home / GitHub / LinkedIn / X / YouTube / Email / Theme. Instagram remains in the contact links. All seven dock controls fit at 320px with at least 44px touch targets. Resume appears beside the header navigation on desktop and remains in the hero and contact section on mobile. Tooltips appear on hover/focus, header section state follows scrolling, and only the floating dock icon contents magnify on fine pointers without reduced motion. Safe-area and bottom spacing keep contact and focused controls clear of the dock.

Boot animations, wallpaper presentation, sounds, cursor effects, and animation-dependent content reveals were removed, along with their obsolete components and tests. Essential content renders immediately. Theme switching preserves scroll and expanded content. The pre-paint script and React provider share the configurable `csy20-theme` key, handle unavailable storage/media APIs, follow the initial system preference, and update theme-color.

The manifest now references real icon files; the sitemap describes the canonical homepage rather than fragments. SEO metadata, JSON-LD, skip navigation, unknown-route handling, and the error boundary remain.

## Evidence and content accuracy

The starting repository, all available branch history, and the live JavaScript bundles lacked the requested `contributions.ts` and generated snapshot. A public GitHub snapshot was therefore recovered on 14 October 2026: 22 upstream PRs, with 21 technical records across 14 repositories in the displayed selection (11 merged, 7 open, 3 closed). One wallpaper submission is retained in the raw snapshot and explicitly excluded from the technical view. Counts describe the selected snapshot, not lifetime activity.

Refresh the public snapshot with:

```bash
node scripts/update-contributions.mjs
```

The script needs no credentials and preserves the existing snapshot on failed/incomplete requests. Curation lives separately in `src/data/contributions.ts`, so refreshing preserves exclusions. The site makes no runtime contribution API request.

Speech Relay's 2,505 ms mean / 2,580 ms p50 CPU profile covers 11 utterances with faster-whisper tiny/int8, OPUS-MT, and edge-tts. The 23.6% VAD result comes from a separate comparison: 4,708 ms fixed-window versus 3,597 ms VAD. These measurements are presented separately and linked to the [original results](https://github.com/csy20/speech-relay/blob/main/eval/results.md). The old fan-out efficiency and ONNX stub timings are not recast as application speedups.

All original project, source, release, Play Store, resume, email, and social destinations remain. No screenshots, employers, endorsements, users, downloads, or additional performance claims were invented.

## Validation

- `npm run lint`: passed.
- `npm test -- --run`: 25 tests passed across 8 files, including theme initialization/persistence/fallbacks, dock navigation, contribution status/selection/expansion, portrait sources, all preserved project links, error boundaries, and unknown routes.
- `npm run build`: passed, including TypeScript project checking and Vite production output.
- Clean Docker build: passed with the original Node 20 Alpine / Nginx Dockerfile and a real `npm ci` install. The initial clean build exposed missing optional peer entries in the old lockfile. Refreshing with npm 10 added 18 missing entries without changing existing package versions or dependency declarations.
- Production browser layout: both themes passed at 320, 390, 768, 1280, and 1440 pixels; short screens at 320 × 480 and 1280 × 600; no horizontal overflow, broken images, or JavaScript page errors.
- Actual Chromium 200% browser zoom: both themes passed at a 1280-pixel physical window / 640-pixel CSS viewport. `chrome.tabs.getZoom()` confirmed 2; this was real browser zoom rather than a screenshot scale.
- Keyboard interaction: skip navigation, all core dock links, active-section updates, focus tooltips, all 14 repository filters, native project details, contribution expansion, theme persistence, and scroll/content preservation passed. Focused controls remained clear of the dock.
- Navigation follow-up: the section navigation moved to the header and a separate social/theme dock now follows the supplied reference. Both themes passed 44px target checks, keyboard tooltips, header active states, preserved destinations, theme persistence after reload, scroll/expanded-content preservation, focused contact-email clearance, and overflow checks at 320px, 390px, 768px, 1440px, 1920px, 320×480, and 1440×600. See [the report](validation/two-navigation.json), [desktop light](screenshots/navigation-desktop-light.png), [desktop dark](screenshots/navigation-desktop-dark.png), [mobile light](screenshots/navigation-mobile-light.png), and [mobile dark](screenshots/navigation-mobile-dark.png). The earlier header-control report/screenshots remain as a historical checkpoint.
- Automated accessibility: zero Axe WCAG A/AA violations at 320 and 1440 pixels in both themes. The initial mobile scan could not resolve 27 clipped/short-text nodes. Each of the 15 repository-selector states was subsequently scrolled into view and rechecked in both themes with zero violations or unresolved checks; the raw reports retain the original incomplete results.
- Nginx runtime: both themes, navigation, resume/portrait/manifest/CNAME assets, and SPA fallback passed with no browser errors and no contribution API requests. `nginx -t` and Compose configuration validation passed. The temporary QA container was removed after verification.
- Reduced motion: hover magnification stayed off, transitions/animations were disabled, and all essential content remained visible.
- Every upstream PR and repository evidence destination returned HTTP 200. Original project, store, and profile destination results are recorded separately.

Machine-readable reports are in [validation](validation/layout-report.json), [accessibility](validation/accessibility-report.json), [interaction](validation/interaction-report.json), [actual zoom](validation/browser-zoom-report.json), and [evidence links](validation/evidence-links.json), [Docker runtime](validation/docker-runtime.json), and [mobile contrast / reduced motion](validation/manual-mobile-contrast-and-motion.json).

## Screenshots

- Desktop: [light](screenshots/desktop-light.png), [dark](screenshots/desktop-dark.png), [full light page](screenshots/desktop-light-full.png), [full dark page](screenshots/desktop-dark-full.png).
- Mobile: [light](screenshots/mobile-light.png), [dark](screenshots/mobile-dark.png), [full light page](screenshots/mobile-light-full.png), [full dark page](screenshots/mobile-dark-full.png).
- Selected work: [desktop light](screenshots/work-desktop-light.png), [desktop dark](screenshots/work-desktop-dark.png), [mobile light](screenshots/work-mobile-light.png), [mobile dark](screenshots/work-mobile-dark.png).
- Open source: [light](screenshots/open-source-light.png), [dark](screenshots/open-source-dark.png).
- Actual 200% browser zoom: [light](screenshots/browser-zoom-200-light-fold.png), [dark](screenshots/browser-zoom-200-dark-fold.png).

The full matrix and contact screenshots were also visually reviewed; representative exports are retained in the repository.

## Known limits

The existing YouTube destination returned HTTP 404 during verification; it has been preserved for the owner to correct rather than guessing another account. LinkedIn returned HTTP 429 to automated verification; the original destination is preserved. All project GitHub destinations, the 02_OS release, both Play Store listings, the GitHub profile, X, Instagram, local resume, and portrait destinations returned HTTP 200 during verification.

Contribution status is accurate at the snapshot date and needs an explicit refresh to reflect later reviews. Screenshots validate Chromium; a physical iOS Safari device was not available. The code supports safe areas and reduced motion, and fallback theme behavior was tested with unavailable storage. No deployment or hosted-domain smoke test was performed because the user requested local-only work.

The clean Docker install reported 16 existing development-dependency advisories. A separate [production dependency audit](validation/production-audit.json) found zero advisories. Existing dependency versions were retained; development-tool upgrades remain a separate maintenance task.
