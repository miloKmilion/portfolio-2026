# Portfolio 2026 — Camilo Perez Romero

Data Science & Bioinformatics portfolio. Designed in [Stitch](https://stitch.withgoogle.com/), built with Vite + React + TypeScript + Tailwind v4. Deployed on Vercel.

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (theme tokens live in `src/index.css` under `@theme`)
- **react-router-dom** for client-side routing
- **Playfair Display** (display) + **JetBrains Mono** (body/labels) loaded via Google Fonts
- **Material Symbols Outlined** for icons

## Scripts

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Layout

```
src/
├── components/      # Layout primitives (TopNav, Footer, SiteLayout)
├── pages/           # Route-level views (Home, About, Projects, Experience)
├── App.tsx          # Route table
├── main.tsx         # App entry
└── index.css        # Tailwind v4 + design tokens (@theme)
```

## Design tokens

All Stitch design-system tokens (colors, spacing, type scale) are declared as CSS custom properties inside `@theme { … }` in `src/index.css`. They are emitted by Tailwind v4 as utility classes — e.g. `bg-background`, `text-on-surface-variant`, `px-margin-edge`, `text-display-lg`.

To pull the latest design from Stitch:
1. Use the Stitch MCP server to fetch screen HTML.
2. Update tokens in `src/index.css` if the design system changed.
3. Translate markup into the existing pages/components.

## Deploy

Vercel auto-detects the Vite framework. `vercel.json` adds a SPA rewrite so client routes (`/about`, `/projects`, `/experience`) survive a hard refresh.
