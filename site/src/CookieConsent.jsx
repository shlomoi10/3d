import { useState, useEffect } from 'react'
import Clarity from '@microsoft/clarity'

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    } else if (consent === 'accepted') {
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
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-6 md:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-900/10 rounded-2xl shadow-2xl shadow-slate-900/10 p-5">
      <p className="text-slate-600 text-sm leading-relaxed">
        אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש ולנתח את השימוש באתר.
        לחיצה על "קבל" מאשרת את השימוש בעוגיות.
      </p>
      <button
        onClick={handleAccept}
        className="mt-4 w-full bg-[#3356EE] hover:bg-[#2745C9] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
      >
        קבל
      </button>
    </div>
  )
}

export default CookieConsent
