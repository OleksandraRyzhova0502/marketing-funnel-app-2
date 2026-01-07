import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './SkillsFactScreen.css'

export const SkillsFactScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_skillsfact')
      hasTrackedView.current = true
    }
  }, [])

  const handleNext = () => {
    navigate('/quiz2')
  }

  return (
    <ScreenLayout>
      <div className="skillsfact-screen">
        <div className="skillsfact-screen__content">
          <h2 className="skillsfact-screen__number">44%</h2>
          <p className="skillsfact-screen__text">
            of men with over a year of experience still <strong>feel insecure</strong> during sex
          </p>
        </div>
        <div className="skillsfact-screen__content">
          <h2 className="skillsfact-screen__number">36%</h2>
          <p className="skillsfact-screen__text">
            of men worry about their body during sex
          </p>
        </div>
        <PrimaryButton onClick={handleNext}>NEXT &gt;&gt;</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}
