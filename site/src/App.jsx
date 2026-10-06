import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import './App.css'
import logoIcon from './assets/logo.png'
import logoFull from './assets/logofull.svg'
import {
  Database, Users, Link2, CreditCard, Server, RefreshCw,
  Mail, MessageCircle, ArrowUpLeft, Menu, X,
  Puzzle, Gamepad2, ArrowDown,
} from 'lucide-react'
import CookieConsent from './CookieConsent'

const LottieAnimation = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })))

const NAV_LINKS = [
  { num: '01', label: 'ראשי', href: '#hero' },
  { num: '02', label: 'שירותים', href: '#services' },
  { num: '03', label: 'עבודות', href: '#work' },
  { num: '04', label: 'צור קשר', href: '#contact' },
]

const SERVICES = [
  { icon: Database, title: 'ניהול תוכן', desc: 'מערכות ניהול תוכן (CMS) מותאמות אישית לצרכי העסק שלכם — לא עוד תבנית גנרית.' },
  { icon: Users, title: 'CRM ולקוחות', desc: 'מערכות ניהול לקוחות ו-CRM שמרכזות את כל המידע במקום אחד.' },
  { icon: Link2, title: 'חיבור מערכות', desc: 'אינטגרציה מלאה מול מערכות חיצוניות, API ושירותי צד שלישי.' },
  { icon: CreditCard, title: 'סליקה ותשלומים', desc: 'חיבור מאובטח לספקי סליקה ומערכות תשלום, כולל חיובים מחזוריים.' },
  { icon: Server, title: 'אחסון שרתים', desc: 'אחסון מקצועי, גיבויים וניהול שרתים — הפרויקט שלכם תמיד באוויר.' },
  { icon: RefreshCw, title: 'תחזוקה שוטפת', desc: 'עדכונים תקופתיים וניטור שמונעים תקלות לפני שהן קורות.' },
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
    badge: 'CHROME EXT.',
    icon: Puzzle,
    desc: 'תוסף דפדפן שמביא את עדכוני "חדשות הגזרה" ישירות אליכם, בזמן אמת.',
  },
  {
    name: 'נביא השקר',
    url: 'https://shlomoi10.github.io/navi_sheker/',
    logo: '/logos/navi-sheker.png',
    badge: 'WEB GAME',
    icon: Gamepad2,
    desc: 'משחק קסם ובלוף בדפדפן — לזהות מי משקר ולנצח במהלך הנכון.',
  },
  {
    name: 'משנת יוסף — הדפסת הזמנה',
    url: 'https://chromewebstore.google.com/detail/%D7%9E%D7%A9%D7%A0%D7%AA-%D7%99%D7%95%D7%A1%D7%A3-%D7%94%D7%93%D7%A4%D7%A1%D7%AA-%D7%94%D7%96%D7%9E%D7%A0%D7%94-%D7%9E%D7%A9%D7%95/hpajnhilcbipfkkpclobcollaoailgoo',
    logo: '/logos/mishnat.png',
    badge: 'CHROME EXT.',
    icon: Puzzle,
    desc: 'הדפסת הזמנות ישירות מתוך משנת יוסף — בלחיצה אחת, בלי כל המעברים.',
  },
  {
    name: 'Attachments Top + Video',
    url: 'https://chromewebstore.google.com/detail/gmail-attachments-top-vid/ojpdolfblegmoalpfecdbljcllldljhj',
    logo: '/logos/mail.png',
    badge: 'CHROME EXT.',
    icon: Puzzle,
    desc: 'שדרוג ל-Gmail: קבצים מצורפים עולים לתחילת ההודעה, ונגן וידאו מובנה לסרטונים.',
  },
]

