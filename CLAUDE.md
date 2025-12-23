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

- `docs/` is in `.gitignore` - do NOT commit built files locally
- GitHub Actions (`.github/workflows/build.yml`) automatically:
  1. Triggers on pushes to `src/`, `layouts/`, `partials/`, or template files
  2. Runs `npm run build:once`
  3. Commits the generated `docs/` folder
- Only commit source file changes; CI handles the build output
- GitHub Pages serves from the `docs/` directory
