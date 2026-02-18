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
