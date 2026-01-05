import React, { useEffect, useRef } from 'react'
import { ScreenLayout } from '../components/ScreenLayout'
import { track } from '../lib/analytics'
import './ErrorScreen.css'

export const ErrorScreen: React.FC = () => {
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_error_page')
      hasTrackedView.current = true
    }
  }, [])

  return (
    <ScreenLayout>
      <div className="error-screen">
        <h1 className="error-screen__title">Oops, something went wrong...</h1>
        <p className="error-screen__text">Please, try again later.</p>
      </div>
    </ScreenLayout>
  )
}

