import type { Project } from '../types/content'

/**
 * ============================================================
 * ✏️  EDIT YOUR PROJECTS HERE
 * ============================================================
 * Leave `demoUrl` / `repoUrl` EMPTY ("") until you have a real
 * deployment link or GitHub repository — the buttons show a
 * clear "link pending" state instead of a broken link.
 */

export const projects: Project[] = [
  {
    id: 'boss-puppy-mascot',
    title: 'Boss Puppy 3D Interactive Mascot',
    description:
      'An interactive 3D puppy mascot built with Three.js — it tracks your cursor, blinks, wags its tail and reacts to clicks with barks and quotes. Includes suit colour themes, glasses, Boss Mode and synthesized sound effects. Explore the live demo right here on the site.',
    category: 'Web App',
    color: 'bg-brand-violet',
    demoUrl: '/mascot',
    repoUrl: '',
    tech: ['React', 'TypeScript', 'Three.js', 'Web Audio API'],
    status: 'Demo',
  },
  {
    id: 'ai-recipe-video-app',
    title: 'AI Recipe Video Learning App',
    description:
      'A demo concept for finding recipes by food name, ingredient or cuisine — then learning how to cook them through step-by-step instructional videos. Built while exploring React state, search and video embedding.',
    category: 'Web App',
    color: 'bg-brand-pink',
    demoUrl: '',
    repoUrl: '',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'Concept',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    description:
      'The site you are looking at right now — a responsive, animated portfolio built with React, TypeScript and Tailwind CSS. Designed to be fast, accessible, and easy for me to customize and deploy.',
    category: 'Portfolio',
    color: 'bg-brand-cyan',
    demoUrl: '',
    repoUrl: '',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'EmailJS'],
    status: 'In progress',
  },
  {
    id: 'educational-app',
    title: 'Interactive Educational App',
    description:
      'A small quiz / learning app planned to make studying fun — multiple-choice questions, instant feedback, and scores. A focused way for me to practice React state, forms and localStorage.',
    category: 'Learning Tool',
    color: 'bg-brand-yellow',
    demoUrl: '',
    repoUrl: '',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    status: 'Concept',
  },
  {
    id: 'kawaii-mascot-3d',
    title: '3D Kawaii Chibi Mascot',
    description:
      'A cute Three.js mascot with moods, accessories, finishes, auto-rotate, squash-and-stretch on click, gaze tracking, and procedural sound effects.',
    category: 'Web App',
    color: 'bg-brand-yellow',
    demoUrl: '/kawaii-mascot',
    repoUrl: '',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    status: 'Demo',
  },
]