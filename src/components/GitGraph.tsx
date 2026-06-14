import { useState } from 'react'
import { PetPlayground } from './PetPlayground'

interface Node {
  id: string
  n: string
  icon: string
  title: string
  body: string
  branch: 'bio' | 'product'
}

const nodes: Node[] = [
  {
    id: 'bio-1',
    n: '01',
    icon: 'biotech',
    title: 'Bioinformatics Pipelines',
    body: 'Development of high-throughput genomic and transcriptomic analysis workflows using Nextflow, Snakemake, and containerized deployment environments.',
    branch: 'bio',
  },
  {
    id: 'product-1',
    n: '02',
    icon: 'dashboard_customize',
    title: 'Product Engineering',
    body: 'Shipping end-to-end web platforms with React, TypeScript, and considered interaction design — turning specialized scientific workflows into tools researchers actually want to use.',
    branch: 'product',
  },
  {
    id: 'bio-2',
    n: '03',
    icon: 'cloud',
    title: 'Cloud Architecture',
    body: 'Designing resilient, serverless infrastructures on AWS and GCP optimized for extreme data gravity and computationally intensive biological tasks.',
    branch: 'bio',
  },
  {
    id: 'product-2',
    n: '04',
    icon: 'schema',
    title: 'Interactive Tooling',
    body: 'Building bespoke scientific interfaces with D3.js and WebGL — rendering complex networks, structural alignments, and high-dimensional spaces into something a human can reason about.',
    branch: 'product',
  },
]

const BRANCH_COLORS = {
  bio: '#a7e1ff',
  product: '#c8b4ff',
}

const TRUNK_X = 24
const BIO_X = 12
const PRODUCT_X = 36
const ROW_H = 72
const START_Y = 48

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(max-width: 767px)')
    if (mobile !== mq.matches) setMobile(mq.matches)
  }
  return mobile
}

