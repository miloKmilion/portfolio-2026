# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Camilo Perez Romero (Data Science & Bioinformatics). Designed in Stitch (Google's design tool), built with Vite 7 + React 19 + TypeScript + Tailwind CSS v4. Deployed on Vercel.

## Commands

```bash
npm run dev        # Dev server at localhost:5173
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Serve production build locally
```

No test framework is configured.

## Architecture

- **Routing**: react-router-dom with `BrowserRouter`. Route table in `src/App.tsx`, all routes nested under `SiteLayout`.
- **Layout**: `SiteLayout` wraps every page with `TopNav`, `<Outlet />`, and `Footer`. Pages render inside the outlet.
- **Pages**: `src/pages/` — one component per route (`HomePage`, `AboutPage`, `ProjectsPage`, `ExperiencePage`).
- **Path alias**: `@` maps to `src/` (configured in `vite.config.ts`).
- **SPA routing**: `vercel.json` rewrites all paths to `/` so client-side routes work on hard refresh.

## Interactive Components (HomePage)

- **MetaballCanvas** (`src/components/MetaballCanvas.tsx`): Canvas 2D animated blobs with lifecycle (fadein/alive/fadeout/dead), palette cycling, mouse attraction. Initial blobs start staggered to avoid bounce on load.
- **PixelKnight** (`src/components/PixelKnight.tsx`): SVG pixel-art knight + dog companion using `useWander` hook for patrol AI. Knight is chibi-proportioned with oversized helmet.
- **GitGraph** (`src/components/GitGraph.tsx`): Git-graph-style visualization of core competencies. Left-aligned SVG trunk with bio/product branches. Hover nodes to reveal detail cards (overlay). Right column contains the PetPlayground.
- **PetPlayground** (`src/components/PetPlayground.tsx`): Interactive pet sandbox. Users add pets (dog, cat, cockatiel, crab, duck, clippy) and throw balls with click. Ball physics (gravity + bounce). Score tracks thrown/caught. Max 6 pets.
- **Pet sprites**: `src/assets/pets/` — GIF sprites from vscode-pets (MIT licensed). Each pet has idle, walk, and ball variants.

## Design System

All tokens live in `src/index.css` under `@theme { ... }` — colors, spacing, type scale, radii, fonts. Tailwind v4 generates utilities from these automatically (e.g. `bg-background`, `text-primary`, `px-margin-edge`, `text-display-lg`).

- **Fonts**: Playfair Display (display/headings), JetBrains Mono (body/labels/mono)
- **Icons**: Material Symbols Outlined (loaded via Google Fonts, use `<span class="material-symbols-outlined">icon_name</span>`)
- **Dark-only**: The palette is a single dark theme; no light mode toggle exists.

When updating the design, pull tokens from Stitch and update `@theme` in `src/index.css` first, then update components.

## Ideas / Backlog

- [x] Animated metaball hero background
- [x] Letter-by-letter text reveal animation
- [x] Pixel knight + dog companion wandering hero
- [x] Git-graph competencies section with hover cards
- [x] Pet playground (add pets, throw balls, score)
- [ ] Click knight to open chatbot/Q&A
- [ ] Mobile pet playground support
