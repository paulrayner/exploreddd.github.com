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