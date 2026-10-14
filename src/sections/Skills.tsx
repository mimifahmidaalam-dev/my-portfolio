import { SectionHeading } from '../components/SectionHeading'
import { SkillCard } from '../components/SkillCard'
import { skillGroups, skills } from '../data/skills'

const groupColors: Record<string, string> = {
  Languages: 'bg-brand-yellow',
  Frontend: 'bg-brand-cyan',
  'Tools & Workflow': 'bg-brand-pink',
}

/** Skills — grouped, with honest proficiency labels. */
export function Skills() {
  return (
    <section id="skills" data-section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My toolkit"
          title="Skills I'm building"
          description="Explained with honest labels instead of made-up percentages — every labelled level is easy to edit in src/data/skills.ts."
        />

        <div className="mt-12 flex flex-col gap-12">
          {skillGroups.map((group) => (
            <div key={group} className="flex flex-col gap-5">
              <h3
                className={`nb-pill w-fit px-4 py-1.5 text-xs tracking-widest text-black uppercase ${groupColors[group]}`}
              >
                {group}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((skill) => skill.group === group)
                  .map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} delay={index * 0.06} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Level legend */}
        <div className="nb-card mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-5 text-sm text-ink/70">
          <span className="font-extrabold text-ink">Level guide:</span>
          {[
            ['Learning', 'just started'],
            ['Beginner', 'building small things'],
            ['Intermediate', 'comfortable in projects'],
            ['Confident', 'regular, everyday tool'],
          ].map(([label, note]) => (
            <span key={label} className="flex items-center gap-2">
              <span className="h-3 w-3 border-2 border-ink bg-ink" aria-hidden="true" />
              <strong className="font-bold text-ink">{label}</strong> — {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}