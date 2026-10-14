import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AmbientBackground } from './components/AmbientBackground'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'

// Route-level code splitting keeps the initial JavaScript minimal.
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Mascot = lazy(() => import('./pages/Mascot').then((m) => ({ default: m.Mascot })))
const KawaiiMascot = lazy(() => import('./pages/KawaiiMascot').then((m) => ({ default: m.KawaiiMascot })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

// Skip the brief loader entirely for reduced-motion users.
function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Routes and shared layout. Immersive full-screen routes hide site chrome.
function Shell() {
  const { pathname } = useLocation()
  const immersive = pathname.startsWith('/mascot') || pathname.startsWith('/kawaii-mascot')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <AmbientBackground />
      <ScrollToTop />

      <div className="flex min-h-screen flex-col">
        {immersive ? null : <Navbar />}
        <main id="main" className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mascot" element={<Mascot />} />
              <Route path="/kawaii-mascot" element={<KawaiiMascot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {immersive ? null : <Footer />}
      </div>
    </>
  )
}

// The app may be served from a subpath (e.g. GitHub Pages /my-portfolio/).
// React Router wants a basename without a trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

function App() {
  const [loading, setLoading] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={basename}>
        <AnimatePresence>
          {loading ? (
            <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LoadingScreen />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Shell />
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
