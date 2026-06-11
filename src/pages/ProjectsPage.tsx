type Project = {
  n: string
  title: string
  tags: string[]
  href: string
}

const projects: Project[] = [
  {
    n: '01',
    title: 'miDiagnostics Ads Platform',
    tags: ['Data Engineering', 'UI/UX'],
    href: '#',
  },
  {
    n: '02',
    title: 'Ghent University Pipeline',
    tags: ['Bioinformatics', 'Architecture'],
    href: '#',
  },
  {
    n: '03',
    title: 'Sealadder Platform',
    tags: ['Web Application', 'Interaction Design'],
    href: '#',
  },
]

export function ProjectsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-margin-edge py-section-gap">
      <header className="mb-section-gap max-w-3xl">
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-content-gap">
          Selected Projects
        </h1>
        <p className="font-mono text-body-lg text-on-surface-variant">
          A curated collection of data science, bioinformatics, and digital platforms. Deliberate
          design and technical precision.
        </p>
      </header>

      <section className="flex flex-col w-full border-t border-outline-variant">
        {projects.map((p) => (
          <a
            key={p.n}
            href={p.href}
            className="group flex flex-col md:flex-row md:items-center justify-between py-12 gap-8 cursor-pointer relative overflow-hidden border-b border-outline-variant transition-all duration-300 hover:bg-surface-container-low hover:pl-5"
          >
            <div className="flex items-start md:items-center gap-content-gap z-10 w-full md:w-auto">
              <span className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant shrink-0 w-8">
                {p.n}
              </span>
              <h2 className="font-display text-headline-md text-on-surface group-hover:text-primary transition-colors duration-300">
                {p.title}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10 w-full md:w-auto justify-end">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 border border-outline-variant font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant transition-all duration-300 group-hover:border-primary group-hover:text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="material-symbols-outlined text-on-surface-variant hidden md:block transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary">
                arrow_forward
              </span>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}
