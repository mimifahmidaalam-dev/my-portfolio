/** Types describing the editable content shown on the site. */

export type SkillLevel = 'learning' | 'beginner' | 'intermediate' | 'confident'

export interface Skill {
  id: string
  /** Display name, e.g. "TypeScript". */
  name: string
  /** Two (or few) letter monogram used when no icon exists, e.g. "TS". */
  monogram: string
  /** Flat Tailwind background class for the icon tile, e.g. "bg-brand-blue". */
  color: string
  /** Which grouping the skill appears under. */
  group: 'Languages' | 'Frontend' | 'Tools & Workflow'
  /** Honest, editable proficiency label. */
  level: SkillLevel
  /** Short description shown on the card. */
  description: string
}

export type ProjectCategory = 'Web App' | 'Learning Tool' | 'Portfolio'
export type ProjectStatus = 'Demo' | 'In progress' | 'Live' | 'Concept'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  /** Flat Tailwind background class used for the card thumbnail. */
  color: string
  /** Leave empty until a real deployment exists. */
  demoUrl: string
  /** Leave empty until a real repository exists. */
  repoUrl: string
  tech: string[]
  status: ProjectStatus
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  /** e.g. "2022 — Present" */
  period: string
  status: string
  description: string
}

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  year: string
  /** Optional link to a verifiable credential page. */
  credentialUrl: string
}