# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal tools collection hosted at https://tools.sijiaoh.com — a static, no-backend frontend built with **Astro** and deployed to **GitHub Pages**. Each "tool" is a self-contained mini-app (converter, calculator, generator, etc.) reachable from a single index page.

Single-user project (sijiaoh). Optimise for:
1. **Simplicity over flexibility** — no accounts, tenancy, i18n machinery, or feature flags.
2. **Maintenance cost** — adding or removing a tool should touch the fewest files possible.
3. **Fully static** — no backend, no first-party API, no build-time secrets. Persist per-tool state in `localStorage` if needed.

## Commands

Standard Astro scripts (defined in `package.json`):

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — produce static output in `dist/`
- `npm run preview` — serve the built output locally
- `npx astro check` — type-check `.astro` files and TS
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode

## Testing

Tests use **Vitest**. The framework was chosen for native Vite/Astro integration and ESM/TypeScript support out of the box.

### What to test

Follow the test pyramid — prefer unit tests over integration and E2E:

1. **Unit tests (primary focus)** — Pure business logic, data transformations, utility functions. These are fast, reliable, and cheap to maintain.
2. **Component tests (selective)** — Astro components via Container API when component logic is non-trivial.
3. **E2E tests (minimal)** — Only for critical user flows that can't be verified otherwise.

Test files live next to source files: `src/pages/<slug>/_lib/foo.ts` → `src/pages/<slug>/_lib/foo.test.ts`.

### What NOT to test

- Browser APIs you don't control (File API, canvas internals, Web Workers)
- Framework behavior (Astro rendering, hydration)
- Simple pass-through code with no logic
- Third-party library internals

If a test requires complex mocks to work, reconsider whether the test is valuable. Extract pure functions from browser-dependent code instead of mocking the browser.

### Key principles

- **Coverage is not a goal.** Meaningful tests of critical logic beat high coverage numbers. Don't chase percentages.
- **Test behavior, not implementation.** Focus on what the code does, not how it does it internally.
- **Extract testable logic.** Separate pure functions from browser-dependent code. Test the pure functions; trust the browser APIs.
- **Keep tests simple.** If a test is harder to understand than the code it tests, something is wrong.

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
