/**
 * Fixed, decorative brutalist backdrop: a bold grid plus a few geometric shapes.
 * Purely visual — hidden from screen readers.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="nb-grid absolute inset-0 opacity-60" />
      <div className="absolute -top-16 -right-16 h-56 w-56 rotate-12 border-[6px] border-ink/15 bg-brand-yellow/50" />
      <div className="absolute top-1/2 -left-24 h-44 w-44 -rotate-12 border-[6px] border-ink/15 bg-brand-cyan/40" />
      <div className="absolute right-1/4 bottom-16 h-24 w-24 border-[6px] border-ink/15 bg-brand-pink/40" />
    </div>
  )
}