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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-[#3356EE]/20 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-300 text-sm md:text-base text-center md:text-right">
          אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש ולנתח את השימוש באתר.
          <span className="block md:inline md:mr-2">
            לחץ על "קבל" כדי לאשר את השימוש בעוגיות.
          </span>
        </p>
        <button
          onClick={handleAccept}
          className="bg-[#3356EE] hover:bg-[#2a4bc9] text-white px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 whitespace-nowrap"
        >
          קבל
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
