import { motion } from 'motion/react'

/** Short branded loader shown while the app is becoming interactive. */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-6" role="status" aria-label="Loading">
        <motion.div
          className="flex h-20 w-20 items-center justify-center border-[3px] border-ink bg-accent-500 font-display text-2xl text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          FA
        </motion.div>
        <div className="h-3 w-48 border-[3px] border-ink bg-surface">
          <motion.div
            className="h-full bg-brand-yellow"
            animate={{ width: ['8%', '100%'] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}