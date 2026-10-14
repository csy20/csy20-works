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

Speech Relay has a code-native architecture illustration explicitly labelled as an illustration. 02_OS uses its actual logo and an explicit public-alpha status. Bytewise uses its actual logo, content categories, and the real Play Store destination. The three case studies explain the problem, implementation, decision, and outcome; native inline details provide deeper engineering notes. Nen has a full-width published-product spotlight before the workbench list, with its original app icon, everyday benefits, Google Play/source actions, and expandable technical details. Its heading scale, compact cover lockup, wrapping benefits, and quiet inline links match the existing features. Four additional engineering projects remain discoverable in the workbench.

Open-source work is a bundled evidence browser with repository filtering, counts, merge dates, and direct PR links. On desktop the repository list scrolls independently; on mobile it becomes a horizontal keyboard-accessible selector. The initial five records can expand to all merged technical contributions. Both open and closed-without-merge PRs are excluded from visible rows, repository choices, totals, and hero proof counts. Their original records remain in the source snapshot.

Home / Work / Open source / Contact form a compact navigation capsule fixed at the top-right of the viewport, so it remains available while scrolling in either direction. The wordmark and desktop header Resume remain in normal page flow. A separate centered floating pill follows the supplied social-dock reference: Home / GitHub / LinkedIn / X / YouTube / Email / Theme. The bottom dock is 432×64px on desktop; all seven controls still fit at 320px with at least 44px touch targets. Instagram remains in the contact links. Resume remains in the hero and contact section on mobile. Tooltips appear on hover/focus, section state follows scrolling, and dock controls use the production spring lift/magnification on fine pointers at widths of at least 640px when reduced motion is off. The shell stays centered and stable. Safe-area insets, anchor offsets, and bottom spacing keep destination headings and focused controls clear of navigation.

Boot animations, wallpaper presentation, cursor effects, and animation-dependent content reveals were removed, along with their obsolete components and tests. Essential content renders immediately. Theme switching preserves scroll and expanded content. The pre-paint script and React provider share the configurable `csy20-theme` key, handle unavailable storage/media APIs, follow the initial system preference, and update theme-color.

Optional dock audio uses the production 1640Hz sine tick, with the same gain envelope and 50ms duration. Mouse/pen hover requests sound independently of magnification, viewport width, and reduced motion. One lazy Web Audio context follows the browser's autoplay policy; a blocked first request survives initialization, coalesces to one pending tick, and retries on a trusted pointer/keyboard interaction. There is no artificial throttle once audio is running. The footer's "Dock sound" action persists on/off preference in `csy20-dock-sound` and plays a preview tick when re-enabled. Muting or unmounting cancels pending playback; unavailable storage/audio and rejected resumes do not interrupt navigation. Touch entry stays quiet, with feedback on deliberate dock activation. No audio files or live services are required.

The manifest now references real icon files; the sitemap describes the canonical homepage rather than fragments. SEO metadata, JSON-LD, skip navigation, unknown-route handling, and the error boundary remain.

## Evidence and content accuracy

The starting repository, all available branch history, and the live JavaScript bundles lacked the requested `contributions.ts` and generated snapshot. A public GitHub snapshot was therefore recovered on 14 October 2026: 22 upstream PRs, with 21 curated technical records across 14 repositories (11 merged, 7 open, 3 closed). The visible portfolio now presents only the 11 merged records across 6 repositories. The generated snapshot, all unmerged records, and wallpaper curation remain intact. One wallpaper submission remains outside the technical view. Counts describe the selected snapshot, not lifetime activity.

Refresh the public snapshot with:

```bash
node scripts/update-contributions.mjs
```

The script needs no credentials and preserves the existing snapshot on failed/incomplete requests. Curation lives separately in `src/data/contributions.ts`, so refreshing preserves exclusions. The site makes no runtime contribution API request.

