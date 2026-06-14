# Hero Section — Organic Metaballs

## Overview

Replace the current static, text-heavy hero with an animated Canvas 2D metaball background and letter-by-letter text entrance. The goal is to make the landing page feel alive and playful while keeping it lightweight (zero dependencies).

## Background Canvas

- Full-viewport `<canvas>` element positioned absolute behind hero content
- 5–8 blob shapes using a metaball threshold function (smooth merging/splitting)
- Colors from existing palette: `--color-primary` (#a7e1ff) and `--color-primary-container` (#86c6e5) at 10–15% opacity
- Blobs drift autonomously with smooth sine-based motion
- **Mouse interaction**: blobs within ~150px of cursor are attracted/repelled with eased interpolation
- Render loop via `requestAnimationFrame`, targeting 60fps
- Canvas resizes on window resize (debounced)
- On mobile/touch: blobs drift only (no pointer tracking), or optionally react to touch position

## Text Layer

- Centered vertically and horizontally on top of canvas
- **Name**: "Camilo Perez" — Playfair Display, `text-display-lg-mobile` / `md:text-display-lg`, color `primary`
- **Tagline**: "biology × computation × design" — JetBrains Mono, `text-body-lg`, color `on-surface-variant`
- **Entrance animation**: letter-by-letter reveal with `filter: blur(4px)` → `blur(0)` + opacity 0→1, 40ms stagger per character. Tagline begins after name completes.

## CTAs

- Two buttons: "Explore Architecture" (anchor to #stack) + "Selected Work" (Link to /projects)
- Fade-in with translateY after text animation completes (~1s delay)
- Retain existing button styles

## Removals from Current Hero

- Badge pill ("Computational Biology & Data Architecture")
- Long paragraph description
- Radial gradient overlay (`bg-[radial-gradient(...)]`)

## Retained

- `min-h-[85vh]`, `overflow-hidden`, `border-b border-outline-variant`
- The two CTA buttons and their routing
- Responsive padding (`px-margin-edge`)

## File Structure

- `src/components/MetaballCanvas.tsx` — canvas component with animation logic
- `src/pages/HomePage.tsx` — updated hero section using MetaballCanvas + animated text

## Performance Considerations

- Canvas draws only blobs (simple circles + threshold), no complex shaders
- Use `will-change: transform` on text container during entrance, remove after
- Pause animation when tab is not visible (`document.hidden`)
- No external dependencies — pure Canvas 2D API + React refs
