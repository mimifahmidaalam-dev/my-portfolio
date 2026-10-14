import { motion, type Variants } from 'motion/react'
import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialLinks } from '../components/SocialLinks'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** Hero — name, headline, intro, profile photo and CTAs. */
export function Hero() {
  return (
    <section
      id="home"
      data-section
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start gap-6">
          <motion.span
            variants={item}
            className="nb-pill bg-brand-green px-4 py-1.5 text-xs tracking-wide text-black uppercase"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-black" />
            </span>
            {profile.availability}
          </motion.span>

          <motion.div variants={item} className="flex flex-col gap-2">
            <p className="text-sm font-bold tracking-[0.2em] text-accent-600 uppercase dark:text-accent-300">
              Hi, I&apos;m
            </p>
            <h1 className="text-5xl text-ink sm:text-6xl xl:text-7xl">
              Fahmida Alam{' '}
              <span className="inline-block -rotate-1 border-[3px] border-ink bg-brand-yellow px-3 text-black shadow-[6px_6px_0_0_var(--nb-shadow)]">
                Mimi
              </span>
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-lg font-extrabold text-ink">
            {profile.role}
          </motion.p>

          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-ink/70">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-4">
            <a href="#projects" className="nb-btn group bg-accent-500 px-6 py-3 text-sm text-white">
              View My Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href={profile.cvUrl} download className="nb-btn bg-surface px-6 py-3 text-sm text-ink">
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div variants={item}>
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Profile photo — a bold sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-60 sm:w-72 lg:w-80"
        >
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-ink bg-brand-cyan" />
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="relative -rotate-2 border-[3px] border-ink bg-surface p-2 shadow-[8px_8px_0_0_var(--nb-shadow)]"
          >
            <img
              src={profile.profileImage}
              alt="Profile photo of Fahmida Alam Mimi"
              width={480}
              height={480}
              loading="eager"
              className="aspect-square w-full border-[3px] border-ink object-cover"
            />
          </motion.div>

          {/* Floating chips */}
          <span className="nb-pill animate-float absolute -top-4 -left-6 bg-brand-pink px-3 py-1.5 text-xs text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
            React
          </span>
          <span className="nb-pill animate-float absolute top-1/3 -right-5 bg-brand-violet px-3 py-1.5 text-xs text-black shadow-[4px_4px_0_0_var(--nb-shadow)] [animation-delay:1.2s]">
            TS + TSX
          </span>
          <span className="nb-pill animate-float absolute -bottom-5 left-8 bg-brand-green px-3 py-1.5 text-xs text-black shadow-[4px_4px_0_0_var(--nb-shadow)] [animation-delay:2.1s]">
            Tailwind
          </span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-ink/60 transition hover:text-ink md:block"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  )
}