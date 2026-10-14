import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Small label above the title, e.g. "About me". */
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

/** Consistent heading block used at the top of every section. */
export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${isCenter ? 'mx-auto items-center text-center' : 'items-start text-left'}`}
    >
      <span className="nb-pill bg-brand-yellow px-4 py-1.5 text-xs tracking-wide text-black uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl text-balance text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-ink/70">{description}</p> : null}
    </Reveal>
  )
}