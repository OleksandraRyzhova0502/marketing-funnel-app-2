import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { AnswerButton } from '../components/AnswerButton'
import { BackButton } from '../components/BackButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz7Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_7')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_7']
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
    setAnswer('question_7', formatted)
    track('answear_question_7', { answer: formatted })
    setTimeout(() => navigate('/loader'), 300)
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen quiz-screen--quiz7">
        <ProgressBar progress={7 / 7} />
        <h2 className="quiz-screen__question">
          How comfortable are you with <span className="quiz-screen__highlight">oral sex?</span>
        </h2>
        <div className="quiz-screen__slider-labels">
          <span>I don't<br />like it</span>
          <span> <br />enjoying it</span>
        </div>
        <div className="quiz-screen__slider-line">
          <div className="quiz-screen__slider-line-track"></div>
          <div className="quiz-screen__slider-line-marker quiz-screen__slider-line-marker--left"></div>
          <div className="quiz-screen__slider-line-marker quiz-screen__slider-line-marker--right"></div>
        </div>
        <div className="quiz-screen__number-answers quiz-screen__number-answers--quiz7">
          <AnswerButton
            variant="number"
            selected={selected === '1'}
            onClick={() => handleAnswer('1')}
          >
            1
          </AnswerButton>
          <AnswerButton
            variant="number"
            selected={selected === '2'}
            onClick={() => handleAnswer('2')}
          >
            2
          </AnswerButton>
          <AnswerButton
            variant="number"
            selected={selected === '3'}
            onClick={() => handleAnswer('3')}
          >
            3
          </AnswerButton>
          <AnswerButton
            variant="number"
            selected={selected === '4'}
            onClick={() => handleAnswer('4')}
          >
            4
          </AnswerButton>
        </div>
        <BackButton to="/quiz6" />
      </div>
    </ScreenLayout>
  )
}
