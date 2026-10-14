import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mascot3D } from '../components/Mascot3D'

/** Full-screen route that showcases the 3D Kawaii mascot. */
export function KawaiiMascot() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = '3D Kawaii Mascot — Fahmida Alam Mimi'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-yellow-50/50 to-orange-50">
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-white/80 p-2.5 text-sm font-semibold text-gray-700 shadow-md backdrop-blur-md transition-all hover:bg-white active:scale-95"
        >
          <ArrowLeft size={18} className="text-amber-600" />
          <span className="hidden sm:inline">Back to portfolio</span>
        </Link>
      </div>
      <Mascot3D />
    </div>
  )
}
