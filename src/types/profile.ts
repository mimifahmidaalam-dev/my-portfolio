/** Reusable, editable profile and navigation information. */

export type Theme = 'dark' | 'light'

export interface NavLinkItem {
  /** Must match the `id` of the section it scrolls to. */
  id: string
  label: string
}

export interface SocialLinkItem {
  id: string
  label: string
  /** Full URL, including https:// (or `mailto:` for email). */
  href: string
}

export interface Profile {
  name: string
  firstName: string
  /** Shown in the hero heading + footer. */
  nameDisplay: string
  /** Short professional headline. */
  role: string
  /** One-line introduction shown under the heading. */
  intro: string
  /** Editable paragraphs for the About section. */
  about: {
    heading: string
    paragraphs: string[]
    highlights: { id: string; title: string; description: string }[]
  }
  /** Public contact details. Safe to display. */
  contact: {
    email: string
    location: string
  }
  /** Path to the profile photo (public/images/...). */
  profileImage: string
  /** Path to the downloadable CV file (public/...). */
  cvUrl: string
  /** Shown as a badge in the hero. */
  availability: string
}