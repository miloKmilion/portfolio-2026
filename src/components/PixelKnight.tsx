import { useEffect, useRef, useState } from 'react'
import dogIdle from '@/assets/pets/dog_idle.gif'
import dogWalk from '@/assets/pets/dog_walk.gif'

type WanderState = 'idle' | 'walking'

function useWander(speed = 0.004) {
  const [x, setX] = useState(() => 20 + Math.random() * 60)
  const [state, setState] = useState<WanderState>('idle')
  const [facingLeft, setFacingLeft] = useState(false)
  const rafRef = useRef<number>(0)
  const stateRef = useRef({ x: 50, targetX: 50, state: 'idle' as WanderState, idleTimer: 0, facingLeft: false })

  useEffect(() => {
    stateRef.current.x = 20 + Math.random() * 60
    let lastTime = performance.now()

    function pickNewTarget() {
      const s = stateRef.current
      s.targetX = 8 + Math.random() * 84
      s.state = 'walking'
      s.facingLeft = s.targetX < s.x
    }

    function startIdle() {
      const s = stateRef.current
      s.state = 'idle'
      s.idleTimer = 3000 + Math.random() * 5000
    }

    startIdle()

    function tick(now: number) {
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      const s = stateRef.current

      if (s.state === 'idle') {
        s.idleTimer -= dt
        if (s.idleTimer <= 0) pickNewTarget()
      } else {
        const diff = s.targetX - s.x
        if (Math.abs(diff) < 0.3) {
          s.x = s.targetX
          startIdle()
        } else {
          s.x += Math.sign(diff) * speed * dt
          s.facingLeft = diff < 0
        }
      }

      setX(s.x)
      setState(s.state)
      setFacingLeft(s.facingLeft)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed])

  return { x, state, facingLeft }
}

export function PixelKnight() {
  const knight = useWander(0.004)
  const dog = useWander(0.005)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    let timer = 0
    let lastTime = performance.now()
    let f = 0
    let raf: number

    function tick(now: number) {
      timer += now - lastTime
      lastTime = now
      if (timer > 200) {
        timer = 0
        f = (f + 1) % 4
        setFrame(f)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div
        className="absolute bottom-2 z-20 cursor-pointer"
        style={{
          left: `${knight.x}%`,
          transform: `translateX(-50%) scaleX(${knight.facingLeft ? -1 : 1})`,
        }}
        title="A tiny knight wanders..."
      >
        <KnightSprite frame={frame} state={knight.state} />
      </div>

      <div
        className="absolute bottom-2 z-20 cursor-pointer"
        style={{
          left: `${dog.x}%`,
          transform: `translateX(-50%) scaleX(${dog.facingLeft ? -1 : 1})`,
        }}
        title="A loyal companion"
      >
        <img
          src={dog.state === 'walking' ? dogWalk : dogIdle}
          alt=""
          className="h-[36px]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </>
  )
}

const P = 3

function Px({ x, y, c }: { x: number; y: number; c: string }) {
  return <rect x={x * P} y={y * P} width={P} height={P} fill={c} />
}

function KnightSprite({ frame, state }: { frame: number; state: WanderState }) {
  const isWalking = state === 'walking'
  const bob = isWalking && (frame === 1 || frame === 3) ? -1 : 0
  const legL = isWalking ? (frame % 2 === 0 ? 0 : 1) : 0
  const legR = isWalking ? (frame % 2 === 0 ? 1 : 0) : 0

  return (
    <svg width={18 * P} height={20 * P} viewBox={`0 0 ${18 * P} ${20 * P}`} className="image-rendering-pixelated">
      <g transform={`translate(0, ${bob * P})`}>
        {/* === RED PLUME === */}
        <Px x={11} y={0} c="#cc2233" />
        <Px x={12} y={0} c="#dd3344" />
        <Px x={13} y={0} c="#cc2233" />
        <Px x={12} y={1} c="#cc2233" />
        <Px x={13} y={1} c="#bb1a28" />
        <Px x={14} y={1} c="#aa1520" />
        <Px x={13} y={2} c="#cc2233" />
        <Px x={14} y={2} c="#bb1a28" />

        {/* === HELMET - big round dome === */}
        {/* Row 1 - top of dome */}
        <Px x={6} y={1} c="#2a2a2a" />
        <Px x={7} y={1} c="#2a2a2a" />
        <Px x={8} y={1} c="#2a2a2a" />
        <Px x={9} y={1} c="#2a2a2a" />
        <Px x={10} y={1} c="#2a2a2a" />
        <Px x={11} y={1} c="#2a2a2a" />

        {/* Row 2 */}
        <Px x={5} y={2} c="#2a2a2a" />
        <Px x={6} y={2} c="#999999" />
        <Px x={7} y={2} c="#bbbbbb" />
        <Px x={8} y={2} c="#cccccc" />
        <Px x={9} y={2} c="#dddddd" />
        <Px x={10} y={2} c="#cccccc" />
        <Px x={11} y={2} c="#aaaaaa" />
        <Px x={12} y={2} c="#2a2a2a" />

        {/* Row 3 */}
        <Px x={4} y={3} c="#2a2a2a" />
        <Px x={5} y={3} c="#999999" />
        <Px x={6} y={3} c="#bbbbbb" />
        <Px x={7} y={3} c="#cccccc" />
        <Px x={8} y={3} c="#dddddd" />
        <Px x={9} y={3} c="#eeeeee" />
        <Px x={10} y={3} c="#dddddd" />
        <Px x={11} y={3} c="#cccccc" />
        <Px x={12} y={3} c="#aaaaaa" />
        <Px x={13} y={3} c="#888888" />
        <Px x={14} y={3} c="#2a2a2a" />

        {/* Row 4 */}
        <Px x={3} y={4} c="#2a2a2a" />
        <Px x={4} y={4} c="#888888" />
        <Px x={5} y={4} c="#aaaaaa" />
        <Px x={6} y={4} c="#cccccc" />
        <Px x={7} y={4} c="#dddddd" />
        <Px x={8} y={4} c="#eeeeee" />
        <Px x={9} y={4} c="#eeeeee" />
        <Px x={10} y={4} c="#eeeeee" />
        <Px x={11} y={4} c="#dddddd" />
        <Px x={12} y={4} c="#cccccc" />
        <Px x={13} y={4} c="#999999" />
        <Px x={14} y={4} c="#777777" />
        <Px x={15} y={4} c="#2a2a2a" />

        {/* Row 5 - widest */}
        <Px x={3} y={5} c="#2a2a2a" />
        <Px x={4} y={5} c="#888888" />
        <Px x={5} y={5} c="#bbbbbb" />
        <Px x={6} y={5} c="#cccccc" />
        <Px x={7} y={5} c="#dddddd" />
        <Px x={8} y={5} c="#eeeeee" />
        <Px x={9} y={5} c="#eeeeee" />
        <Px x={10} y={5} c="#eeeeee" />
        <Px x={11} y={5} c="#dddddd" />
        <Px x={12} y={5} c="#cccccc" />
        <Px x={13} y={5} c="#aaaaaa" />
        <Px x={14} y={5} c="#777777" />
        <Px x={15} y={5} c="#2a2a2a" />

        {/* Row 6 - start of visor */}
        <Px x={2} y={6} c="#2a2a2a" />
        <Px x={3} y={6} c="#777777" />
        <Px x={4} y={6} c="#aaaaaa" />
        <Px x={5} y={6} c="#bbbbbb" />
        <Px x={6} y={6} c="#2a2a2a" />
        <Px x={7} y={6} c="#555555" />
        <Px x={8} y={6} c="#2a2a2a" />
        <Px x={9} y={6} c="#555555" />
        <Px x={10} y={6} c="#2a2a2a" />
        <Px x={11} y={6} c="#555555" />
        <Px x={12} y={6} c="#2a2a2a" />
        <Px x={13} y={6} c="#999999" />
        <Px x={14} y={6} c="#666666" />
        <Px x={15} y={6} c="#2a2a2a" />

        {/* Row 7 - visor middle */}
        <Px x={2} y={7} c="#2a2a2a" />
        <Px x={3} y={7} c="#777777" />
        <Px x={4} y={7} c="#999999" />
        <Px x={5} y={7} c="#aaaaaa" />
        <Px x={6} y={7} c="#2a2a2a" />
        <Px x={7} y={7} c="#444444" />
        <Px x={8} y={7} c="#2a2a2a" />
        <Px x={9} y={7} c="#444444" />
        <Px x={10} y={7} c="#2a2a2a" />
        <Px x={11} y={7} c="#444444" />
        <Px x={12} y={7} c="#2a2a2a" />
        <Px x={13} y={7} c="#888888" />
        <Px x={14} y={7} c="#666666" />
        <Px x={15} y={7} c="#2a2a2a" />

        {/* Row 8 - visor bottom */}
        <Px x={2} y={8} c="#2a2a2a" />
        <Px x={3} y={8} c="#666666" />
        <Px x={4} y={8} c="#999999" />
        <Px x={5} y={8} c="#aaaaaa" />
        <Px x={6} y={8} c="#2a2a2a" />
        <Px x={7} y={8} c="#555555" />
        <Px x={8} y={8} c="#2a2a2a" />
        <Px x={9} y={8} c="#555555" />
        <Px x={10} y={8} c="#2a2a2a" />
        <Px x={11} y={8} c="#555555" />
        <Px x={12} y={8} c="#2a2a2a" />
        <Px x={13} y={8} c="#888888" />
        <Px x={14} y={8} c="#555555" />
        <Px x={15} y={8} c="#2a2a2a" />

        {/* Row 9 - lower helmet */}
        <Px x={3} y={9} c="#2a2a2a" />
        <Px x={4} y={9} c="#777777" />
        <Px x={5} y={9} c="#999999" />
        <Px x={6} y={9} c="#aaaaaa" />
        <Px x={7} y={9} c="#bbbbbb" />
        <Px x={8} y={9} c="#bbbbbb" />
        <Px x={9} y={9} c="#bbbbbb" />
        <Px x={10} y={9} c="#aaaaaa" />
        <Px x={11} y={9} c="#999999" />
        <Px x={12} y={9} c="#888888" />
        <Px x={13} y={9} c="#666666" />
        <Px x={14} y={9} c="#2a2a2a" />

        {/* Row 10 - helmet bottom */}
        <Px x={4} y={10} c="#2a2a2a" />
        <Px x={5} y={10} c="#666666" />
        <Px x={6} y={10} c="#888888" />
        <Px x={7} y={10} c="#999999" />
        <Px x={8} y={10} c="#999999" />
        <Px x={9} y={10} c="#999999" />
        <Px x={10} y={10} c="#888888" />
        <Px x={11} y={10} c="#777777" />
        <Px x={12} y={10} c="#555555" />
        <Px x={13} y={10} c="#2a2a2a" />

        {/* === BODY - tiny below helmet === */}
        {/* Row 11 - neck/collar red */}
        <Px x={6} y={11} c="#2a2a2a" />
        <Px x={7} y={11} c="#aa2222" />
        <Px x={8} y={11} c="#cc3333" />
        <Px x={9} y={11} c="#cc3333" />
        <Px x={10} y={11} c="#aa2222" />
        <Px x={11} y={11} c="#2a2a2a" />

        {/* Row 12 - torso */}
        <Px x={6} y={12} c="#2a2a2a" />
        <Px x={7} y={12} c="#888888" />
        <Px x={8} y={12} c="#aaaaaa" />
        <Px x={9} y={12} c="#aaaaaa" />
        <Px x={10} y={12} c="#888888" />
        <Px x={11} y={12} c="#2a2a2a" />

        {/* Row 13 - torso */}
        <Px x={6} y={13} c="#2a2a2a" />
        <Px x={7} y={13} c="#777777" />
        <Px x={8} y={13} c="#999999" />
        <Px x={9} y={13} c="#999999" />
        <Px x={10} y={13} c="#777777" />
        <Px x={11} y={13} c="#2a2a2a" />

        {/* Row 14 - belt */}
        <Px x={6} y={14} c="#2a2a2a" />
        <Px x={7} y={14} c="#555555" />
        <Px x={8} y={14} c="#666666" />
        <Px x={9} y={14} c="#666666" />
        <Px x={10} y={14} c="#555555" />
        <Px x={11} y={14} c="#2a2a2a" />

        {/* === SWORD - horizontal, held left === */}
        <Px x={0} y={12} c="#cccccc" />
        <Px x={1} y={12} c="#dddddd" />
        <Px x={2} y={12} c="#eeeeee" />
        <Px x={3} y={12} c="#ffffff" />
        <Px x={4} y={12} c="#eeeeee" />
        <Px x={5} y={12} c="#dddddd" />

        <Px x={0} y={13} c="#aaaaaa" />
        <Px x={1} y={13} c="#bbbbbb" />
        <Px x={2} y={13} c="#cccccc" />
        <Px x={3} y={13} c="#dddddd" />
        <Px x={4} y={13} c="#cccccc" />
        <Px x={5} y={13} c="#bbbbbb" />

        {/* Sword guard */}
        <Px x={5} y={11} c="#555555" />
        <Px x={5} y={14} c="#555555" />

        {/* Sword handle */}
        <Px x={5} y={12} c="#aa2222" />
        <Px x={5} y={13} c="#882222" />

        {/* === ARM holding sword (right side) === */}
        <Px x={12} y={12} c="#888888" />
        <Px x={12} y={13} c="#777777" />
      </g>

      {/* === LEGS === */}
      <g transform={`translate(${legL * P}, ${bob * P})`}>
        <Px x={7} y={15} c="#2a2a2a" />
        <Px x={7} y={16} c="#555555" />
        <Px x={7} y={17} c="#2a2a2a" />
        <Px x={6} y={17} c="#2a2a2a" />
      </g>
      <g transform={`translate(${legR * P}, ${bob * P})`}>
        <Px x={10} y={15} c="#2a2a2a" />
        <Px x={10} y={16} c="#555555" />
        <Px x={10} y={17} c="#2a2a2a" />
        <Px x={11} y={17} c="#2a2a2a" />
      </g>
    </svg>
  )
}