export function GitGraph() {
  const [active, setActive] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const nodePositions = nodes.map((node, i) => {
    const cx = node.branch === 'bio' ? BIO_X : PRODUCT_X
    const cy = START_Y + ROW_H * i
    return { ...node, cx, cy }
  })

  const mergeY = START_Y + ROW_H * nodes.length
  const totalH = mergeY + 40

  return (
    <div className="space-y-8 overflow-hidden">
      {/* Main layout */}
      <div className="relative flex items-start gap-0">
        {/* Graph column */}
        <div className="relative flex-shrink-0" style={{ width: '48px', height: `${totalH}px` }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 48 ${totalH}`}
            fill="none"
          >
            {/* Trunk */}
            <line x1={TRUNK_X} y1="0" x2={TRUNK_X} y2={START_Y} stroke="var(--color-outline-variant)" strokeWidth="1" />
            <line x1={TRUNK_X} y1={mergeY} x2={TRUNK_X} y2={totalH} stroke="var(--color-outline-variant)" strokeWidth="1" />

            {/* Fork to bio */}
            <path
              d={`M${TRUNK_X},${START_Y} C${TRUNK_X},${START_Y + 16} ${BIO_X},${nodePositions[0].cy - 16} ${BIO_X},${nodePositions[0].cy}`}
              stroke={BRANCH_COLORS.bio}
              strokeWidth="1"
              opacity="0.7"
            />
            {/* Bio vertical */}
            <line x1={BIO_X} y1={nodePositions[0].cy} x2={BIO_X} y2={nodePositions[2].cy} stroke={BRANCH_COLORS.bio} strokeWidth="1" opacity="0.7" />
            {/* Bio merge */}
            <path
              d={`M${BIO_X},${nodePositions[2].cy} C${BIO_X},${nodePositions[2].cy + 16} ${TRUNK_X},${mergeY - 16} ${TRUNK_X},${mergeY}`}
              stroke={BRANCH_COLORS.bio}
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Fork to product */}
            <path
              d={`M${TRUNK_X},${START_Y} C${TRUNK_X},${START_Y + 16} ${PRODUCT_X},${nodePositions[1].cy - 16} ${PRODUCT_X},${nodePositions[1].cy}`}
              stroke={BRANCH_COLORS.product}
              strokeWidth="1"
              opacity="0.7"
            />
            {/* Product vertical */}
            <line x1={PRODUCT_X} y1={nodePositions[1].cy} x2={PRODUCT_X} y2={nodePositions[3].cy} stroke={BRANCH_COLORS.product} strokeWidth="1" opacity="0.7" />
            {/* Product merge */}
            <path
              d={`M${PRODUCT_X},${nodePositions[3].cy} C${PRODUCT_X},${nodePositions[3].cy + 16} ${TRUNK_X},${mergeY - 16} ${TRUNK_X},${mergeY}`}
              stroke={BRANCH_COLORS.product}
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Dots */}
            <circle cx={TRUNK_X} cy={START_Y} r="3" fill="var(--color-outline-variant)" />
            {nodePositions.map((node) => (
              <circle
                key={node.id}
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill={BRANCH_COLORS[node.branch]}
                className="transition-all duration-200"
                style={{
                  filter: active === node.id ? `drop-shadow(0 0 4px ${BRANCH_COLORS[node.branch]})` : 'none',
                }}
              />
            ))}
            <circle cx={TRUNK_X} cy={mergeY} r="3.5" fill="var(--color-primary)" />
          </svg>
        </div>

        {/* Labels column */}
        <div className="relative flex-1 min-w-0" style={{ height: `${totalH}px` }}>
          {nodePositions.map((node) => (
            <div
              key={node.id}
              className="absolute left-0 flex items-center gap-3 cursor-pointer group"
              style={{ top: `${node.cy}px`, transform: 'translateY(-50%)' }}
              onMouseEnter={() => !isMobile && setActive(node.id)}
              onMouseLeave={() => !isMobile && setActive(null)}
              onClick={() => isMobile && setActive(active === node.id ? null : node.id)}
            >
              <span className="font-mono text-label-caps tracking-[0.1em] text-on-surface-variant opacity-50 w-6">
                {node.n}
              </span>
              <span
                className="font-display text-headline-sm transition-colors duration-200 md:whitespace-nowrap"
                style={{ color: active === node.id ? BRANCH_COLORS[node.branch] : 'var(--color-on-surface)' }}
              >
                {node.title}
              </span>
              <span
                className="material-symbols-outlined transition-opacity duration-200"
                style={{
                  color: BRANCH_COLORS[node.branch],
                  opacity: active === node.id ? 1 : 0,
                }}
              >
                {node.icon}
              </span>
            </div>
          ))}

          {/* Merge label */}
          <div
            className="absolute left-0 flex items-center gap-3"
            style={{ top: `${mergeY}px`, transform: 'translateY(-50%)' }}
          >
            <span className="font-mono text-label-caps tracking-[0.1em] text-primary opacity-60">
              merge
            </span>
          </div>

          {/* Mobile overlay cards */}
          {nodePositions.map((node) => {
            const isActive = active === node.id
            return (
              <div
                key={`card-mobile-${node.id}`}
                className="md:hidden absolute left-0 right-0 pointer-events-none transition-all duration-300 ease-out z-20"
                style={{
                  top: `${node.cy + 20}px`,
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0.95})`,
                  transformOrigin: 'top left',
                }}
              >
                <div
                  className="border border-outline-variant bg-surface-container/95 backdrop-blur-sm p-5 w-full"
                  style={{
                    boxShadow: isActive
                      ? `0 0 30px ${BRANCH_COLORS[node.branch]}15, 0 6px 24px rgba(0,0,0,0.4)`
                      : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[18px]" style={{ color: BRANCH_COLORS[node.branch] }}>
                      {node.icon}
                    </span>
                    <span className="font-mono text-label-caps tracking-[0.1em] uppercase" style={{ color: BRANCH_COLORS[node.branch] }}>
                      {node.title}
                    </span>
                  </div>
                  <p className="font-mono text-body-md text-on-surface-variant leading-relaxed">
                    {node.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop right side — cards overlay the playground */}
        <div className="relative flex-1 min-w-0 hidden md:block" style={{ height: `${totalH}px` }}>
          {/* Pet playground as default content */}
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: active ? 0 : 1 }}>
            <PetPlayground />
          </div>

          {/* Hover cards */}
          {nodePositions.map((node) => {
            const isActive = active === node.id
            return (
              <div
                key={`card-${node.id}`}
                className="absolute inset-x-0 pointer-events-none transition-all duration-300 ease-out z-10"
                style={{
                  top: `${node.cy}px`,
                  transform: `translateY(-50%) scale(${isActive ? 1 : 0.95})`,
                  opacity: isActive ? 1 : 0,
                }}
              >
                <div
                  className="border border-outline-variant bg-surface-container/95 backdrop-blur-sm p-8 w-full max-w-lg"
                  style={{
                    boxShadow: isActive
                      ? `0 0 30px ${BRANCH_COLORS[node.branch]}15, 0 6px 24px rgba(0,0,0,0.4)`
                      : 'none',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-[22px]" style={{ color: BRANCH_COLORS[node.branch] }}>
                      {node.icon}
                    </span>
                    <span className="font-mono text-label-caps tracking-[0.1em] uppercase" style={{ color: BRANCH_COLORS[node.branch] }}>
                      {node.title}
                    </span>
                  </div>
                  <p className="font-mono text-body-md text-on-surface-variant leading-relaxed">
                    {node.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile pet playground — below the graph */}
      <div className="md:hidden h-[200px]">
        <PetPlayground />
      </div>
    </div>
  )
}
