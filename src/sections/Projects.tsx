import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types/content'
import { cn } from '../utils/cn'

type Filter = 'All' | ProjectCategory
const filters: Filter[] = ['All', 'Web App', 'Learning Tool', 'Portfolio']

/** Projects — filterable showcase with honest pending states for missing links. */
export function Projects() {
  const [active, setActive] = useState<Filter>('All')

  const shown = active === 'All' ? projects : projects.filter((project) => project.category === active)

  return (
    <section id="projects" data-section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My work"
          title="Projects I'm building"
          description="Learning by shipping. Demo and repository links stay in a clear 'pending' state until real URLs are added in src/data/projects.ts."
        />

        {/* Filter buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cn(
                'nb-btn px-4 py-2 text-sm',
                active === filter ? 'bg-ink text-paper' : 'bg-surface text-ink',
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}