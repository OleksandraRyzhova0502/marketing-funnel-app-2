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
      <div className="quiz-screen quiz-screen--quiz2">
        <ProgressBar progress={2 / 10} />
        <h2 className="quiz-screen__question">
          What is your <span className="quiz-screen__highlight">main goal?</span>
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === '☄️ Improve skills'}
            onClick={() => handleAnswer('☄️ Improve skills')}
          >
            ☄️ Improve skills
          </AnswerButton>
          <AnswerButton
            selected={selected === '💪🏻 Boost confidence'}
            onClick={() => handleAnswer('💪🏻 Boost confidence')}
          >
            💪🏻 Boost confidence
          </AnswerButton>
          <AnswerButton
            selected={selected === '🌋 Expand knowledge'}
            onClick={() => handleAnswer('🌋 Expand knowledge')}
          >
            🌋 Expand knowledge
          </AnswerButton>
        </div>
        <BackButton to="/quiz1" />
      </div>
    </ScreenLayout>
  )
}
