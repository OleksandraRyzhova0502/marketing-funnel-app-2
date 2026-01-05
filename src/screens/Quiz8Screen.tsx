import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { AnswerButton } from '../components/AnswerButton'
import { BackButton } from '../components/BackButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz8Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_8')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_8']
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
    setAnswer('question_8', formatted)
    track('answear_question_8', { answer: formatted })
    setTimeout(() => navigate('/loader'), 300)
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen">
        <ProgressBar progress={8 / 8} />
        <h2 className="quiz-screen__question">
          Which <span className="quiz-screen__highlight">problems</span> occur most often?
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === "Don't know what to do"}
            onClick={() => handleAnswer("Don't know what to do")}
          >
            Don't know what to do
          </AnswerButton>
          <AnswerButton
            selected={selected === "Experience pain"}
            onClick={() => handleAnswer("Experience pain")}
          >
            Experience pain
          </AnswerButton>
          <AnswerButton
            selected={selected === "Feel shy / afraid to make a mistake"}
            onClick={() => handleAnswer("Feel shy / afraid to make a mistake")}
          >
            Feel shy / afraid to make a mistake
          </AnswerButton>
          <AnswerButton
            selected={selected === "None of these"}
            onClick={() => handleAnswer("None of these")}
          >
            None of these
          </AnswerButton>
        </div>
        <BackButton to="/quiz7" />
      </div>
    </ScreenLayout>
  )
}
