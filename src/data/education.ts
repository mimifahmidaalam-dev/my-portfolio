import type { CertificateItem, EducationItem } from '../types/content'

/**
 * ============================================================
 * ✏️  EDIT YOUR EDUCATION & CERTIFICATIONS HERE
 * ============================================================
 * Add new entries to the arrays below and the page updates itself.
 */

export const education: EducationItem[] = [
  {
    id: 'bss-sociology',
    degree: 'Bachelor of Social Science (BSS) in Sociology',
    institution: 'Government Rajendra College',
    location: 'Bangladesh',
    period: '2022 — 2026',
    status: 'Ongoing',
    description:
      'Currently completing my degree under the National University of Bangladesh. Alongside sociology, I am self-studying modern web development and AI-assisted coding.',
  },
]

/**
 * Certifications & training.
 * Keep this list honest — only add certifications you have actually earned.
 * Each card shows the issuer, year and an optional verification link.
 */
export const certifications: CertificateItem[] = [
  // Example entry (remove or replace):
  // {
  //   id: 'my-cert',
  //   title: 'Responsive Web Design',
  //   issuer: 'freeCodeCamp',
  //   year: '2026',
  //   credentialUrl: 'https://www.freecodecamp.org/certification/your-username',
  // },
]

/** Suggested topics to add later (shown only when certifications is empty). */
export const certificationSuggestions: string[] = [
  'HTML & CSS fundamentals',
  'JavaScript / web development',
  'React or frontend roadmap',
  'IT support / computer training',
]