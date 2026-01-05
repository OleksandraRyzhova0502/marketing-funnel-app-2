import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { track } from '../lib/analytics'
import './LoaderScreen.css'

export const LoaderScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [progress, setProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_loader')
      hasTrackedView.current = true
    }

    startTimeRef.current = Date.now()

    const updateProgress = () => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current
        const newProgress = Math.min(100, (elapsed / 3000) * 100)
        setProgress(newProgress)
        
        // Calculate time spent percentage (multiples of 5 only)
        const timeSpentPercent = Math.round((elapsed / 3000) * 100 / 5) * 5
        setTimeSpent(Math.min(100, timeSpentPercent))

        if (newProgress < 100) {
          animationFrameRef.current = requestAnimationFrame(updateProgress)
        } else {
          navigate('/mail')
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [navigate])

  return (
    <ScreenLayout>
      <div className="loader-screen">
        <p className="loader-screen__text">
          Preparing your<br />
          <span className="loader-screen__highlight">personalized plan</span>
        </p>
        <div className="loader-screen__spinner">
          <div className="loader-screen__percent">{Math.round(progress / 5) * 5}%</div>
        </div>
        <div className="loader-screen__time-spent">{timeSpent}%</div>
      </div>
    </ScreenLayout>
  )
}

