import { ArrowUpRight, BookOpen, Code2, Rocket } from 'lucide-react'
import type { ComponentType } from 'react'
import type { Project, ProjectCategory } from '../types/content'
import { cn } from '../utils/cn'
import { GitHubIcon } from './BrandIcons'
import { Reveal } from './Reveal'

const categoryIcon: Record<ProjectCategory, ComponentType<{ className?: string }>> = {
  'Web App': Rocket,
  'Learning Tool': BookOpen,
  Portfolio: Code2,
}

const statusColor: Record<Project['status'], string> = {
  Live: 'bg-brand-green',
  Demo: 'bg-brand-cyan',
  'In progress': 'bg-brand-yellow',
  Concept: 'bg-brand-violet',
}

interface ProjectLinkButtonProps {
  href: string
  section: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

/** Live Demo / GitHub buttons. If no URL is set yet, shows a clear pending state. */
function ProjectLinkButton({ href, section, variant, children }: ProjectLinkButtonProps) {
  if (!href) {
    return (
      <span
        className="inline-flex cursor-not-allowed items-center gap-2 border-[3px] border-dashed border-ink/40 bg-ink/5 px-4 py-2.5 text-sm font-bold text-ink/50"
        title={`Add the ${section} link in src/data/projects.ts`}
      >
        {children}
        <span className="border-2 border-current px-1.5 py-0.5 text-[10px] tracking-wide uppercase">Pending</span>
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'nb-btn px-4 py-2.5 text-sm',
        variant === 'primary' ? 'bg-accent-500 text-white' : 'bg-brand-yellow text-black',
      )}
    >
      {children}
    </a>
  )
}

/** A single project showcase card. */
export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const Icon = categoryIcon[project.category]

  return (
    <Reveal delay={delay} className="h-full">
      <article className="nb-card group flex h-full flex-col transition-transform duration-200 hover:-translate-y-1.5">
        {/* Thumbnail — a bright, flat "sticker" that looks the same in both themes */}
        <div className={cn('relative aspect-[16/10] overflow-hidden border-b-[3px] border-black', project.color)}>
          <div aria-hidden="true" className="nb-dots absolute inset-0 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center border-[3px] border-black bg-white text-black shadow-[4px_4px_0_0_#0b0b0b] transition group-hover:scale-110 group-hover:-rotate-6">
              <Icon className="h-8 w-8" />
            </span>
          </div>
          <span
            className={cn(
              'nb-pill absolute top-3 right-3 border-black px-3 py-1 text-xs text-black shadow-[3px_3px_0_0_#0b0b0b]',
              statusColor[project.status],
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <span className="text-[11px] font-bold tracking-widest text-ink/50 uppercase">{project.category}</span>
          <h3 className="text-xl font-extrabold text-ink">{project.title}</h3>
          <p className="flex-1 text-sm leading-relaxed text-ink/70">{project.description}</p>

          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="nb-tag bg-paper px-2.5 py-1 text-xs text-ink">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap gap-3">
            <ProjectLinkButton href={project.demoUrl} section="live demo" variant="primary">
              <ArrowUpRight className="h-4 w-4" />
              Live Demo
            </ProjectLinkButton>
            <ProjectLinkButton href={project.repoUrl} section="GitHub repository" variant="secondary">
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </ProjectLinkButton>
          </div>
        </div>
      </article>
    </Reveal>
  )
}