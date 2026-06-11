import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
]

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-sm border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-margin-edge py-6">
        <Link
          to="/"
          className="font-display text-headline-sm text-on-surface uppercase tracking-widest hover:text-primary transition-colors"
        >
          CP Romero
        </Link>

        <nav className="hidden md:flex gap-12 items-center">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                [
                  'font-mono text-label-caps tracking-[0.1em] uppercase transition-colors duration-300',
                  isActive
                    ? 'text-primary border-b border-primary pb-1 font-bold'
                    : 'text-on-surface-variant hover:text-primary',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="mailto:campero189@gmail.com"
          >
            Contact
          </a>
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden text-primary hover:text-primary-fixed transition-all"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-3xl">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-outline-variant bg-background/95 backdrop-blur-sm px-margin-edge py-6 flex flex-col gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant"
            >
              {l.label}
            </NavLink>
          ))}
          <a
            className="font-mono text-label-caps tracking-[0.1em] uppercase text-on-surface-variant"
            href="mailto:campero189@gmail.com"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
