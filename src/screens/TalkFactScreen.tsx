import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './TalkFactScreen.css'

export const TalkFactScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_talkfact')
      hasTrackedView.current = true
    }
  }, [])

  const handleNext = () => {
    navigate('/quiz2')
  }

  return (
    <ScreenLayout>
      <div className="talkfact-screen">
        <div className="talkfact-screen__content">
          <h2 className="talkfact-screen__number">46%</h2>
          <p className="talkfact-screen__text">
            of men admitted to feeling uncomfortable when talking to the opposite sex in a 2025 survey
          </p>
        </div>
        <PrimaryButton onClick={handleNext}>NEXT &gt;&gt;</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}
