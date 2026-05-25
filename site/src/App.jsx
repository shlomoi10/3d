import { useEffect } from 'react'
import Lenis from 'lenis'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './App.css'
import logo from './assets/logofull.svg'
import { Palette, Laptop, Smartphone, Mail, MessageCircle } from 'lucide-react'

function App() {

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-[#3356EE]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <div className="flex gap-6">
            <a href="#hero" className="text-gray-300 hover:text-white transition">ראשי</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">אודות</a>
            <a href="#services" className="text-gray-300 hover:text-white transition">שירותים</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">צור קשר</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <div className="mb-8 flex justify-center">
            <DotLottieReact
              src="/logo.json"
              loop
              autoplay
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            בנינו את העתיד
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            פתרונות דיגיטליים מתקדמים לעסק שלך
          </p>
          <button className="bg-[#3356EE] hover:bg-[#2a4bc9] text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
            צור קשר
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">אודותינו</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-gray-300 text-lg">
              <p className="mb-4">
                אנחנו צוות של מפתחים ומעצבים שמתמחים ביצירת חוויות דיגיטליות יוצאות דופן.
              </p>
              <p>
                המטרה שלנו היא לעזור לעסקים לצמוח ולהצליח בעולם הדיגיטלי המתפתח.
              </p>
            </div>
            <div className="bg-[#3356EE]/20 rounded-2xl p-8 border border-[#3356EE]/30">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-white">100+</div>
                  <div className="text-gray-300">פרויקטים</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">50+</div>
                  <div className="text-gray-300">לקוחות</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">5+</div>
                  <div className="text-gray-300">שנות ניסיון</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">24/7</div>
                  <div className="text-gray-300">תמיכה</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">השירותים שלנו</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Palette size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">עיצוב UI/UX</h3>
              <p className="text-gray-300">
                עיצוב ממשקים יפים ואינטואיטיביים שמספקים חוויית משתמש מעולה.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Laptop size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">פיתוח Web</h3>
              <p className="text-gray-300">
                פיתוח אתרים ואפליקציות ווב מודרניות עם הטכנולוגיות החדשות ביותר.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#3356EE]/20 hover:border-[#3356EE]/50 transition">
              <div className="text-[#3356EE] mb-4">
                <Smartphone size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">פיתוח Mobile</h3>
              <p className="text-gray-300">
                פיתוח אפליקציות מובייל לאנדרואיד ואייפון.
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

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#3356EE]/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2026 כל הזכויות שמורות</p>
        </div>
      </footer>
    </div>
  )
}

export default App
