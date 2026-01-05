import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './PlanScreen.css'

export const PlanScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_plan')
      hasTrackedView.current = true
    }
  }, [])

  const handleNext = () => {
    track('clicked_next')
    navigate('/price-standart')
  }

  return (
    <ScreenLayout>
      <div className="plan-screen">
        <h1 className="plan-screen__title">
          Your <span className="plan-screen__highlight">personalized</span>
          <br />
          plan is ready:
        </h1>
        <ul className="plan-screen__list">
          <li>
            <span className="plan-screen__number">14</span> poses selected for you;
          </li>
          <li>
            <span className="plan-screen__number">7</span> techniques of intimate massage;
          </li>
          <li>
            <span className="plan-screen__number">4</span> NLP methods;
          </li>
          <li>
            <span className="plan-screen__number">12</span> practical tips;
          </li>
          <li>
            <strong>Cunnilingus</strong> training;
          </li>
          <li>
            And many other useful recommendations from our <span className="plan-screen__highlight">professionals</span> and <span className="plan-screen__highlight">experts</span>;
          </li>
        </ul>
        <PrimaryButton onClick={handleNext}>NEXT &gt;&gt;</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

