const expertise = [
  'Bioinformatics',
  'Product Engineering',
  'Interactive Tooling',
  'TypeScript / React',
  'Python / R',
  'Cloud Architecture',
  'Computational Biology',
  'Interaction Design',
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
              My background sits at the intersection of complex systems. I started in the lab,
              studying biological engineering — the microscopic world taught me about emergent
              behavior, structural elegance, and the messy beauty of living datasets.
            </p>
            <p>
              A PhD in Bioinformatics at Ghent University pulled me toward computation. There I
              built network-based tools (IAMBEE, PheNetic) for genotype-phenotype mapping and
              published the work in Nucleic Acids Research.
            </p>
            <p>
              Since then I've spent my time inside molecular diagnostics — first at Biocartis,
              now at miDiagnostics — building the data pipelines, analytics, and internal
              platforms that turn assay data into something a team can actually act on. Equal
              parts data science, software, and interface.
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
