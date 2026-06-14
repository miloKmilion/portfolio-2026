import { Link } from 'react-router-dom'
import { MetaballCanvas } from '@/components/MetaballCanvas'
import { PixelKnight } from '@/components/PixelKnight'
import { GitGraph } from '@/components/GitGraph'

function AnimatedText({ text, baseDelay }: { text: string; baseDelay: number }) {
  let charIndex = 0
  const words = text.split(' ')

  return (
    <span className="letter-reveal inline-flex flex-wrap justify-center">
      {words.map((word, wi) => {
        const startIdx = charIndex
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...word].map((char) => {
              const i = charIndex++
              return (
                <span key={i} style={{ animationDelay: `${baseDelay + i * 0.04}s` }}>
                  {char}
                </span>
              )
            })}
            {wi < words.length - 1 && (
              <span key={`sp-${startIdx}`} style={{ animationDelay: `${baseDelay + charIndex++ * 0.04}s` }}>
                &nbsp;
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}


export function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="relative min-h-[85vh] flex items-center justify-center px-margin-edge overflow-hidden border-b border-outline-variant">
        <MetaballCanvas />
        <PixelKnight />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary italic">
            <AnimatedText text="Camilo Perez Romero" baseDelay={0.2} />
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

      {/* Core Stack */}
      <section id="stack" className="pt-24 pb-16 px-margin-edge max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="font-mono text-label-caps tracking-[0.1em] uppercase text-primary">
              Methodology
            </h2>
            <h3 className="font-display text-headline-md text-on-surface">
              Core Stack &amp; <br />
              <span className="italic text-on-surface-variant">Competencies</span>
            </h3>
          </div>
          <p className="font-mono text-body-md text-on-surface-variant max-w-md pb-2">
            A highly curated selection of frameworks and theoretical models designed for processing,
            visualizing, and interpreting complex biological phenomena at scale.
          </p>
        </div>

        <GitGraph />
      </section>
    </>
  )
}
