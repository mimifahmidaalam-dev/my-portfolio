import { Award, GraduationCap, Plus } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { certificationSuggestions, certifications, education } from '../data/education'

/** Education timeline + an honest, editable certifications area. */
export function Education() {
  return (
    <section id="education" data-section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Education timeline */}
          <div>
            <SectionHeading eyebrow="Education" title="Academic background" align="left" />
            <ol className="relative mt-10 flex flex-col gap-8 border-l-4 border-ink pl-8">
              {education.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1}>
                  <li className="relative">
                    <span
                      className="absolute top-6 -left-[46px] h-6 w-6 border-[3px] border-ink bg-brand-yellow"
                      aria-hidden="true"
                    />
                    <div className="nb-card p-6 transition-transform duration-200 hover:-translate-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-extrabold text-ink">{item.degree}</h3>
                        <span className="nb-pill bg-brand-green px-3 py-1 text-xs text-black">{item.status}</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-ink">
                        <GraduationCap className="mr-1.5 -mt-0.5 inline h-4 w-4" aria-hidden="true" />
                        {item.institution} · {item.location}
                      </p>
                      <p className="mt-1 text-xs font-bold tracking-wide text-ink/50 uppercase">{item.period}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Certifications */}
          <div>
            <SectionHeading
              eyebrow="Certifications"
              title="Certifications & training"
              description="Only earned, verifiable certifications are shown here — keep this honest, and add more anytime in src/data/education.ts."
              align="left"
            />

            {certifications.length > 0 ? (
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <Reveal key={cert.id} delay={index * 0.08} className="h-full">
                    <article className="nb-card flex h-full flex-col gap-3 p-6">
                      <span className="flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-brand-orange text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
                        <Award className="h-5 w-5" />
                      </span>
                      <h3 className="text-sm font-extrabold leading-snug text-ink">{cert.title}</h3>
                      <p className="text-xs font-bold text-ink/50">
                        {cert.issuer} · {cert.year}
                      </p>
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto text-xs font-bold text-accent-600 hover:underline dark:text-accent-300"
                        >
                          Verify credential ↗
                        </a>
                      ) : null}
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="mt-10">
                <div className="flex flex-col gap-4 border-[3px] border-dashed border-ink/50 p-8">
                  <span className="flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-surface text-ink">
                    <Plus className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-ink">No certificates added yet</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      I&apos;ll add verified certificates here as I earn them. Ideas worth pursuing:
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {certificationSuggestions.map((suggestion) => (
                      <li key={suggestion} className="nb-tag bg-paper px-3 py-1.5 text-xs text-ink">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1 text-xs text-ink/60">
                    To add one, edit the{' '}
                    <code className="border-2 border-ink bg-paper px-1.5 py-0.5 font-mono text-[11px]">certifications</code>{' '}
                    array in{' '}
                    <code className="border-2 border-ink bg-paper px-1.5 py-0.5 font-mono text-[11px]">src/data/education.ts</code>.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}