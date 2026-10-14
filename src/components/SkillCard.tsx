import { Atom, Braces, GitBranch, MonitorSmartphone, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import { skillLevelDots, skillLevelLabel } from '../data/skills'
import type { Skill } from '../types/content'
import { cn } from '../utils/cn'
import { Reveal } from './Reveal'

/** A few skills get a lucide icon; the rest show a monogram (e.g. "TS"). */
const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  javascript: Braces,
  react: Atom,
  git: GitBranch,
  responsive: MonitorSmartphone,
  'ai-tools': Sparkles,
}

/** Single skill card with an honest, editable proficiency label. */
export function SkillCard({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const Icon = skillIcons[skill.id] ?? null
  const dots = skillLevelDots[skill.level]

  return (
    <Reveal delay={delay} className="h-full">
      <div className="nb-card group flex h-full flex-col gap-4 p-6 transition-transform duration-200 hover:-translate-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'flex h-14 w-14 shrink-0 items-center justify-center border-[3px] border-ink text-black shadow-[4px_4px_0_0_var(--nb-shadow)]',
              skill.color,
            )}
          >
            {Icon ? <Icon className="h-6 w-6" /> : <span className="text-sm font-black">{skill.monogram}</span>}
          </span>
          <span className="nb-pill bg-paper px-3 py-1 text-xs text-ink">{skillLevelLabel(skill.level)}</span>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-ink">{skill.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">{skill.description}</p>
        </div>

        {/* Decorative level indicator (labels above are the source of truth) */}
        <div className="mt-auto flex items-center gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                'h-2.5 flex-1 border-2 border-ink',
                i <= dots ? 'bg-ink' : 'bg-transparent',
              )}
            />
          ))}
        </div>
      </div>
    </Reveal>
  )
}