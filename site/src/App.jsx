import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import './App.css'
import logoIcon from './assets/logo.png'
import logoFull from './assets/logofull.svg'
import {
  Database, Users, Link2, CreditCard, Server, RefreshCw,
  Mail, MessageCircle, ArrowLeft, ArrowUpLeft, Menu, X,
  Puzzle, Gamepad2,
} from 'lucide-react'
import CookieConsent from './CookieConsent'

const LottieAnimation = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })))

const NAV_LINKS = [
  { label: 'ראשי', href: '#hero' },
  { label: 'שירותים', href: '#services' },
  { label: 'עבודות', href: '#work' },
  { label: 'צור קשר', href: '#contact' },
]

const SERVICES = [
  { icon: Database, title: 'ניהול תוכן', desc: 'מערכות ניהול תוכן (CMS) מותאמות אישית לצרכי העסק שלכם — לא עוד תבנית גנרית.' },
  { icon: Users, title: 'CRM ולקוחות', desc: 'מערכות ניהול לקוחות ו-CRM מתקדמות שמרכזות את כל המידע במקום אחד.' },
  { icon: Link2, title: 'חיבור מערכות', desc: 'אינטגרציה מלאה מול מערכות חיצוניות, API ושירותי צד שלישי.' },
  { icon: CreditCard, title: 'סליקה ותשלומים', desc: 'חיבור מאובטח לספקי סליקה ומערכות תשלום, כולל חיובים מחזוריים.' },
  { icon: Server, title: 'אחסון שרתים', desc: 'אחסון מקצועי, גיבויים וניהול שרתים — הפרויקט שלכם תמיד באוויר.' },
  { icon: RefreshCw, title: 'תחזוקה שוטפת', desc: 'עדכונים תקופתיים, ניטור ותחזוקה שמונעים תקלות לפני שהן קורות.' },
]

const FEATURED_WORKS = [
  {
    name: 'שבי יעקבוביץ',
    url: 'https://sheviy.com/',
    domain: 'sheviy.com',
    logo: '/logos/sheviy.svg',
    tag: 'אתר + מערכת הרשמה',
    desc: 'אתר חוגים ופעילויות עם מערכת הרשמה מקוונת, דפי מידע, תקנון ונגישות — ותשתית ניהול מלאה מאחורי הקלעים.',
  },
  {
    name: 'המטבח',
    url: 'https://hamitbach.me',
    domain: 'hamitbach.me',
    logo: '/logos/hamitbach.svg',
    tag: 'פלטפורמת קהילה',
    desc: 'קהילה קולינרית מקצה לקצה: מתכונים, טיפים, בלוגים ופורום — עם אזור אישי, דירוגים וחיפוש חכם.',
  },
]

