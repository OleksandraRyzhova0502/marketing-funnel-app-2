import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { AnswerButton } from '../components/AnswerButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz1Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_1')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_1']
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
    setAnswer('question_1', formatted)
    track('answear_question_1', { answer: formatted })
    if (answer === 'Sexual skills') {
      setTimeout(() => navigate('/skillsfact'), 300)
    } else if (answer === 'Dating and communication with women') {
      setTimeout(() => navigate('/talkfact'), 300)
    }
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen">
        <ProgressBar progress={1 / 7} />
        <h2 className="quiz-screen__question">
          Which <span className="quiz-screen__highlight">skills</span> would you like to improve?
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === 'Sexual skills'}
            onClick={() => handleAnswer('Sexual skills')}
          >
            Sexual skills
          </AnswerButton>
          <AnswerButton
            selected={selected === 'Dating and communication with women'}
            onClick={() => handleAnswer('Dating and communication with women')}
          >
            Dating and communication with women
          </AnswerButton>
        </div>
      </div>
    </ScreenLayout>
  )
}

