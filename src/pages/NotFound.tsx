import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Custom 404 page for any unknown route. */
export function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center border-[3px] border-ink bg-brand-yellow text-black shadow-[6px_6px_0_0_var(--nb-shadow)]">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="text-7xl text-ink sm:text-8xl">404</h1>
      <p className="max-w-md text-ink/70">
        Looks like you wandered off the beaten path. This page doesn&apos;t exist — let&apos;s get you back home.
      </p>
      <Link to="/" className="nb-btn bg-accent-500 px-6 py-3 text-sm text-white">
        Back to Home
      </Link>
    </section>
  )
}