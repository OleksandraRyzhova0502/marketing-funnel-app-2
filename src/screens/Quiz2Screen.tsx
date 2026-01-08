import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { AnswerButton } from '../components/AnswerButton'
import { BackButton } from '../components/BackButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz2Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_2')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_2']
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
    setAnswer('question_2', formatted)
    track('answear_question_2', { answer: formatted })
    setTimeout(() => navigate('/quiz3'), 300)
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen">
        <ProgressBar progress={2 / 7} />
        <h2 className="quiz-screen__question">
          How do you rate<br />
          your <span className="quiz-screen__highlight">skill level</span> in this?
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === 'Newbie'}
            onClick={() => handleAnswer('Newbie')}
          >
            Newbie
          </AnswerButton>
          <AnswerButton
            selected={selected === 'Tried something before'}
            onClick={() => handleAnswer('Tried something before')}
          >
            Tried something before
          </AnswerButton>
          <AnswerButton
            selected={selected === 'Had some prior experience'}
            onClick={() => handleAnswer('Had some prior experience')}
          >
            Had some prior experience
          </AnswerButton>
        </div>
        <BackButton to="/quiz1" />
      </div>
    </ScreenLayout>
  )
}