const MARQUEE_ITEMS = ['ניהול תוכן', 'CRM', 'אינטגרציות', 'סליקה ותשלומים', 'אחסון שרתים', 'תחזוקה שוטפת', 'תוספי דפדפן', 'משחקים']

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
        transform: visible ? 'none' : 'translateY(22px)',
        transition: `opacity .65s ease ${delay}ms, transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ index, en, title, sub }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-5 font-mono-label">
          <span className="text-sm text-[#3356EE]">{index}</span>
          <span className="text-xs tracking-[0.25em] text-[#17150F]/50" dir="ltr">{en}</span>
          <span className="h-px flex-1 bg-[#17150F]/15"></span>
          <span className="text-[#17150F]/30 text-lg leading-none">+</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-black text-[#17150F] leading-[1.05]">{title}</h2>
        {sub && <p className="mt-5 text-lg text-[#17150F]/60 max-w-xl leading-relaxed">{sub}</p>}
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
    <header aria-label="ניווט ראשי של יש קליק" className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'bg-[#F3EFE7]/95 backdrop-blur-md border-[#17150F]/15' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#hero" onClick={(e) => go(e, '#hero')} className="flex items-center gap-3">
          <img src={logoIcon} alt="יש קליק - Yesh Click" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-[#17150F]">
            יש<span className="text-[#3356EE]">קליק</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="group flex items-baseline gap-1.5 text-sm font-medium text-[#17150F]/70 hover:text-[#17150F] transition-colors">
              <span className="font-mono-label text-[10px] text-[#3356EE]">{l.num}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="border border-[#17150F] bg-[#17150F] text-[#F3EFE7] hover:bg-[#3356EE] hover:border-[#3356EE] text-sm font-semibold px-5 py-2 transition-colors"
          >
            בואו נדבר
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#17150F]" aria-label="תפריט">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[#17150F]/15 bg-[#F3EFE7] px-5 py-2 flex flex-col">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="py-3.5 text-base font-medium text-[#17150F]/80 border-b border-[#17150F]/10 last:border-0 flex items-baseline gap-3">
              <span className="font-mono-label text-[10px] text-[#3356EE]">{l.num}</span>
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
    <section id="hero" className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dots opacity-60"></div>

      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        {/* Masthead meta row */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-y border-[#17150F]/15 py-2.5 mb-12 md:mb-16 font-mono-label text-[11px] md:text-xs text-[#17150F]/55">
            <span dir="ltr">YESH — CLICK</span>
            <span className="hidden sm:inline">פיתוח אתרים · מערכות · תוספים</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#3356EE]"></span>
              זמין לפרויקטים
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          <div>
            <Reveal>
              <h1 className="font-display font-black text-[#17150F] leading-[0.98] tracking-tight text-[clamp(3.2rem,9.5vw,7.5rem)]">
                אתרים,
                <br />
                <span className="text-[#3356EE]">מערכות</span>
                <br />
                ותוספים.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 text-lg md:text-xl text-[#17150F]/65 leading-relaxed max-w-lg">
                פתרונות דיגיטליים מקצה לקצה — מהרעיון, דרך העיצוב, ועד השורה האחרונה של הקוד. ניהול תוכן, CRM, חיבור מערכות וסליקה.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); onNavigate('#contact') }}
                  className="bg-[#17150F] text-[#F3EFE7] border border-[#17150F] px-8 py-4 text-base font-semibold transition-all hover:bg-[#3356EE] hover:border-[#3356EE] hover:shadow-[6px_6px_0_0_#17150F]"
                >
                  בואו נדבר על הפרויקט
                </a>
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); onNavigate('#work') }}
                  className="group inline-flex items-center gap-2 border border-[#17150F]/25 hover:border-[#17150F] text-[#17150F] px-8 py-4 text-base font-semibold transition-all hover:shadow-[6px_6px_0_0_#3356EE]"
                >
                  לצפייה בעבודות
                  <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Framed logo animation */}
          <Reveal delay={250} className="hidden lg:block">
            <div className="relative border border-[#17150F]/20 bg-[#17150F]">
              <div className="flex items-center justify-between border-b border-[#F3EFE7]/15 px-4 py-2.5 font-mono-label text-[10px] tracking-[0.2em] text-[#F3EFE7]/50" dir="ltr">
                <span>LOGO_ANIMATION</span>
                <span>LOOP / 402FR</span>
              </div>
              <div className="relative p-10">
                <div className="absolute inset-0 bg-dots-dark"></div>
                <Suspense fallback={<div className="w-full aspect-[1321/498]"></div>}>
                  <LottieAnimation src="/logo.json" loop autoplay className="relative w-full h-auto" />
                </Suspense>
              </div>
              <span className="absolute -top-3 -right-3 text-[#17150F]/40 text-xl leading-none select-none">+</span>
              <span className="absolute -bottom-3 -left-3 text-[#17150F]/40 text-xl leading-none select-none">+</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="border-y border-[#17150F]/15 bg-[#17150F] text-[#F3EFE7] overflow-hidden py-4" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap text-sm font-medium tracking-wide">
            {item}
            <span className="text-[#3356EE]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        <SectionHeading
          index="01"
          en="SERVICES"
          title="השירותים שלנו"
          sub="כל מה שהעסק צריך כדי לעבוד דיגיטלי — תחת קורת גג אחת."
        />

        <div className="border-t border-[#17150F]/15">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <div className="group grid grid-cols-[auto_1fr] md:grid-cols-[70px_1fr_1.2fr_auto] items-center gap-x-6 gap-y-2 py-7 md:py-8 border-b border-[#17150F]/15 px-2 md:px-4 transition-colors duration-300 hover:bg-[#17150F] cursor-default">
                <span className="font-mono-label text-sm text-[#3356EE] group-hover:text-[#7A8FFF] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#17150F] group-hover:text-[#F3EFE7] transition-colors">
                  {s.title}
                </h3>
                <p className="col-span-2 md:col-span-1 text-[#17150F]/60 group-hover:text-[#F3EFE7]/70 transition-colors leading-relaxed">
                  {s.desc}
                </p>
                <s.icon size={26} className="hidden md:block text-[#17150F]/30 group-hover:text-[#7A8FFF] transition-colors" />
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
        className="group block h-full bg-[#FAF8F3] border border-[#17150F]/15 transition-all duration-300 hover:border-[#17150F] hover:shadow-[8px_8px_0_0_#3356EE] hover:-translate-x-1 hover:-translate-y-1"
      >
        {/* Faux browser chrome */}
        <div className="border-b border-[#17150F]/15 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-[#17150F]/20"></span>
            <span className="w-2 h-2 bg-[#17150F]/20"></span>
            <span className="w-2 h-2 bg-[#17150F]/20"></span>
          </div>
          <div className="flex-1 border border-[#17150F]/15 bg-[#F3EFE7] px-3 py-1 font-mono-label text-[11px] text-[#17150F]/50 text-center truncate" dir="ltr">
            https://{work.domain}
          </div>
        </div>

        <div className="h-48 md:h-56 bg-dots flex items-center justify-center p-8">
          <img src={work.logo} alt={`${work.name} — לוגו`} className="max-h-24 md:max-h-28 max-w-[72%] object-contain transition-transform duration-500 group-hover:scale-[1.06]" />
        </div>

        <div className="border-t border-[#17150F]/15 p-6 md:p-7">
          <span className="font-mono-label text-[10px] tracking-[0.2em] text-[#3356EE] border border-[#3356EE]/40 px-2.5 py-1 inline-block mb-4">
            {work.tag}
          </span>
          <h3 className="font-display text-3xl font-black text-[#17150F] mb-2.5">{work.name}</h3>
          <p className="text-[#17150F]/60 leading-relaxed">{work.desc}</p>
        </div>

        <div className="border-t border-[#17150F]/15 px-6 md:px-7 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#17150F]">ביקור באתר</span>
          <ArrowUpLeft size={19} className="text-[#17150F]/40 transition-all group-hover:text-[#3356EE] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
        </div>
      </a>
    </Reveal>
  )
}

function Portfolio() {
  return (
    <section id="work" className="py-20 md:py-28 border-t border-[#17150F]/15">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        <SectionHeading
          index="02"
          en="SELECTED WORK"
          title="פרויקטים שבנינו"
          sub="אתרים ומערכות שחיים ונושמים — עם משתמשים אמיתיים מאחוריהם."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {FEATURED_WORKS.map((w, i) => (
            <WorkCard key={w.name} work={w} delay={i * 100} />
          ))}
        </div>

        <Reveal>
          <div className="flex items-baseline gap-4 mb-10 font-mono-label">
            <span className="text-sm text-[#3356EE]">02.5</span>
            <span className="text-xs tracking-[0.25em] text-[#17150F]/50" dir="ltr">SIDE PROJECTS</span>
            <span className="h-px flex-1 bg-[#17150F]/15"></span>
            <span className="text-sm font-semibold text-[#17150F]/60 font-sans">ועוד פרויקטים מהצד</span>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIDE_PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-[#FAF8F3] border border-[#17150F]/15 p-6 transition-all duration-300 hover:border-[#17150F] hover:shadow-[6px_6px_0_0_#17150F] hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 border border-[#17150F]/15 bg-[#F3EFE7] flex items-center justify-center overflow-hidden">
                    <img src={p.logo} alt={`${p.name} — לוגו`} className="max-h-10 max-w-10 object-contain" />
                  </div>
                  <span className="font-mono-label text-[9px] tracking-[0.15em] text-[#17150F]/50 border border-[#17150F]/15 px-2 py-1" dir="ltr">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17150F] mb-2 group-hover:text-[#3356EE] transition-colors">{p.name}</h3>
                <p className="text-sm text-[#17150F]/60 leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#17150F]/40 group-hover:text-[#3356EE] transition-colors">
                  <p.icon size={13} />
                  <span>פתיחה</span>
                  <ArrowUpLeft size={13} />
                </div>
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
    <section id="contact" className="py-20 md:py-28 border-t border-[#17150F]/15">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative bg-[#17150F] text-[#F3EFE7] overflow-hidden">
            <div className="absolute inset-0 bg-dots-dark opacity-70"></div>
            <div className="relative px-6 md:px-14 py-16 md:py-24">
              <div className="flex items-baseline gap-4 mb-8 font-mono-label">
                <span className="text-sm text-[#7A8FFF]">03</span>
                <span className="text-xs tracking-[0.25em] text-[#F3EFE7]/40" dir="ltr">CONTACT</span>
                <span className="h-px flex-1 bg-[#F3EFE7]/15"></span>
                <span className="text-[#F3EFE7]/30 text-lg leading-none">+</span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[1.02] max-w-3xl">
                יש רעיון?
                <br />
                בואו נהפוך אותו <span className="text-[#7A8FFF]">למציאות.</span>
              </h2>

              <p className="mt-6 text-lg text-[#F3EFE7]/60 max-w-xl leading-relaxed">
                שיחה קצרה, בלי התחייבות — ונבין יחד איך להתקדם.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:office@yesh-click.com"
                  className="inline-flex items-center justify-center gap-3 bg-[#F3EFE7] text-[#17150F] px-8 py-4 font-semibold transition-all hover:bg-[#3356EE] hover:text-[#F3EFE7] border border-[#F3EFE7]"
                >
                  <Mail size={18} />
                  office@yesh-click.com
                </a>
                <a
                  href="https://wa.me/972556796872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-[#F3EFE7]/40 hover:border-[#F3EFE7] text-[#F3EFE7] px-8 py-4 font-semibold transition-colors"
                >
                  <MessageCircle size={18} />
                  <span dir="ltr">055-6796872</span>
                </a>
              </div>
            </div>
            <span className="absolute top-4 left-4 text-[#F3EFE7]/25 text-xl leading-none select-none">+</span>
            <span className="absolute bottom-4 right-4 text-[#F3EFE7]/25 text-xl leading-none select-none">+</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#17150F] text-[#F3EFE7] border-t border-[#17150F]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        <div className="py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <img src={logoFull} alt="יש קליק" className="h-10 w-auto" />
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); onNavigate(l.href) }} className="text-sm text-[#F3EFE7]/60 hover:text-[#F3EFE7] transition-colors flex items-baseline gap-1.5">
                <span className="font-mono-label text-[10px] text-[#7A8FFF]">{l.num}</span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-[#F3EFE7]/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-mono-label text-[11px] text-[#F3EFE7]/40">
          <span>© 2026 יש קליק — כל הזכויות שמורות</span>
          <span dir="ltr">YESH-CLICK.COM</span>
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
      lenisRef.current.scrollTo(el, { offset: -64 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F3EFE7] text-[#17150F]">
      <NavBar onNavigate={goTo} />
      <CookieConsent />
      <main>
        <Hero onNavigate={goTo} />
        <Marquee />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer onNavigate={goTo} />
    </div>
  )
}

export default App
