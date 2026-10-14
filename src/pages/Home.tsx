import { lazy, Suspense } from 'react'
import { Hero } from '../sections/Hero'

// Below-the-fold sections are lazy-loaded so the initial bundle stays small
// and the page reaches first paint faster.
const About = lazy(() => import('../sections/About').then((m) => ({ default: m.About })))
const Skills = lazy(() => import('../sections/Skills').then((m) => ({ default: m.Skills })))
const Projects = lazy(() => import('../sections/Projects').then((m) => ({ default: m.Projects })))
const Education = lazy(() => import('../sections/Education').then((m) => ({ default: m.Education })))
const Contact = lazy(() => import('../sections/Contact').then((m) => ({ default: m.Contact })))

/** The single landing page that assembles every section. */
export function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </Suspense>
    </>
  )
}