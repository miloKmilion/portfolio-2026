const expertise = [
  'Bioinformatics',
  'Machine Learning',
  'Data Visualization',
  'Python / R',
  'System Architecture',
  'Computational Biology',
  'Statistical Modeling',
]

export function AboutPage() {
  return (
    <>
      <section className="px-margin-edge py-section-gap flex flex-col md:flex-row gap-gutter md:items-center max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col gap-content-gap pr-0 md:pr-12">
          <p className="font-mono text-label-caps tracking-[0.1em] uppercase text-primary">
            The Journey
          </p>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            Bridging <span className="italic font-light">Biology</span>
            <br />
            &amp; Computation.
          </h1>
          <div className="font-mono text-body-lg text-on-surface-variant max-w-2xl flex flex-col gap-6 mt-8">
            <p>
              My background lies at the intersection of complex systems. I started my career deep
              in the lab, studying biological engineering. The microscopic world taught me about
              emergent behaviors, structural elegance, and the messy beauty of living datasets.
            </p>
            <p>
              However, the sheer volume of biological data demanded new tools. I pivoted toward
              Data Science, seeking to translate the chaos of organic systems into structured,
              actionable insights.
            </p>
            <p>
              Today, I apply that same rigorous, systems-level thinking to digital products and
              complex data architectures, finding clarity in noise.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
          <div className="absolute -inset-4 border border-outline-variant rounded-sm hidden md:block -z-10 translate-x-4 translate-y-4" />
          <div className="aspect-[2/3] w-full max-w-md mx-auto md:ml-auto relative overflow-hidden rounded-sm bg-surface-container border border-outline-variant flex items-center justify-center">
            {/* Replace with portrait when available */}
            <span className="font-display italic text-on-surface-variant text-headline-md">
              CP
            </span>
          </div>
        </div>
      </section>

      <section className="px-margin-edge py-section-gap border-t border-outline-variant max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h2 className="font-display text-headline-md text-on-surface mb-12">Core Expertise</h2>
          <div className="flex flex-wrap gap-4">
            {expertise.map((label) => (
              <div
                key={label}
                className="rounded-full px-6 py-2 border border-outline-variant bg-surface-container-low font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
