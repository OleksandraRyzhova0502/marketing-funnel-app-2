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
      <div className="quiz-screen quiz-screen--quiz3">
        <ProgressBar progress={5 / 10} />
        <h2 className="quiz-screen__question">
          Which of these would you like <span className="quiz-screen__highlight">to learn about</span> the most?
        </h2>
        <div className="quiz-screen__answers">
          <AnswerButton
            selected={selected === "🐈‍⬛ Sex positions"}
            onClick={() => handleAnswer("🐈‍⬛ Sex positions")}
          >
            🐈‍⬛ Sex positions
          </AnswerButton>
          <AnswerButton
            selected={selected === "🖐 Intimate massage"}
            onClick={() => handleAnswer("🖐 Intimate massage")}
          >
            🖐 Intimate massage
          </AnswerButton>
          <AnswerButton
            selected={selected === "🫦 Oral sex"}
            onClick={() => handleAnswer("🫦 Oral sex")}
          >
            🫦 Oral sex
          </AnswerButton>
          <AnswerButton
            selected={selected === "🔞 All of this"}
            onClick={() => handleAnswer("🔞 All of this")}
          >
            🔞 All of this
          </AnswerButton>
        </div>
        <BackButton to="/quiz4" />
      </div>
    </ScreenLayout>
  )
}
