import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/profile'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { cn } from '../utils/cn'
import { ThemeToggle } from './ThemeToggle'

/** Fixed navigation bar with scroll-spy highlighting and a mobile menu. */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(navLinks.map((link) => link.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const linkClass = (id: string) =>
    cn(
      'border-[3px] px-3 py-1.5 text-sm font-bold transition',
      activeId === id
        ? 'border-ink bg-brand-yellow text-black shadow-[3px_3px_0_0_var(--nb-shadow)]'
        : 'border-transparent text-ink/70 hover:border-ink hover:bg-brand-yellow hover:text-black',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b-[3px] border-ink bg-paper transition-shadow duration-200',
        scrolled && 'shadow-[0_6px_0_0_var(--nb-shadow)]',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center border-[3px] border-ink bg-accent-500 font-display text-sm text-white shadow-[3px_3px_0_0_var(--nb-shadow)]">
            FA
          </span>
          <span className="font-display text-lg text-ink">{profile.firstName}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={linkClass(link.id)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="nb-btn h-11 w-11 p-0 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t-[3px] border-ink bg-paper lg:hidden"
          >
            <ul className="flex flex-col gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn('block px-3 py-2.5 text-base', linkClass(link.id))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}