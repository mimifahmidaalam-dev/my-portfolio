import { Atom, Braces, MonitorSmartphone, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

const highlightIcons: Record<string, ComponentType<{ className?: string }>> = {
  responsive: MonitorSmartphone,
  'ai-assisted': Sparkles,
  'modern-stack': Atom,
  'detail-minded': Braces,
}

const highlightColors = ['bg-brand-cyan', 'bg-brand-yellow', 'bg-brand-pink', 'bg-brand-green']

/** About — a professional, honest summary with focus areas. */
export function About() {
  const { about } = profile

  return (
    <section id="about" data-section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="About me" title={about.heading} align="left" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-[15px] leading-relaxed text-ink/80">
                {paragraph}
              </p>
            ))}
            <p className="mt-2 inline-flex w-fit items-center gap-2 border-[3px] border-ink bg-brand-yellow px-4 py-2 text-sm font-bold text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Currently learning · React, TypeScript &amp; AI-assisted workflow
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {about.highlights.map((highlight, index) => {
              const Icon = highlightIcons[highlight.id] ?? Sparkles
              return (
                <Reveal key={highlight.id} delay={index * 0.08} className="h-full">
                  <div className="nb-card flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1.5">
                    <span
                      className={`flex h-12 w-12 items-center justify-center border-[3px] border-ink text-black shadow-[4px_4px_0_0_var(--nb-shadow)] ${highlightColors[index % highlightColors.length]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-sm font-extrabold text-ink">{highlight.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/70">{highlight.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}