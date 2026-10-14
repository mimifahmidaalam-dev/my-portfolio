import { navLinks, profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

// Captured once at module load; the copyright year updates on rebuild.
const currentYear = new Date().getFullYear()

/** Site footer with quick links, socials and copyright. */
export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center border-[3px] border-ink bg-accent-500 font-display text-sm text-white shadow-[3px_3px_0_0_var(--nb-shadow)]">
                FA
              </span>
              <span className="font-display text-lg text-ink">{profile.nameDisplay}</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Building clean, responsive web experiences with React, TypeScript and a little help from AI.
            </p>
            <SocialLinks variant="row" className="mt-1" />
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="mb-4 text-sm font-bold tracking-widest text-ink uppercase">Quick links</h3>
            <ul className="grid gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="font-semibold text-ink/70 transition hover:text-ink hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-ink uppercase">Get in touch</h3>
            <p className="text-sm leading-relaxed text-ink/70">
              {profile.contact.location}
              <br />
              <a href={`mailto:${profile.contact.email}`} className="font-semibold text-accent-600 hover:underline dark:text-accent-300">
                {profile.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-[3px] border-ink pt-6 text-xs font-semibold text-ink/70 sm:flex-row">
          <p>
            © {currentYear} {profile.nameDisplay}. All rights reserved.
          </p>
          <p>Built with React, TypeScript, Tailwind CSS &amp; Motion.</p>
        </div>
      </div>
    </footer>
  )
}