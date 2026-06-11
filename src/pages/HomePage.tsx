import { Link } from 'react-router-dom'

const stack = [
  {
    n: '01',
    icon: 'biotech',
    title: 'Bioinformatics Pipelines',
    body: 'Development of high-throughput genomic and transcriptomic analysis workflows using Nextflow, Snakemake, and containerized deployment environments.',
  },
  {
    n: '02',
    icon: 'data_object',
    title: 'Machine Learning',
    body: 'Implementing predictive models, deep learning networks (PyTorch/TensorFlow), and dimensionality reduction techniques for complex multi-omics data integration.',
  },
  {
    n: '03',
    icon: 'cloud',
    title: 'Cloud Architecture',
    body: 'Designing resilient, serverless infrastructures on AWS and GCP optimized for extreme data gravity and computationally intensive biological tasks.',
  },
  {
    n: '04',
    icon: 'schema',
    title: 'Data Visualization',
    body: 'Crafting bespoke, interactive visual tools using D3.js and WebGL to render complex networks, structural alignments, and massive dimensional spaces intelligible.',
  },
]

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="relative min-h-[85vh] flex items-center justify-center px-margin-edge overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#16130e_80%)] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 border border-outline-variant rounded-full px-4 py-2 bg-surface-container-low/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-label-caps tracking-[0.1em] text-on-surface-variant uppercase">
              Computational Biology &amp; Data Architecture
            </span>
          </div>

          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary text-balance mx-auto">
            <span className="italic font-light text-on-surface">Bridging the gap between</span>{' '}
            biology and complex data.
          </h1>

          <p className="font-mono text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Translating massive genomic datasets into actionable insights through sophisticated
            algorithms, scalable infrastructure, and a design-first approach to scientific tooling.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
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
      <section id="stack" className="py-section-gap px-margin-edge max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-outline-variant">
          {stack.map((s) => (
            <article
              key={s.n}
              className="border-b border-r border-outline-variant p-10 flex flex-col group hover:bg-surface-container-low transition-colors duration-500 min-h-[280px]"
            >
              <header className="flex justify-between items-start mb-16">
                <span className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant">
                  {s.n}
                </span>
                <span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                  {s.icon}
                </span>
              </header>
              <div className="mt-auto space-y-4">
                <h4 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  {s.title}
                </h4>
                <p className="font-mono text-body-md text-on-surface-variant">{s.body}</p>
              </div>
            </article>
          ))}

          <article className="border-b border-r lg:col-span-2 relative overflow-hidden group min-h-[300px] border-outline-variant bg-surface-container-high">
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity bg-[radial-gradient(circle_at_30%_30%,#a7e1ff20,transparent_60%),radial-gradient(circle_at_70%_70%,#86c6e520,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
            <div className="relative h-full p-10 flex flex-col justify-end">
              <span className="font-mono text-label-caps tracking-[0.1em] uppercase text-primary mb-4">
                Case Study Highlight
              </span>
              <h4 className="font-display text-headline-md text-on-surface">
                Mapping the Human Proteome
              </h4>
              <p className="font-mono text-body-md text-on-surface-variant mt-4 max-w-xl">
                A retrospective look at architectural decisions required to parse and query
                terabytes of structural protein data in real-time.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
