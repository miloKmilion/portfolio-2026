import { useState, useEffect, useRef, useCallback } from 'react'

import dogIdle from '@/assets/pets/dog_idle.gif'
import dogWalk from '@/assets/pets/dog_walk.gif'
import dogBall from '@/assets/pets/dog_ball.gif'
import catIdle from '@/assets/pets/cat_idle.gif'
import catWalk from '@/assets/pets/cat_walk.gif'
import catBall from '@/assets/pets/cat_ball.gif'
import cockatielIdle from '@/assets/pets/cockatiel_idle.gif'
import cockatielWalk from '@/assets/pets/cockatiel_walk.gif'
import cockatielBall from '@/assets/pets/cockatiel_ball.gif'
import crabIdle from '@/assets/pets/crab_idle.gif'
import crabWalk from '@/assets/pets/crab_walk.gif'
import crabBall from '@/assets/pets/crab_ball.gif'
import duckIdle from '@/assets/pets/duck_idle.gif'
import duckWalk from '@/assets/pets/duck_walk.gif'
import duckBall from '@/assets/pets/duck_ball.gif'
import clippyIdle from '@/assets/pets/clippy_idle.gif'
import clippyWalk from '@/assets/pets/clippy_walk.gif'
import clippyBall from '@/assets/pets/clippy_ball.gif'

const PET_TYPES = {
  dog: { idle: dogIdle, walk: dogWalk, ball: dogBall, label: 'Dog' },
  cat: { idle: catIdle, walk: catWalk, ball: catBall, label: 'Cat' },
  cockatiel: { idle: cockatielIdle, walk: cockatielWalk, ball: cockatielBall, label: 'Cockatiel' },
  crab: { idle: crabIdle, walk: crabWalk, ball: crabBall, label: 'Crab' },
  duck: { idle: duckIdle, walk: duckWalk, ball: duckBall, label: 'Duck' },
  clippy: { idle: clippyIdle, walk: clippyWalk, ball: clippyBall, label: 'Clippy' },
} as const

type PetType = keyof typeof PET_TYPES

interface Pet {
  id: number
  type: PetType
  x: number
  targetX: number
  state: 'idle' | 'walking' | 'chasing'
  chasingBallId: number | null
  facingLeft: boolean
  idleTimer: number
}

interface Ball {
  id: number
  x: number
  y: number
  vy: number
  grounded: boolean
  claimed: boolean
}

let nextId = 0
let nextBallId = 0

function createPet(type: PetType): Pet {
  return {
    id: nextId++,
    type,
    x: 20 + Math.random() * 60,
    targetX: 50,
    state: 'idle',
    chasingBallId: null,
    facingLeft: Math.random() > 0.5,
    idleTimer: 2000 + Math.random() * 3000,
  }
}

const MAX_PETS = 6

