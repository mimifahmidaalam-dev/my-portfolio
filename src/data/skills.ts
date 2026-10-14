import type { Skill, SkillLevel } from '../types/content'

/**
 * Your skills.
 * ✏️  `level` must be one of:
 *   'learning' | 'beginner' | 'intermediate' | 'confident'
 * The label shown on the card is derived from this — no fake percentages.
 */

const skillLevelLabels: Record<SkillLevel, string> = {
  learning: 'Learning',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  confident: 'Confident',
}

export const skillLevelLabel = (level: SkillLevel): string => skillLevelLabels[level]

/**
 * 0-based strength used only to render the decorative blocks on each card
 * (purely visual — edit `level` to change the meaning shown to visitors).
 */
export const skillLevelDots: Record<SkillLevel, 1 | 2 | 3 | 4> = {
  learning: 1,
  beginner: 2,
  intermediate: 3,
  confident: 4,
}

export const skills: Skill[] = [
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    monogram: 'H5',
    color: 'bg-brand-orange',
    group: 'Frontend',
    level: 'intermediate',
    description: 'Semantic markup, modern layout techniques and clean styling.',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    monogram: 'JS',
    color: 'bg-brand-yellow',
    group: 'Languages',
    level: 'beginner',
    description: 'Core language features, DOM manipulation and async patterns.',
  },
  {
    id: 'react',
    name: 'React',
    monogram: 'R',
    color: 'bg-brand-cyan',
    group: 'Frontend',
    level: 'beginner',
    description: 'Components, hooks, and building interactive user interfaces.',
  },
  {
    id: 'typescript',
    name: 'TypeScript & TSX',
    monogram: 'TS',
    color: 'bg-brand-blue',
    group: 'Languages',
    level: 'learning',
    description: 'Typing React components and applications with TypeScript.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    monogram: 'TW',
    color: 'bg-brand-violet',
    group: 'Frontend',
    level: 'beginner',
    description: 'Utility-first styling, responsive design and theming.',
  },
  {
    id: 'node',
    name: 'Node.js',
    monogram: 'N',
    color: 'bg-brand-green',
    group: 'Tools & Workflow',
    level: 'learning',
    description: 'Running JavaScript outside the browser and simple backends.',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    monogram: 'G',
    color: 'bg-brand-pink',
    group: 'Tools & Workflow',
    level: 'learning',
    description: 'Version control, branching, and sharing code on GitHub.',
  },
  {
    id: 'responsive',
    name: 'Responsive Web Design',
    monogram: 'RWD',
    color: 'bg-accent-500',
    group: 'Frontend',
    level: 'intermediate',
    description: 'Mobile-first layouts, flexbox, grid and media queries.',
  },
  {
    id: 'ai-tools',
    name: 'AI Coding Tools',
    monogram: 'AI',
    color: 'bg-brand-red',
    group: 'Tools & Workflow',
    level: 'confident',
    description: 'Using AI assistants to learn, debug and accelerate development.',
  },
]

/** Group order for the Skills section. */
export const skillGroups = ['Languages', 'Frontend', 'Tools & Workflow'] as const