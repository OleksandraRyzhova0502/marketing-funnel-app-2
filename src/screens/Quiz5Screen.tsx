import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { AnswerButton } from '../components/AnswerButton'
import { BackButton } from '../components/BackButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz5Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_5')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_5']
    if (savedAnswer) {
      // Convert formatted answer back to original (replace underscores with spaces)
      const originalAnswer = savedAnswer.replace(/_/g, ' ')
      setSelected(originalAnswer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswer = (answer: string) => {
    setSelected(answer)
    const formatted = formatAnswerText(answer)
    setAnswer('question_5', formatted)
    track('answear_question_5', { answer: formatted })
    setTimeout(() => navigate('/quiz6'), 300)
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen">
        <ProgressBar progress={5 / 8} />
        <h2 className="quiz-screen__question">
          Do you currently have<br /><span className="quiz-screen__highlight">a partner?</span>
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === 'No partner'}
            onClick={() => handleAnswer('No partner')}
          >
            No partner
          </AnswerButton>
          <AnswerButton
            selected={selected === 'In a relationship'}
            onClick={() => handleAnswer('In a relationship')}
          >
            In a relationship
          </AnswerButton>
          <AnswerButton
            selected={selected === 'Have multiple partners'}
            onClick={() => handleAnswer('Have multiple partners')}
          >
            Have multiple partners
          </AnswerButton>
        </div>
        <BackButton to="/quiz4" />
      </div>
    </ScreenLayout>
  )
}
