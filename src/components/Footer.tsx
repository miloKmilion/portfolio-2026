const social = [
  { href: 'https://linkedin.com/in/campero189', label: 'LinkedIn' },
  { href: 'https://github.com/miloKmilion', label: 'GitHub' },
  { href: 'https://twitter.com/campero189', label: 'Twitter' },
  { href: 'mailto:campero189@gmail.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-edge py-12 gap-base w-full">
        <div className="font-display text-headline-sm text-primary mb-6 md:mb-0">CP Romero</div>
        <ul className="flex flex-wrap justify-center gap-content-gap mb-6 md:mb-0">
          {social.map((s) => (
            <li key={s.href}>
              <a
                className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
                href={s.href}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="font-mono text-body-md text-on-surface-variant text-center md:text-right">
          © {new Date().getFullYear()} Camilo Perez Romero. Data Science &amp; Bioinformatics.
        </div>
      </div>
    </footer>
  )
}
