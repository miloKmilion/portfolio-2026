import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  radius: number
  phase: number
  speed: number
  opacity: number
  hueOffset: number
  life: number
  maxLife: number
  state: 'fadein' | 'alive' | 'fadeout' | 'dead'
}

const PALETTE = [
  [167, 225, 255],
  [200, 180, 255],
  [180, 255, 220],
  [255, 200, 180],
  [140, 220, 255],
]

const MAX_BLOBS = 10
const FADE_SPEED = 0.003

function createBlob(w: number, h: number, startVisible = false): Blob {
  const phase = Math.random() * Math.PI * 2
  const baseX = Math.random() * w
  const baseY = Math.random() * h
  return {
    x: baseX,
    y: baseY,
    vx: 0,
    vy: 0,
    baseX,
    baseY,
    radius: 100 + Math.random() * 140,
    phase,
    speed: 0.15 + Math.random() * 0.2,
    opacity: startVisible ? 1 : 0,
    hueOffset: Math.random() * PALETTE.length,
    life: 0,
    maxLife: 600 + Math.random() * 800,
    state: startVisible ? 'alive' : 'fadein',
  }
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
      blobsRef.current = Array.from({ length: 6 }, (_, i) => {
        const blob = createBlob(w, h)
        blob.opacity = i * 0.15
        return blob
      })
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
    let spawnTimer = 0

    function draw() {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)
      time += 0.006
      spawnTimer++

      const blobs = blobsRef.current
      const mouse = mouseRef.current

      if (spawnTimer > 120 + Math.random() * 180 && blobs.length < MAX_BLOBS) {
        blobs.push(createBlob(w, h))
        spawnTimer = 0
      }

      for (const blob of blobs) {
        blob.life++

        if (blob.state === 'fadein') {
          blob.opacity = Math.min(1, blob.opacity + FADE_SPEED)
          if (blob.opacity >= 1) blob.state = 'alive'
        } else if (blob.state === 'alive') {
          if (blob.life > blob.maxLife) blob.state = 'fadeout'
        } else if (blob.state === 'fadeout') {
          blob.opacity = Math.max(0, blob.opacity - FADE_SPEED)
          if (blob.opacity <= 0) blob.state = 'dead'
        }

        const driftX = Math.sin(time * 0.12 + blob.phase * 3.1) * w * 0.35
        const driftY = Math.cos(time * 0.1 + blob.phase * 2.3) * h * 0.35
        const targetX = blob.baseX + driftX
          + Math.sin(time * blob.speed + blob.phase) * 80
        const targetY = blob.baseY + driftY
          + Math.cos(time * blob.speed * 0.7 + blob.phase) * 60

        const dx = mouse.x - blob.x
        const dy = mouse.y - blob.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isHovering = mouse.x > -9000

        let goalX = targetX
        let goalY = targetY

        if (isHovering) {
          const pull = Math.max(0, 1 - dist / 400)
          goalX = targetX + (mouse.x - targetX) * pull * 0.5
          goalY = targetY + (mouse.y - targetY) * pull * 0.5
        }

        blob.vx += (goalX - blob.x) * 0.008
        blob.vy += (goalY - blob.y) * 0.008
        blob.vx *= 0.96
        blob.vy *= 0.96
        blob.x += blob.vx
        blob.y += blob.vy
      }

      blobsRef.current = blobs.filter(b => b.state !== 'dead')

      for (const blob of blobsRef.current) {
        if (blob.opacity <= 0) continue

        const colorCycle = (time * 0.4 + blob.hueOffset) % PALETTE.length
        const idx = Math.floor(colorCycle)
        const t = colorCycle - idx
        const c1 = PALETTE[idx % PALETTE.length]
        const c2 = PALETTE[(idx + 1) % PALETTE.length]

        const r = Math.round(c1[0] + (c2[0] - c1[0]) * t)
        const g = Math.round(c1[1] + (c2[1] - c1[1]) * t)
        const b = Math.round(c1[2] + (c2[2] - c1[2]) * t)

        const fade = blob.opacity
        const pulse = 0.7 + Math.sin(time * 2 + blob.phase) * 0.15

        const gradient = ctx!.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        )
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.28 * fade * pulse})`)
        gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${0.18 * fade * pulse})`)
        gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${0.07 * fade * pulse})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

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
