import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BossPuppyMascot } from '../components/BossPuppyMascot'

/** Full-screen route that showcases the interactive 3D "Boss Puppy" mascot. */
export function Mascot() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Boss Puppy 3D Mascot — Fahmida Alam Mimi'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="h-screen w-full">
      <BossPuppyMascot
        headerAction={
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-white/80 p-2.5 text-sm font-semibold text-gray-700 shadow-md backdrop-blur-md transition-all hover:bg-white active:scale-95"
          >
            <ArrowLeft size={18} className="text-pink-600" />
            <span className="hidden sm:inline">Back to portfolio</span>
          </Link>
        }
      />
    </div>
  )
}
