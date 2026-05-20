# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal tools collection hosted at https://tools.sijiaoh.com — a static, no-backend frontend built with **Astro** and deployed to **GitHub Pages**. Each "tool" is a self-contained mini-app (converter, calculator, generator, etc.) reachable from a single index page.

Single-user project (sijiaoh). Optimise for:
1. **Simplicity over flexibility** — no accounts, tenancy, i18n machinery, or feature flags.
2. **Maintenance cost** — adding or removing a tool should touch the fewest files possible.
3. **Fully static** — no backend, no first-party API, no build-time secrets. Persist per-tool state in `localStorage` if needed.

> The Astro project itself has not been scaffolded yet. When initialising it, follow the conventions below rather than accepting whatever the starter generates.

## Commands

Standard Astro scripts (defined in `package.json` once scaffolded):

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — produce static output in `dist/`
- `npm run preview` — serve the built output locally
- `npx astro check` — type-check `.astro` files and TS

There is no test suite by design; tools are small enough that manual verification in `dev` is the test. Don't add a runner unless a specific tool needs one.

## Architecture

### Tool layout

Each tool is a route under `src/pages/<slug>/index.astro` (URL: `/<slug>/`). Tool-private components, helpers and assets live under `src/pages/<slug>/_components/` or `_lib/` — the leading underscore tells Astro not to route them.

A single manifest at `src/tools.ts` exports `{ slug, title, description, tags? }[]`. The root `src/pages/index.astro` is generated from this manifest — **never hand-edit the index to add a tool**, only edit the manifest.

Shared cross-tool primitives (layout, header, footer, common UI) go in `src/layouts/` and `src/components/`. Resist extracting shared utilities prematurely — three similar tools is fine; abstract on the fourth.

### Interactivity / islands

Default to pure static `.astro` with zero client JS. Only introduce a UI framework component when a tool needs real interactivity, and apply the lightest hydration directive that works:

- `client:visible` / `client:idle` for tools below the fold or non-critical UI
- `client:load` only when the interactive element is the tool's primary content
- `client:only` for browser-API-dependent tools (canvas editors, file pickers, etc.)

Pick **one** framework if any is needed — don't mix React/Vue/Svelte across tools, each one ships its own runtime.

### Styling

Use Astro's scoped `<style>` blocks per component. No global CSS framework unless a tool genuinely justifies one; if you add one (e.g. Tailwind), scope the decision to that tool's PR and explain why in the commit.

## Deployment

Hosted on GitHub Pages at the custom domain `tools.sijiaoh.com`. Three things this depends on:

1. `public/CNAME` containing the single line `tools.sijiaoh.com`
2. `public/.nojekyll` (empty file) so GitHub Pages doesn't strip the `_astro/` build directory
3. `astro.config.mjs` with `site: 'https://tools.sijiaoh.com'` and **no `base`** (the site lives at the domain root, not a subpath)

CI/CD: `.github/workflows/deploy.yml` uses the official `withastro/action` on push to `main`. The action auto-detects the package manager from the lockfile — always commit the lockfile.

Apex DNS for `tools.sijiaoh.com` must be a `CNAME` to `sijiaoh.github.io` (configured outside this repo).