const SIDE_PROJECTS = [
  {
    name: 'חדשות הגזרה',
    url: 'https://chromewebstore.google.com/detail/%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%94%D7%92%D7%99%D7%96%D7%A8%D7%94/ebhlianjnnjjdgolnbhfooemniibijlf',
    logo: '/logos/hagizra.webp',
    badge: 'תוסף Chrome',
    icon: Puzzle,
    desc: 'תוסף דפדפן שמביא את עדכוני "חדשות הגזרה" ישירות אליכם, בזמן אמת.',
  },
  {
    name: 'נביא השקר',
    url: 'https://shlomoi10.github.io/navi_sheker/',
    logo: '/logos/navi-sheker.png',
    badge: 'משחק דפדפן',
    icon: Gamepad2,
    desc: 'משחק קסם ובלוף בדפדפן — לזהות מי משקר ולנצח במהלך הנכון.',
  },
  {
    name: 'משנת יוסף — הדפסת הזמנה',
    url: 'https://chromewebstore.google.com/detail/%D7%9E%D7%A9%D7%A0%D7%AA-%D7%99%D7%95%D7%A1%D7%A3-%D7%94%D7%93%D7%A4%D7%A1%D7%AA-%D7%94%D7%96%D7%9E%D7%A0%D7%94-%D7%9E%D7%A9%D7%95/hpajnhilcbipfkkpclobcollaoailgoo',
    logo: '/logos/mishnat.png',
    badge: 'תוסף Chrome',
    icon: Puzzle,
    desc: 'הדפסת הזמנות ישירות מתוך משנת יוסף — בלחיצה אחת, בלי כל המעברים.',
  },
  {
    name: 'Attachments Top + Video',
    url: 'https://chromewebstore.google.com/detail/gmail-attachments-top-vid/ojpdolfblegmoalpfecdbljcllldljhj',
    logo: '/logos/mail.png',
    badge: 'תוסף Chrome',
    icon: Puzzle,
    desc: 'שדרוג ל-Gmail: קבצים מצורפים עולים לתחילת ההודעה, ונגן וידאו מובנה לסרטונים.',
  },
]

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(26px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ index, eyebrow, title, sub }) {
  return (
    <div className="mb-14">
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold tracking-widest text-[#3356EE]">{index}</span>
          <span className="h-px w-10 bg-[#3356EE]/40"></span>
          <span className="text-sm font-semibold text-[#3356EE]">{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
        {sub && <p className="mt-4 text-lg text-slate-600 max-w-2xl">{sub}</p>}
      </Reveal>
    </div>
  )
}

function NavBar({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    onNavigate(href)
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-[#F7F6F2]/90 backdrop-blur-md border-b border-slate-900/10 shadow-[0_1px_0_rgba(15,23,42,0.04)]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#hero" onClick={(e) => go(e, '#hero')} className="flex items-center gap-2.5">
          <img src={logoIcon} alt="יש קליק" className="h-9 w-9" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            יש<span className="text-[#3356EE]">קליק</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="bg-slate-900 hover:bg-[#3356EE] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            בואו נדבר
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-800" aria-label="תפריט">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-900/10 bg-[#F7F6F2] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="py-3 text-base font-medium text-slate-700 border-b border-slate-900/5 last:border-0">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero({ onNavigate }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-100"></div>
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#3356EE]/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-48 w-[480px] h-[480px] rounded-full bg-[#3356EE]/[0.07] blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-900/10 rounded-full px-4 py-1.5 mb-7 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3356EE]"></span>
              <span className="text-sm font-medium text-slate-700">פיתוח אתרים, מערכות ותוספים</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
              פתרונות דיגיטליים
              <br />
              <span className="text-[#3356EE]">מקצה לקצה.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              אנחנו בונים אתרים, מערכות ניהול ותוספי דפדפן — מהרעיון, דרך העיצוב ועד השורה האחרונה של הקוד. ניהול תוכן, CRM, חיבור למערכות חיצוניות, סליקה ותשלומים.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); onNavigate('#contact') }}
                className="group inline-flex items-center gap-2 bg-[#3356EE] hover:bg-[#2745C9] text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-[#3356EE]/25 hover:shadow-[#3356EE]/40"
              >
                בואו נדבר על הפרויקט
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); onNavigate('#work') }}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-7 py-3.5 rounded-full text-base font-semibold border border-slate-900/10 transition-colors"
              >
                לצפייה בעבודות
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#3356EE]"></span>ליווי אישי מקצה לקצה</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#3356EE]"></span>קוד נקי ומתוחזק</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#3356EE]"></span>זמינות ומענה מהיר</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="hidden lg:block">
          <div className="relative">
            <div className="relative bg-[#0B1220] rounded-3xl p-10 md:p-12 shadow-2xl shadow-slate-900/20 overflow-hidden">
              <div className="absolute inset-0 bg-grid-dark"></div>
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3356EE]/25 blur-3xl"></div>
              <Suspense fallback={<div className="w-full aspect-[1321/498]"></div>}>
                <LottieAnimation src="/logo.json" loop autoplay className="relative w-full h-auto" />
              </Suspense>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl border border-slate-900/10 shadow-lg px-5 py-3 flex items-center gap-3">
              <img src={logoIcon} alt="" className="h-8 w-8" />
              <div className="text-sm">
                <div className="font-bold text-slate-900">yesh-click.com</div>
                <div className="text-slate-500 text-xs">אתרים · מערכות · תוספים</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="py-24 border-t border-slate-900/[0.07]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          index="01"
          eyebrow="שירותים"
          title="כל מה שהעסק צריך, תחת קורת גג אחת"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group h-full bg-white rounded-2xl border border-slate-900/[0.07] p-7 transition-all duration-300 hover:border-[#3356EE]/40 hover:shadow-xl hover:shadow-[#3356EE]/[0.07] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#3356EE]/[0.08] text-[#3356EE] flex items-center justify-center mb-5 transition-colors group-hover:bg-[#3356EE] group-hover:text-white">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ work, delay }) {
  return (
    <Reveal delay={delay}>
      <a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full bg-white rounded-3xl border border-slate-900/[0.07] overflow-hidden transition-all duration-300 hover:border-[#3356EE]/40 hover:shadow-2xl hover:shadow-[#3356EE]/[0.09] hover:-translate-y-1.5"
      >
        {/* Faux browser preview */}
        <div className="bg-slate-100/80 border-b border-slate-900/[0.07] px-5 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
          </div>
          <div className="flex-1 bg-white rounded-full border border-slate-900/[0.07] px-4 py-1 text-xs text-slate-500 text-center truncate" dir="ltr">
            {work.domain}
          </div>
        </div>
        <div className="h-44 md:h-52 bg-gradient-to-br from-[#3356EE]/[0.05] to-slate-100 flex items-center justify-center p-8">
          <img src={work.logo} alt={`${work.name} — לוגו`} className="max-h-24 md:max-h-28 max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#3356EE] bg-[#3356EE]/[0.08] rounded-full px-3 py-1">{work.tag}</span>
            <ArrowUpLeft size={20} className="text-slate-300 transition-all group-hover:text-[#3356EE] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{work.name}</h3>
          <p className="text-slate-600 leading-relaxed">{work.desc}</p>
        </div>
      </a>
    </Reveal>
  )
}

function Portfolio() {
  return (
    <section id="work" className="py-24 border-t border-slate-900/[0.07] bg-white/40">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          index="02"
          eyebrow="עבודות"
          title="פרויקטים שבנינו"
          sub="אתרים ומערכות שחיים ונושמים — עם משתמשים אמיתיים מאחוריהם."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {FEATURED_WORKS.map((w, i) => (
            <WorkCard key={w.name} work={w} delay={i * 100} />
          ))}
        </div>

        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1 bg-slate-900/10"></span>
            <span className="text-sm font-semibold text-slate-500">ועוד פרויקטים מהצד</span>
            <span className="h-px flex-1 bg-slate-900/10"></span>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIDE_PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-white rounded-2xl border border-slate-900/[0.07] p-6 transition-all duration-300 hover:border-[#3356EE]/40 hover:shadow-xl hover:shadow-[#3356EE]/[0.07] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-900/[0.06] flex items-center justify-center overflow-hidden">
                    <img src={p.logo} alt={`${p.name} — לוגו`} className="max-h-10 max-w-10 object-contain" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
                    <p.icon size={12} />
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-[#3356EE] transition-colors">{p.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-slate-900/[0.07]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="relative overflow-hidden bg-[#0B1220] rounded-3xl px-8 py-16 md:py-20 text-center">
            <div className="absolute inset-0 bg-grid-dark"></div>
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#3356EE]/25 blur-3xl"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                יש רעיון? בואו נהפוך אותו למציאות.
              </h2>
              <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
                נשמח לשמוע על הפרויקט שלכם — שיחה קצרה, בלי התחייבות, ונבין יחד איך להתקדם.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:office@yesh-click.com"
                  className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-900 px-7 py-3.5 rounded-full font-semibold transition-colors w-full sm:w-auto justify-center"
                >
                  <Mail size={19} className="text-[#3356EE]" />
                  office@yesh-click.com
                </a>
                <a
                  href="https://wa.me/972556796872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#3356EE] hover:bg-[#2745C9] text-white px-7 py-3.5 rounded-full font-semibold transition-colors w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={19} />
                  055-6796872
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0B1220] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <img src={logoFull} alt="יש קליק" className="h-11 w-auto" />
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); onNavigate(l.href) }} className="text-sm text-slate-400 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© 2026 יש קליק · כל הזכויות שמורות</p>
          <p dir="ltr" className="tracking-wide">yesh-click.com</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  const goTo = (hash) => {
    const el = document.querySelector(hash)
    if (!el) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -72 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-slate-900">
      <NavBar onNavigate={goTo} />
      <CookieConsent />
      <main>
        <Hero onNavigate={goTo} />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer onNavigate={goTo} />
    </div>
  )
}

export default App
