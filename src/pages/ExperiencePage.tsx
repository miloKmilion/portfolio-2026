type Role = {
  period: string
  current?: boolean
  role: string
  org: string
  blurb: string
  bullets: string[]
}

const roles: Role[] = [
  {
    period: 'Present',
    current: true,
    role: 'Data Scientist',
    org: 'miDiagnostics',
    blurb: 'Leading advanced data analysis and algorithm development for rapid diagnostic platforms.',
    bullets: [
      'Statistical modeling for diagnostic assay optimization.',
      'Implementation of machine learning pipelines for predictive analytics.',
    ],
  },
  {
    period: '2019 — 2022',
    role: 'Data Scientist',
    org: 'Biocartis',
    blurb: 'Spearheaded bioinformatics strategies for molecular diagnostic solutions.',
    bullets: [
      'Data-driven validation of biomarker assays.',
      'Cross-functional collaboration with R&D teams.',
    ],
  },
  {
    period: '2014 — 2019',
    role: 'PhD Student',
    org: 'Ghent University',
    blurb: 'Foundational research in computational biology and statistical genetics.',
    bullets: [
      'Advanced genomic data analysis.',
      'Publication of peer-reviewed research in high-impact journals.',
    ],
  },
]

const dataScience = [
  'Python',
  'R',
  'Scikit-Learn',
  'TensorFlow',
  'Statistical Modeling',
  'Predictive Analytics',
  'NLP',
]

const bioinformatics = ['Genomic Analysis', 'Biomarker Discovery', 'Pipeline Dev']
const dataEngineering = ['SQL', 'Spark', 'AWS', 'Docker', 'Git']
const visualization = ['ggplot2', 'Matplotlib', 'Tableau']

export function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-margin-edge pt-section-gap pb-content-gap max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary mb-6">
            Experience <span className="text-on-surface italic font-light">&amp;</span> Skills
          </h1>
          <p className="font-mono text-body-lg text-on-surface-variant leading-relaxed">
            A trajectory defined by curiosity and analytical rigor. Navigating complex biological
            data landscapes to distill actionable insights.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-margin-edge py-section-gap relative max-w-5xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-display text-headline-md text-on-surface inline-block bg-background px-6">
            Professional Journey
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-outline-variant" />

          {roles.map((r, i) => {
            const left = i % 2 === 0
            return (
              <div
                key={r.org}
                className={[
                  'relative z-10 mb-24 md:flex items-center justify-between w-full',
                  left ? '' : 'flex-row-reverse',
                ].join(' ')}
              >
                {/* Side panel (period + blurb) — desktop */}
                <div
                  className={[
                    'md:w-5/12 hidden md:block',
                    left ? 'text-right pr-8' : 'text-left pl-8',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'font-mono text-label-caps tracking-[0.1em] uppercase border border-outline-variant rounded-full px-4 py-1 inline-block mb-4 bg-background',
                      r.current ? 'text-primary' : 'text-on-surface-variant',
                    ].join(' ')}
                  >
                    {r.period}
                  </span>
                  <p className="font-mono text-body-md text-on-surface-variant">{r.blurb}</p>
                </div>

                {/* Node */}
                <div
                  className={[
                    'absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background rounded-full z-20 mt-6 md:mt-0 ml-[50px] md:ml-0 border-2',
                    r.current ? 'border-primary' : 'border-outline-variant',
                  ].join(' ')}
                />

                {/* Body */}
                <div
                  className={[
                    'md:w-5/12 pl-[80px]',
                    left ? 'md:pl-8' : 'md:pr-8 md:pl-0 md:text-right',
                  ].join(' ')}
                >
                  <div className="md:hidden mb-2">
                    <span
                      className={[
                        'font-mono text-label-caps tracking-[0.1em] uppercase border border-outline-variant rounded-full px-3 py-1 inline-block',
                        r.current ? 'text-primary' : 'text-on-surface-variant',
                      ].join(' ')}
                    >
                      {r.period}
                    </span>
                  </div>
                  <h3 className="font-display text-headline-sm text-on-surface mb-1">{r.role}</h3>
                  <h4
                    className={[
                      'font-mono text-body-lg italic mb-4',
                      r.current ? 'text-primary' : 'text-on-surface-variant',
                    ].join(' ')}
                  >
                    {r.org}
                  </h4>
                  <ul
                    className={[
                      'font-mono text-body-md text-on-surface-variant space-y-2 list-none',
                      !left ? 'md:flex md:flex-col md:items-end' : '',
                    ].join(' ')}
                  >
                    {r.bullets.map((b) => (
                      <li
                        key={b}
                        className={['flex items-start', !left ? 'md:flex-row-reverse' : ''].join(
                          ' ',
                        )}
                      >
                        <span
                          className={[
                            'material-symbols-outlined text-[18px] mt-1',
                            !left ? 'md:ml-2 md:mr-0 mr-2' : 'mr-2',
                            r.current ? 'text-primary' : 'text-outline-variant',
                          ].join(' ')}
                        >
                          {!left ? 'arrow_left' : 'arrow_right'}
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Technical Arsenal — Bento */}
      <section className="px-margin-edge py-section-gap max-w-7xl mx-auto border-t border-outline-variant">
        <div className="mb-16">
          <h2 className="font-display text-headline-md text-on-surface mb-4">Technical Arsenal</h2>
          <p className="font-mono text-body-md text-on-surface-variant max-w-2xl">
            The tools and methodologies utilized to extract meaning from noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Science & ML */}
          <div className="border border-outline-variant p-8 md:col-span-2 bg-surface-container-lowest relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute -right-10 -top-10 opacity-5">
              <span className="material-symbols-outlined text-[200px]">psychology</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">model_training</span>
                <h3 className="font-display text-headline-sm text-on-surface">Data Science &amp; ML</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {dataScience.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface border border-outline-variant rounded-full px-4 py-2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bioinformatics */}
          <div className="border border-outline-variant p-8 bg-surface-container-lowest relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-4 opacity-5">
              <span className="material-symbols-outlined text-[150px]">biotech</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">science</span>
                <h3 className="font-display text-headline-sm text-on-surface">Bioinformatics</h3>
              </div>
              <div className="flex flex-col gap-3">
                {bioinformatics.map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center justify-between border-b border-outline-variant pb-2"
                  >
                    <span className="font-mono text-body-md text-on-surface-variant">{s}</span>
                    <span className="font-mono text-label-caps tracking-[0.1em] text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Engineering */}
          <div className="border border-outline-variant p-8 bg-surface-container-lowest relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">database</span>
                <h3 className="font-display text-headline-sm text-on-surface">Data Engineering</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {dataEngineering.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface bg-surface-container px-3 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="border border-outline-variant p-8 md:col-span-2 bg-surface-container-lowest relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">query_stats</span>
                  <h3 className="font-display text-headline-sm text-on-surface">Data Visualization</h3>
                </div>
                <p className="font-mono text-body-md text-on-surface-variant mb-6">
                  Translating complex multi-dimensional datasets into intuitive visual narratives
                  for stakeholders.
                </p>
                <div className="flex gap-4 flex-wrap">
                  {visualization.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-label-caps tracking-[0.1em] uppercase text-primary border-b border-primary pb-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 w-full h-32 border border-outline-variant bg-surface flex items-end justify-between p-4 opacity-50">
                <div className="w-1/6 bg-primary h-[30%]" />
                <div className="w-1/6 bg-on-surface-variant h-[70%]" />
                <div className="w-1/6 bg-primary h-[50%]" />
                <div className="w-1/6 bg-on-surface-variant h-[90%]" />
                <div className="w-1/6 bg-primary h-[40%]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