Speech Relay's 2,505 ms mean / 2,580 ms p50 CPU profile covers 11 utterances with faster-whisper tiny/int8, OPUS-MT, and edge-tts. The 23.6% VAD result comes from a separate comparison: 4,708 ms fixed-window versus 3,597 ms VAD. These measurements are presented separately and linked to the [original results](https://github.com/csy20/speech-relay/blob/main/eval/results.md). The old fan-out efficiency and ONNX stub timings are not recast as application speedups.

All original project, source, release, Play Store, resume, email, and social destinations remain. No screenshots, employers, endorsements, users, downloads, or additional performance claims were invented.

## Validation

- `npm run lint`: passed.
- `npm test -- --run`: 41 tests passed across 10 files, including theme initialization/persistence/fallbacks, dock navigation, sound hover/first-tick/mute/persistence/fallback/resume/cleanup behavior, merged-contribution filtering/counts/selection/expansion, Nen's product placement/store destination, portrait sources, all preserved project links, error boundaries, and unknown routes.
- `npm run build`: passed, including TypeScript project checking and Vite production output.
- Clean Docker build: passed with the original Node 20 Alpine / Nginx Dockerfile and a real `npm ci` install. The initial clean build exposed missing optional peer entries in the old lockfile. Refreshing with npm 10 added 18 missing entries without changing existing package versions or dependency declarations.
- Production browser layout: both themes passed at 320, 390, 768, 1280, and 1440 pixels; short screens at 320 × 480 and 1280 × 600; no horizontal overflow, broken images, or JavaScript page errors.
- Actual Chromium 200% browser zoom: both themes passed at a 1280-pixel physical window / 640-pixel CSS viewport. `chrome.tabs.getZoom()` confirmed 2; this was real browser zoom rather than a screenshot scale.
- Keyboard interaction: skip navigation, all core dock links, active-section updates, focus tooltips, repository filters, native product/project details, contribution expansion, theme persistence, and scroll/content preservation passed. Focused controls remained clear of the dock.
- Navigation follow-up: the section navigation moved to the header and a separate social/theme dock now follows the supplied reference. Both themes passed 44px target checks, keyboard tooltips, header active states, preserved destinations, theme persistence after reload, scroll/expanded-content preservation, focused contact-email clearance, and overflow checks at 320px, 390px, 768px, 1440px, 1920px, 320×480, and 1440×600. See [the report](validation/two-navigation.json), [desktop light](screenshots/navigation-desktop-light.png), [desktop dark](screenshots/navigation-desktop-dark.png), [mobile light](screenshots/navigation-mobile-light.png), and [mobile dark](screenshots/navigation-mobile-dark.png). The earlier header-control report/screenshots remain as a historical checkpoint.
- Compact/pinned follow-up: desktop dock reduced from 504×78px to 432×64px; top-right navigation remains at the same viewport position during scrolling. Both themes passed nine viewport profiles, including 640×450 and 320×320, with correct anchor landing/highlights, keyboard tooltips, 44px touch targets, persistent themes, and no horizontal overflow. See [the current report](validation/pinned-navigation.json) and scrolling examples in [desktop dark](screenshots/pinned-nav-desktop-dark.png) and [mobile dark](screenshots/pinned-nav-mobile-dark.png). Build, lint, all 25 existing tests, and six affected tests after the active-section adjustment passed.
- Product/contribution follow-up: Nen is featured as a published product rather than a workbench entry; open PRs are excluded from the presentation while the original snapshot is preserved. Both themes passed at 320, 390, 768, 1280, 1440, and 1920px plus 320×480, including all completed-repository filters, expansion, accurate statuses/counts, Nen destinations, keyboard action clearance, and no overflow or page errors. See [the behavior/layout report](validation/nen-completed-contributions.json), [accessibility report](validation/nen-completed-accessibility.json), [Nen desktop light](screenshots/nen-product-light.png), [Nen desktop dark](screenshots/nen-product-dark.png), [Nen mobile light](screenshots/nen-mobile-light.png), [Nen mobile dark](screenshots/nen-mobile-dark.png), and [completed contributions](screenshots/completed-prs-desktop-light.png). Scoped accessibility checks reported no WCAG A/AA violations in either theme at 320 and 1440px, including each mobile repository selector when scrolled into view.
- Nen styling refinement: implemented the agreed small changes without changing content or placement. Heading matches the other features at 35px desktop / 30px mobile; the original icon is 72px / 64px, with a compact 24px cover phrase. Benefits wrap in a metadata-style row; both actions use the existing 44px inline-link treatment. Both themes passed at 320, 390, 768, and 1440px plus 320×480 and 640×450, including keyboard clearance, native details/theme-state preservation, real destinations, and no overflow. All 27 tests, lint, and build passed; eight scoped accessibility scans found zero violations or incomplete checks. See [behavior/layout](validation/nen-refinement.json), [accessibility](validation/nen-refinement-accessibility.json), and all four features together in [light](screenshots/work-refined-light.png) / [dark](screenshots/work-refined-dark.png). Current Nen captures: [desktop light](screenshots/nen-refined-product-light.png), [desktop dark](screenshots/nen-refined-product-dark.png), [mobile light](screenshots/nen-refined-mobile-light.png), [mobile dark](screenshots/nen-refined-mobile-dark.png).
- Merged-only follow-up: removed closed PRs from the visible selection as well as previously hidden open PRs. Derived rows, repository options/counts, summary, and hero proof now reflect 11 merges across 6 repositories. Raw generated records and curated exclusions are unchanged. Build, lint, and all 27 tests passed. Both themes passed at 320, 390, and 1440px plus 320×480, including every repository filter, expansion/reset, preserved expansion across theme changes, real evidence links, and no overflow or page errors. See [the current report](validation/merged-only.json), [desktop light](screenshots/merged-only-desktop-light.png), [desktop dark](screenshots/merged-only-desktop-dark.png), [mobile light](screenshots/merged-only-mobile-light.png), and [mobile dark](screenshots/merged-only-mobile-dark.png).
- Production dock feedback: matched the committed/live hover scale 1.18/lift 8px, neighboring scale 1.08/lift 4px, spring stiffness 400/damping 28, and press scale 0.92 while preserving the current shell dimensions. Both themes passed seven profiles at 320, 390, 640, 768, and 1440px, including short screens, coarse pointers, and reduced motion. Shell bounds remain stable, keyboard tooltips and footer mute stay reachable, and scoped dock/footer Axe checks reported zero violations. Native Web Audio instrumentation passed nine scenarios for the exact production signal, gesture gating, throttle, cleanup, mute/reload, keyboard reenable, and touch/reduced-motion behavior, with no console/page errors. Audio was verified through API instrumentation, not human listening. See [motion/layout/accessibility](validation/dock-feedback.json), [native audio](validation/dock-audio.json), [hover light](screenshots/dock-hover-light.png), [hover dark](screenshots/dock-hover-dark.png), [mobile dark](screenshots/dock-mobile-dark.png), and [footer sound control](screenshots/dock-sound-footer-light.png).
- Audio playback correction: removed the extra gesture and motion gates that suppressed production hover feedback. The first blocked request now survives resume, trusted input retries pending browser initialization, and repeated blocked hovers coalesce to one tick. Enabling sound previews the original tone. All 41 tests, lint, and build passed. Eleven native Chromium scenarios passed under normal autoplay policy, covering both themes, narrow screens, reduced motion, first touch/keyboard actions, persisted mute, re-enable preview, pending cancellation, and node cleanup. A native analyser measured nonzero rendered waveform with the production sine frequency/gain/duration; there were no page or console errors. No physical listening was performed. See [the playback report](validation/dock-audio-playback.json). The earlier audio report records the initial implementation before this correction.
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
