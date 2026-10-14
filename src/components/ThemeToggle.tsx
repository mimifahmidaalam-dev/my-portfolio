import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/** Dark / light mode toggle, shown in the navbar and the mobile menu. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="nb-btn h-11 w-11 p-0 bg-brand-cyan text-black"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}