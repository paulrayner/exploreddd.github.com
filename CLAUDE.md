# CLAUDE.md

## Project Overview
Static website for Explore DDD Conference built with Metalsmith. Source files in `src/` are processed and output to `docs/` directory.

## Commands
- `npm install` - Install dependencies
- `npm run build` - Build site and watch source/layouts/partials for changes (native Metalsmith watch; rebuilds `docs/` on save)
- `npm run build:once` - One-off build with no watch (what CI runs)
- Serve built site: `live-server docs` (provides browser live-reload when `docs/` changes)

## Architecture
- Metalsmith static site generator
- Handlebars templating (layouts/, partials/)
- Sass compilation for CSS
- Source: `src/`, Output: `docs/`

## Deployment Workflow

- **Only edit `src/`** (plus `layouts/`, `partials/`). `docs/` is a build output, never hand-edit it. It is gitignored and untracked; local builds regenerate it and those changes are ignored.
- GitHub Actions (`.github/workflows/build.yml`) automatically:
  1. Triggers on pushes to `src/`, `layouts/`, `partials/`, or template files
  2. Runs `npm run build:once` (Metalsmith, clean build) into `docs/`
  3. Uploads `docs/` as a Pages artifact and deploys it (`actions/deploy-pages`)
- **CI does NOT commit `docs/`.** The live site is a fresh clean build of `src/` served as a Pages artifact (Pages `build_type` is `workflow`), so stale files never reach production and the committed repo carries no build output. The custom domain survives clean builds via `src/CNAME`.
- Only commit and push source-file changes (`src/`, `layouts/`, `partials/`, `src/css/`).
- After pushing `src/`, wait for the Action (~1 min), then verify live rather than assuming.

## Navigation

- **Two nav partials must stay in sync:** `partials/nav.hbs` (homepage) and `partials/nav-tier2.hbs` (sub-pages). They contain the same link list but with different path prefixes (`cfp/` vs `../cfp/`).
- The `../` relative paths in `nav-tier2.hbs` are intentional: archive year pages (e.g. `/2025/about/`) rely on them to link within their own year. Do NOT replace with absolute paths.
- **Partners link is a deliberate exception to the sync rule.** `nav.hbs` uses `partners/` (the live route); `nav-tier2.hbs` uses `../sponsors/`. The page lives at `/partners/`, and `/sponsors/` is a redirect stub (`src/sponsors/index.html`, meta-refresh + canonical) pointing to it, kept so old `/sponsors/` links and SEO carry over. Archive years have `/YYYY/sponsors/` but no `/YYYY/partners/`, so `nav-tier2.hbs` must stay `../sponsors/` (current sub-pages then route through the redirect; archive pages resolve to their own year's sponsors page). Do NOT "sync" tier2 to `../partners/`; it 404s every archive page. The prospectus PDF lives at `src/partners/`.
- When adding or removing a nav link, update BOTH partials.

## Speakers & Workshops

**Speakers page (`src/speakers/index.html`) is data-driven.** The grid renders every speaker in `src/schedule/sessionize-speakers.json`, joined to `src/schedule/sessionize-sessions.json`. To add or update a speaker, refresh those two snapshots from Sessionize: run `scripts/sessionize-fetch.sh` from the hub root. It writes the canonical pull to `../data/` in the `/All`-endpoint format the page expects (`session.speakers` as GUID strings, `categoryItems` as numbers), then copies both files into `src/schedule/` for you. Before copying it guards that every speaker GUID hard-coded in `src/schedule/index.html` (Eric's keynote, the panel, Indu's legacy session) still exists in the refreshed speaker set, aborting if a hand-added speaker fell out of `data/sessionize-extra-speakers.json`. It also warns if any session's public abstract still contains CFP reviewer notes (Sessionize folds that field into `description`), and warns on workshop-bio drift (see below). After it runs, review the `src/schedule/` diff and push. Once CI has deployed, run `scripts/sessionize-verify-live.sh` to confirm the live schedule matches the local snapshot session-for-session. Do NOT hand-copy the snapshots, and do NOT source from the public `/view/Sessions` endpoint; it returns speakers as objects and null `categoryItems`, which the page's JS does not understand.
- **Field-level overrides survive a fetch.** When a speaker asks us to change how they're listed (title, talk name) but we're not round-tripping the edit through Sessionize, add it to `data/sessionize-overrides.json` (keyed by speaker GUID and session id). `sessionize-fetch.sh` applies it after the Sessionize pull and extra-speaker merge, patching `sessionize-speakers.json`, `sessionize-sessions.json`, and `sessionize-all.json` before the website copy. Sessionize stays authoritative for every field not listed; remove the entry once Sessionize itself is updated. This differs from `sessionize-extra-speakers.json`, which only fills gaps for speakers absent from Sessionize (e.g. Eric) and cannot override a live record.
- Two hardcoded maps in that page need a manual edit per workshop instructor: `WORKSHOP_LINKS` (gives the card its "Pre-Conference Workshop" badge and modal link) and `FEATURED_ORDER` (top-of-grid order). Add co-instructors here too.
- **Workshop bios are hand-authored** on the detail pages and can intentionally trim or reword the Sessionize bio. `sessionize-fetch.sh` runs `check-workshop-bio-sync.py` to flag drift. When a drift is deliberate, run `scripts/check-workshop-bio-sync.py --acknowledge` to record it in `scripts/.workshop-bio-drift-acknowledged.json`; it stays silent until either side of that bio pair changes, then re-surfaces.

**Workshop pages are hand-authored HTML**, not data-driven: the index (`src/workshops/index.html`) and one detail page per workshop. Adding an instructor means editing these by hand.

**Two-instructor workshops** use the staggered headshot pattern, not a vertical stack. Wrap both faces in `<div class="new-co-workshop-images">` with two child `<div>`s carrying inline `background-image` (CSS in `main.scss` sizes them to offset circles that read as a diagonal pair). Byline is `Name &amp; Name`. On the detail page, the "The Trainers" section gives each trainer a bold `<p><strong>Name</strong></p>` header above their bio. Mirror any change across the index row and the detail page.

- Speaker photos: the speakers grid uses the remote Sessionize `profilePicture` URL; the hand-authored workshop pages use a local copy in `src/img/speakers/`. Download new headshots locally (with `curl -L`) for the workshop pages. Square headshots (~400x400) framed with `background-size: cover` look right; the older `sprite-*.jpg` images are wide multi-frame sprites tuned for a fixed crop, so reuse a square full headshot rather than a sprite when sizing changes.
