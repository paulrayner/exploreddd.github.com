# CLAUDE.md

## Project Overview
Static website for Explore DDD Conference built with Metalsmith. Source files in `src/` are processed and output to `docs/` directory.

## Commands
- `npm install` - Install dependencies
- `npm run build` - Build site with live reload and file watching
- Serve built site: `live-server docs`

## Architecture
- Metalsmith static site generator
- Handlebars templating (layouts/, partials/)
- Sass compilation for CSS
- Source: `src/`, Output: `docs/`

## Deployment Workflow

- **NEVER commit `docs/` files locally.** Although `docs/` is tracked in git (not gitignored), it is built and committed exclusively by GitHub Actions. Local builds will show `docs/` as modified; always discard those changes with `git checkout -- docs/` before committing.
- GitHub Actions (`.github/workflows/build.yml`) automatically:
  1. Triggers on pushes to `src/`, `layouts/`, `partials/`, or template files
  2. Runs `npm run build:once`
  3. Commits the generated `docs/` folder
- Only commit and push source file changes (`src/`, `layouts/`, `partials/`, `src/css/`); CI handles the build output
- GitHub Pages serves from the `docs/` directory

## Navigation

- **Two nav partials must stay in sync:** `partials/nav.hbs` (homepage) and `partials/nav-tier2.hbs` (sub-pages). They contain the same link list but with different path prefixes (`cfp/` vs `../cfp/`).
- The `../` relative paths in `nav-tier2.hbs` are intentional: archive year pages (e.g. `/2025/about/`) rely on them to link within their own year. Do NOT replace with absolute paths.
- When adding or removing a nav link, update BOTH partials.

## Speakers & Workshops

**Speakers page (`src/speakers/index.html`) is data-driven.** The grid renders every speaker in `src/schedule/sessionize-speakers.json`, joined to `src/schedule/sessionize-sessions.json`. To add or update a speaker, refresh those two snapshots from Sessionize: run `scripts/sessionize-fetch.sh` from the hub root. It writes the canonical pull to `../data/` in the `/All`-endpoint format the page expects (`session.speakers` as GUID strings, `categoryItems` as numbers), then copies both files into `src/schedule/` for you. Before copying it guards that every speaker GUID hard-coded in `src/schedule/index.html` (Eric's keynote, the panel, Indu's legacy session) still exists in the refreshed speaker set, aborting if a hand-added speaker fell out of `data/sessionize-extra-speakers.json`. After it runs, review the `src/schedule/` diff and push. Do NOT hand-copy the snapshots, and do NOT source from the public `/view/Sessions` endpoint; it returns speakers as objects and null `categoryItems`, which the page's JS does not understand.
- Two hardcoded maps in that page need a manual edit per workshop instructor: `WORKSHOP_LINKS` (gives the card its "Pre-Conference Workshop" badge and modal link) and `FEATURED_ORDER` (top-of-grid order). Add co-instructors here too.

**Workshop pages are hand-authored HTML**, not data-driven: the index (`src/workshops/index.html`) and one detail page per workshop. Adding an instructor means editing these by hand.

**Two-instructor workshops** use the staggered headshot pattern, not a vertical stack. Wrap both faces in `<div class="new-co-workshop-images">` with two child `<div>`s carrying inline `background-image` (CSS in `main.scss` sizes them to offset circles that read as a diagonal pair). Byline is `Name &amp; Name`. On the detail page, the "The Trainers" section gives each trainer a bold `<p><strong>Name</strong></p>` header above their bio. Mirror any change across the index row and the detail page.

- Speaker photos: the speakers grid uses the remote Sessionize `profilePicture` URL; the hand-authored workshop pages use a local copy in `src/img/speakers/`. Download new headshots locally (with `curl -L`) for the workshop pages. Square headshots (~400x400) framed with `background-size: cover` look right; the older `sprite-*.jpg` images are wide multi-frame sprites tuned for a fixed crop, so reuse a square full headshot rather than a sprite when sizing changes.
