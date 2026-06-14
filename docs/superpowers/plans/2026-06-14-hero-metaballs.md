# Hero Metaballs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static hero section with an animated metaball canvas background + letter-by-letter text entrance to make the landing page feel alive and playful.

**Architecture:** A standalone `MetaballCanvas` component handles all canvas rendering and mouse tracking via refs. The `HomePage` hero section is rewritten to layer the canvas behind minimal animated text (name + tagline + CTAs). No external dependencies — pure Canvas 2D + CSS animations.

**Tech Stack:** React 19, Canvas 2D API, CSS keyframes, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/MetaballCanvas.tsx` | Create | Canvas rendering, blob physics, mouse interaction, animation loop |
| `src/pages/HomePage.tsx` | Modify (lines 30–75) | Replace hero markup with MetaballCanvas + animated text + CTAs |
| `src/index.css` | Modify | Add letter-reveal keyframe + CTA fade-in keyframe |

---

### Task 1: MetaballCanvas Component — Core Rendering

**Files:**
- Create: `src/components/MetaballCanvas.tsx`

- [ ] **Step 1: Create the component with canvas ref and resize handling**

```tsx
import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  phase: number
  speed: number
}

export function MetaballCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<Blob[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = canvas!.offsetWidth * dpr
      canvas!.height = canvas!.offsetHeight * dpr
      ctx!.scale(dpr, dpr)
    }

    function initBlobs() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      const count = 7
      blobsRef.current = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        radius: 80 + Math.random() * 120,
        phase: (i / count) * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      }))
    }

    resize()
    initBlobs()

    let resizeTimer: ReturnType<typeof setTimeout>
    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        initBlobs()
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    function draw() {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)
      time += 0.01

      const blobs = blobsRef.current
      const mouse = mouseRef.current

      for (const blob of blobs) {
        blob.x = blob.baseX + Math.sin(time * blob.speed + blob.phase) * 60
        blob.y = blob.baseY + Math.cos(time * blob.speed * 0.8 + blob.phase) * 40

        const dx = mouse.x - blob.x
        const dy = mouse.y - blob.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (1 - dist / 150) * 30
          blob.x += (dx / dist) * force
          blob.y += (dy / dist) * force
        }
      }

      for (const blob of blobs) {
        const gradient = ctx!.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        )
        gradient.addColorStop(0, 'rgba(167, 225, 255, 0.12)')
        gradient.addColorStop(0.5, 'rgba(134, 198, 229, 0.06)')
        gradient.addColorStop(1, 'rgba(167, 225, 255, 0)')

        ctx!.beginPath()
        ctx!.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx!.fillStyle = gradient
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden
    />
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/MetaballCanvas.tsx
git commit -m "feat: add MetaballCanvas component with blob physics and mouse interaction"
```

---

### Task 2: CSS Keyframes for Text and CTA Animations

**Files:**
- Modify: `src/index.css` (append to `@layer components`)

- [ ] **Step 1: Add letter-reveal and CTA fade-in keyframes**

Append inside the existing `@layer components { ... }` block in `src/index.css`:

```css
  .letter-reveal span {
    display: inline-block;
    opacity: 0;
    filter: blur(4px);
    animation: letterIn 0.4s ease forwards;
  }

  @keyframes letterIn {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  .cta-fade-in {
    opacity: 0;
    transform: translateY(12px);
    animation: ctaIn 0.6s ease forwards;
    animation-delay: 1s;
  }

  @keyframes ctaIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add letter-reveal and CTA fade-in CSS keyframes"
```

---

### Task 3: Rewrite Hero Section in HomePage

**Files:**
- Modify: `src/pages/HomePage.tsx` (lines 30–75, the hero `<header>` element)

- [ ] **Step 1: Add a helper component for animated text at the top of HomePage.tsx**

Add above the `HomePage` function:

```tsx
function AnimatedText({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="letter-reveal">
      {[...text].map((char, i) => (
        <span
          key={i}
          style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
```

- [ ] **Step 2: Add the MetaballCanvas import**

Add to imports at the top:

```tsx
import { MetaballCanvas } from '@/components/MetaballCanvas'
```

- [ ] **Step 3: Replace the hero `<header>` block (lines 34–75)**

Replace the entire `{/* Hero */} <header>...</header>` block with:

```tsx
      {/* Hero */}
      <header className="relative min-h-[85vh] flex items-center justify-center px-margin-edge overflow-hidden border-b border-outline-variant">
        <MetaballCanvas />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
            <AnimatedText text="Camilo Perez" baseDelay={0.2} />
          </h1>
          <p className="font-mono text-body-lg text-on-surface-variant">
            <AnimatedText text="biology × computation × design" baseDelay={0.8} />
          </p>
          <div className="cta-fade-in pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#stack"
              className="group flex items-center gap-4 border border-primary px-8 py-4 font-mono text-label-caps tracking-[0.1em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <span>Explore Architecture</span>
              <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <Link
              to="/projects"
              className="group flex items-center gap-4 border border-outline-variant px-8 py-4 font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300"
            >
              <span>Selected Work</span>
              <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                north_east
              </span>
            </Link>
          </div>
        </div>
      </header>
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Run dev server and verify visually**

Run: `npm run dev`
Expected: Open http://localhost:5173, hero shows animated blobs in background, text reveals letter by letter, CTAs fade in after ~1s, mouse interaction moves blobs.

- [ ] **Step 6: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: replace static hero with animated metaball canvas and letter-reveal text"
```

---

### Task 4: Final Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: TypeScript check passes, Vite builds to `dist/` with no errors.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No errors. If lint flags unused vars from removed code, clean them up.

- [ ] **Step 3: Preview production build**

Run: `npm run preview`
Expected: Open http://localhost:4173, hero renders identically to dev mode. Animations smooth, no jank.

- [ ] **Step 4: Final commit if any lint fixes were needed**

```bash
git add -A
git commit -m "fix: address lint issues from hero refactor"
```
