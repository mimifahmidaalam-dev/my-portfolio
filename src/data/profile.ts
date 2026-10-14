import type { NavLinkItem, Profile, SocialLinkItem } from '../types/profile'

/**
 * ============================================================
 * ✏️  EDIT YOUR PERSONAL INFORMATION HERE
 * ============================================================
 * Everything else on the site is built from this file.
 */

export const profile: Profile = {
  name: 'Fahmida Alam Mimi',
  firstName: 'Fahmida',
  nameDisplay: 'Fahmida Alam Mimi',
  role: 'Aspiring Frontend Developer | React & AI-Assisted Development',
  intro:
    'I am a beginner frontend developer learning to build clean, responsive websites with React, TypeScript and Tailwind CSS — and I use AI coding tools to learn faster and build smarter.',
  about: {
    heading: 'Turning curiosity into clean, responsive interfaces',
    paragraphs: [
      "Hello! I'm Fahmida, a Sociology student at Government Rajendra College (National University, Bangladesh) who discovered a passion for web development along the way. I'm currently learning modern frontend technologies step by step — from semantic HTML and CSS to React, TypeScript and Tailwind CSS.",
      'What excites me most is how AI-assisted development speeds up learning: I use AI coding tools to explain concepts, review my code, and help me build real projects. My goal is to grow into a confident frontend developer who ships accessible, responsive, and well-structured web experiences — and I am actively looking for internships and junior developer opportunities.',
    ],
    highlights: [
      {
        id: 'responsive',
        title: 'Responsive by default',
        description: 'I build mobile-first layouts that look great on any screen.',
      },
      {
        id: 'ai-assisted',
        title: 'AI-assisted learning',
        description: 'I use AI tools to learn faster and write better, cleaner code.',
      },
      {
        id: 'modern-stack',
        title: 'Modern stack',
        description: 'React, TypeScript, Tailwind CSS and Vite for fast, typed apps.',
      },
      {
        id: 'detail-minded',
        title: 'Detail-minded',
        description: 'Semantic HTML, accessibility, and consistent design systems.',
      },
    ],
  },
  contact: {
    email: 'your.email@example.com',
    location: 'Bangladesh',
  },
  // BASE_URL keeps these working when the site is served from a subpath (GitHub Pages).
  profileImage: `${import.meta.env.BASE_URL}images/profile-placeholder.svg`,
  cvUrl: `${import.meta.env.BASE_URL}Fahmida-Alam-Mimi-CV.pdf`,
  availability: 'Open to internships & junior frontend roles',
}

/** Links shown in the navigation bar. Order matches the page sections. */
export const navLinks: NavLinkItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Social / public links.
 * 🔁 Replace the placeholder URLs with your real profiles before publishing.
 */
export const socialLinks: SocialLinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/your-github-username',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/your-linkedin-username',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:your.email@example.com',
  },
]