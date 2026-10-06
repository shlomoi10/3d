import { useState, useEffect } from 'react'
import Clarity from '@microsoft/clarity'

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => localStorage.getItem('cookieConsent') !== 'accepted')

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted') {
      // Update consent if already consented
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        })
      }
      Clarity.init('wx0osaogjt')
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
    // Update Google consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      })
    }
    // Initialize Clarity
    Clarity.init('wx0osaogjt')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-6 md:max-w-sm z-50 bg-[#FAF8F3] border border-[#17150F] shadow-[8px_8px_0_0_rgba(23,21,15,0.9)] p-5">
      <p className="font-mono-label text-[10px] tracking-[0.2em] text-[#3356EE] mb-2" dir="ltr">COOKIES</p>
      <p className="text-[#17150F]/70 text-sm leading-relaxed">
        אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש ולנתח את השימוש באתר.
        לחיצה על "קבל" מאשרת את השימוש בעוגיות.
      </p>
      <button
        onClick={handleAccept}
        className="mt-4 w-full bg-[#17150F] hover:bg-[#3356EE] text-[#F3EFE7] px-6 py-2.5 text-sm font-semibold transition-colors"
      >
        קבל
      </button>
    </div>
  )
}

export default CookieConsent