export function PetPlayground() {
  const [pets, setPets] = useState<Pet[]>([createPet('cat')])
  const [balls, setBalls] = useState<Ball[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [thrown, setThrown] = useState(0)
  const [caught, setCaught] = useState(0)
  const petsRef = useRef(pets)
  const ballsRef = useRef(balls)
  const containerRef = useRef<HTMLDivElement>(null)
  const heightRef = useRef(200)

  petsRef.current = pets
  ballsRef.current = balls

  useEffect(() => {
    let lastTime = performance.now()
    let raf: number

    function tick(now: number) {
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      if (containerRef.current) {
        heightRef.current = containerRef.current.offsetHeight
      }

      let changed = false
      const currentPets = petsRef.current
      const currentBalls = ballsRef.current
      const groundY = heightRef.current - 50

      for (const ball of currentBalls) {
        if (!ball.grounded) {
          ball.vy += 0.15
          ball.y += ball.vy
          if (ball.y >= groundY) {
            ball.y = groundY
            ball.vy = -ball.vy * 0.6
            if (Math.abs(ball.vy) < 1.5) {
              ball.grounded = true
              ball.vy = 0
            }
          }
          changed = true
        }
      }

      for (const pet of currentPets) {
        if (pet.state !== 'chasing') {
          const unclaimed = currentBalls.find(b => b.grounded && !b.claimed)
          if (unclaimed) {
            pet.state = 'chasing'
            pet.chasingBallId = unclaimed.id
            pet.targetX = unclaimed.x
            unclaimed.claimed = true
            pet.facingLeft = pet.targetX < pet.x
            changed = true
          }
        }

        if (pet.state === 'idle') {
          pet.idleTimer -= dt
          if (pet.idleTimer <= 0) {
            pet.targetX = 5 + Math.random() * 90
            pet.state = 'walking'
            pet.facingLeft = pet.targetX < pet.x
            changed = true
          }
        } else if (pet.state === 'walking' || pet.state === 'chasing') {
          const speed = pet.state === 'chasing' ? 0.05 : 0.018
          const diff = pet.targetX - pet.x
          if (Math.abs(diff) < 1.5) {
            pet.x = pet.targetX
            if (pet.state === 'chasing') {
              const ballIdx = currentBalls.findIndex(b => b.id === pet.chasingBallId)
              if (ballIdx !== -1) currentBalls.splice(ballIdx, 1)
              pet.chasingBallId = null
              setCaught(c => c + 1)
            }
            pet.state = 'idle'
            pet.idleTimer = 2000 + Math.random() * 4000
            changed = true
          } else {
            pet.x += Math.sign(diff) * speed * dt
            pet.facingLeft = diff < 0
            changed = true
          }
        }
      }

      if (changed) {
        setPets([...currentPets])
        setBalls([...currentBalls])
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const throwBall = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    if ((e.target as HTMLElement).closest('button')) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width) * 100
    const clamped = Math.max(5, Math.min(95, xPct))
    const newBall: Ball = { id: nextBallId++, x: clamped, y: 0, vy: 0, grounded: false, claimed: false }
    setBalls(prev => [...prev, newBall])
    ballsRef.current = [...ballsRef.current, newBall]
    setThrown(t => t + 1)
  }, [])

  const addPet = useCallback((type: PetType) => {
    if (petsRef.current.length >= MAX_PETS) return
    const newPet = createPet(type)
    setPets(prev => [...prev, newPet])
    setShowMenu(false)
  }, [])

  const reset = useCallback(() => {
    const fresh = createPet('cat')
    setPets([fresh])
    petsRef.current = [fresh]
    setBalls([])
    ballsRef.current = []
    setShowMenu(false)
    setThrown(0)
    setCaught(0)
  }, [])

  const getSrc = (pet: Pet) => {
    const sprites = PET_TYPES[pet.type]
    if (pet.state === 'chasing' && Math.abs(pet.x - pet.targetX) < 3) return sprites.ball
    if (pet.state === 'walking' || pet.state === 'chasing') return sprites.walk
    return sprites.idle
  }

  return (
    <div className="h-full flex flex-col">
      <p className="font-mono text-label-caps tracking-[0.05em] text-on-surface-variant opacity-50 mb-2 italic text-center">
        Tired of reading? Let's pet some animals.
      </p>

      <div
        ref={containerRef}
        className="relative flex-1 border border-outline-variant bg-surface-container-low cursor-crosshair overflow-visible"
        onClick={throwBall}
      >
        {/* Ground line */}
        <div className="absolute bottom-10 left-0 right-0 h-px bg-outline-variant opacity-30" />

        {/* Balls */}
        {balls.map(ball => (
          <div
            key={ball.id}
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{
              left: `${ball.x}%`,
              top: `${ball.y}px`,
              transform: 'translateX(-50%)',
            }}
          />
        ))}

        {/* Pets */}
        {pets.map(pet => (
          <div
            key={pet.id}
            className="absolute bottom-3 transition-none"
            style={{
              left: `${pet.x}%`,
              transform: `translateX(-50%) scaleX(${pet.facingLeft ? -1 : 1})`,
            }}
          >
            <img
              src={getSrc(pet)}
              alt={PET_TYPES[pet.type].label}
              className="h-[36px]"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        ))}

        {/* Score */}
        <div className="absolute top-3 left-3 font-mono text-label-caps tracking-[0.05em] text-on-surface-variant opacity-60 flex gap-4">
          <span>thrown: {thrown}</span>
          <span>caught: {caught}</span>
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              reset()
            }}
            className="flex items-center gap-1.5 bg-surface-container-high border border-outline-variant px-3 py-1.5 font-mono text-label-caps tracking-[0.05em] text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            disabled={pets.length >= MAX_PETS}
            className="flex items-center gap-1.5 bg-surface-container-high border border-outline-variant px-3 py-1.5 font-mono text-label-caps tracking-[0.05em] text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add pet</span>
          </button>
        </div>

        {/* Pet picker menu */}
        {showMenu && (
          <div
            className="absolute bottom-full right-3 mb-1 bg-surface-container-high border border-outline-variant p-2 flex flex-col gap-1 z-30 max-h-[140px] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {(Object.keys(PET_TYPES) as PetType[]).map(type => (
              <button
                key={type}
                onClick={() => addPet(type)}
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-label-caps tracking-[0.05em] text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors text-left"
              >
                <img
                  src={PET_TYPES[type].idle}
                  alt=""
                  className="h-[20px]"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span>{PET_TYPES[type].label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Throw hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-label-caps tracking-[0.05em] text-on-surface-variant opacity-30">
          click to throw a ball
        </div>
      </div>
    </div>
  )
}
