import React, { useEffect, useRef } from 'react'
import { ScreenLayout } from '../components/ScreenLayout'
import { track, trackFacebookPixel } from '../lib/analytics'
import './ThanksScreen.css'

export const ThanksScreen: React.FC = () => {
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_thanks_page')
      // Track Facebook Pixel event for registration completion
      trackFacebookPixel('CompleteRegistration')
      hasTrackedView.current = true
    }
  }, [])

  return (
    <ScreenLayout>
      <div className="thanks-screen">
        <h1 className="thanks-screen__title">
          Thank you for your<br />
          interest in our<br />
          product!
        </h1>
        <p className="thanks-screen__text">
          We've sent the course file to<br />
          your email and will notify<br />
          you as soon as it becomes<br />
          available.
        </p>
      </div>
    </ScreenLayout>
  )
}

