import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Animation delay in seconds, for staggering grids. */
  delay?: number
}

/**
 * Fades + slides its children into view when they scroll into the viewport.
 * Set to run once, and disabled automatically for reduced-motion users
 * via the MotionConfig in App.tsx.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}