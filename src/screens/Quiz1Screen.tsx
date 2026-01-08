import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './Quiz1Screen.css'

export const Quiz1Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_landing')
      hasTrackedView.current = true
    }
  }, [])

  const handleStartQuiz = () => {
    track('clicked_start_quiz')
    navigate('/quiz2')
  }

  return (
    <ScreenLayout variant="landing">
      <div className="landing-screen">
        <h1 className="landing-screen__title">
          Improve your <span className="landing-screen__highlight">sexual skills</span>
        </h1>
        <div className="landing-screen__tags">
          <div className="landing-screen__tag">poses</div>
          <div className="landing-screen__tag">intimate massage</div>
          <div className="landing-screen__tag">NLP methods</div>
          <div className="landing-screen__tag">oral sex</div>
          <div className="landing-screen__tag">seduction techniques</div>
        </div>
        <PrimaryButton onClick={handleStartQuiz}>
          START
        </PrimaryButton>
        <p className="landing-screen__disclaimer">
          For best experience, we personalize the course to suit your preferences
        </p>
      </div>
    </ScreenLayout>
  )
}
