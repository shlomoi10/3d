import { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import './App.css'
import logo from './assets/logofull.svg'
import { Database, Users, Link, CreditCard, Server, RefreshCw, Mail, MessageCircle } from 'lucide-react'

function NavBar({ logoSrc }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-[#3356EE]/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
        <div className="flex gap-6">
          <a href="#hero" className="text-gray-300 hover:text-white transition">ראשי</a>
          <a href="#services" className="text-gray-300 hover:text-white transition">שירותים</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">צור קשר</a>
        </div>
      </div>
    </nav>
  )
}

function FooterBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-6 px-6 border-t border-[#3356EE]/20 bg-gray-900/90 backdrop-blur">
      <div className="max-w-6xl mx-auto text-center text-gray-400">
        <p>© 2026 כל הזכויות שמורות</p>
      </div>
    </footer>
  )
}

const LottieAnimation = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })))

function App() {
  const topLayerRef = useRef(null)
  const [topLayerHeight, setTopLayerHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'rtl',
      gestureDirection: 'vertical',
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    const el = topLayerRef.current
    if (!el) return

    const update = () => {
      setTopLayerHeight(el.offsetHeight)
      setViewportHeight(window.innerHeight)
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const contentMaxScroll = Math.max(0, topLayerHeight - viewportHeight)
  const contentScroll = Math.min(Math.max(scrollY, 0), contentMaxScroll)
  const revealOffset = Math.min(Math.max(scrollY - contentMaxScroll, 0), viewportHeight)
  const topTransformY = -(contentScroll + revealOffset)

  const railHeight = topLayerHeight && viewportHeight ? topLayerHeight + viewportHeight : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavBar logoSrc={logo} />
      <FooterBar />

      {/* Scroll rail: defines the *only* scroll range (top page + one extra viewport for reveal) */}
      <div style={{ height: railHeight ?? '200vh' }}></div>

      {/* Fixed viewport: both layers live here so we never get extra natural scroll */}
      <div className="fixed inset-0 z-0">
        {/* Bottom layer (second page) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060A12] via-[#0B1020] to-[#060A12] flex items-end justify-center">
          <div className="pb-28">
            <Suspense fallback={<div className="w-72 h-72 md:w-96 md:h-96"></div>}>
              <LottieAnimation
                src="/logo.json"
                loop
                autoplay
                className="w-72 h-72 md:w-96 md:h-96"
              />
            </Suspense>
          </div>
        </div>

        {/* Top layer (first page) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={topLayerRef}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-28"
            style={{ transform: `translateY(${topTransformY}px)` }}
          >
            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center justify-center">
              <div className="text-center px-6">
                <div className="mb-8 flex justify-center">
                  <Suspense fallback={<div className="w-64 h-64 md:w-80 md:h-80"></div>}>
                    <LottieAnimation
                      src="/logo.json"
                      loop
                      autoplay
                      className="w-64 h-64 md:w-80 md:h-80"
                    />
                  </Suspense>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  פתרונות דיגיטליים מקצה לקצה
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  ניהול תוכן, CRM, חיבור למערכות חיצוניות, סליקה ותשלומים
                </p>
                <a href="#contact" className="bg-[#3356EE] hover:bg-[#2a4bc9] text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 inline-block">
                  צור קשר
                </a>
              </div>
            </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">השירותים שלנו</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Database size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ניהול תוכן</h3>
              <p className="text-gray-300">
                מערכות ניהול תוכן (CMS) מותאמות אישית לצרכי העסק שלך.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Users size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">CRM ולקוחות</h3>
              <p className="text-gray-300">
                מערכות ניהול לקוחות ו-CRM מתקדמות לניהול יעיל.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Link size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">חיבור מערכות</h3>
              <p className="text-gray-300">
                חיבור למערכות חיצוניות ואינטגרציה מלאה.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <CreditCard size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">סליקה ותשלומים</h3>
              <p className="text-gray-300">
                חיבור לספקי סליקה ומערכות תשלום מאובטחות.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Server size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">אחסון שרתים</h3>
              <p className="text-gray-300">
                אחסון מקצועי וניהול שרתים לפרויקטים שלך.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <RefreshCw size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">עדכונים תקופתיים</h3>
              <p className="text-gray-300">
                תחזוקה שוטפת ועדכונים תקופתיים למערכות.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">צור קשר</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="mailto:office@yesh-click.com" className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Mail size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">אימייל</h3>
              <p className="text-gray-300">office@yesh-click.com</p>
            </a>
            <a href="https://wa.me/972556796872" target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <MessageCircle size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">וואטסאפ</h3>
              <p className="text-gray-300">055-6796872</p>
            </a>
          </div>
        </div>
      </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
