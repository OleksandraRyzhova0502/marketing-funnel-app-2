import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { ProgressBar } from '../components/ProgressBar'
import { BackButton } from '../components/BackButton'
import { track, formatAnswerText } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './QuizScreen.css'

export const Quiz9Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selected, setSelected] = useState<string | null>(null)
  const setAnswer = useFunnelStore((state) => state.setAnswer)
  const answers = useFunnelStore((state) => state.answers)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_question_9')
      hasTrackedView.current = true
    }
    
    // Load saved answer if exists (only on mount)
    const savedAnswer = answers['question_9']
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
    setAnswer('question_9', formatted)
    track('answear_question_9', { answer: formatted })
    setTimeout(() => navigate('/quiz10'), 300)
  }

  return (
    <ScreenLayout>
      <div className="quiz-screen">
        <ProgressBar progress={9 / 10} />
        <h2 className="quiz-screen__question">
          What <span className="quiz-screen__highlight--orange">body size ratio</span> with a partner do you like?
        </h2>
        <div className="quiz-screen__image-answers quiz-screen__image-answers--quiz9">
          <div className="quiz-screen__image-row">
            <button
              className={`quiz-screen__image-answer ${selected === 'Option 1' ? 'quiz-screen__image-answer--selected' : ''}`}
              onClick={() => handleAnswer('Option 1')}
            >
              <img 
                src="/quiz9-option1.jpeg" 
                alt="Partner option 1"
                className="quiz-screen__image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </button>
            <button
              className={`quiz-screen__image-answer ${selected === 'Option 2' ? 'quiz-screen__image-answer--selected' : ''}`}
              onClick={() => handleAnswer('Option 2')}
            >
              <img 
                src="/quiz9-option2.jpg" 
                alt="Partner option 2"
                className="quiz-screen__image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </button>
          </div>
          <div className="quiz-screen__image-row">
            <button
              className={`quiz-screen__image-answer ${selected === 'Option 3' ? 'quiz-screen__image-answer--selected' : ''}`}
              onClick={() => handleAnswer('Option 3')}
            >
              <img 
                src="/quiz9-option3.jpeg" 
                alt="Partner option 3"
                className="quiz-screen__image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </button>
            <button
              className={`quiz-screen__image-answer ${selected === 'Option 4' ? 'quiz-screen__image-answer--selected' : ''}`}
              onClick={() => handleAnswer('Option 4')}
            >
              <img 
                src="/quiz9-option4.jpg" 
                alt="Partner option 4"
                className="quiz-screen__image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </button>
          </div>
        </div>
        <BackButton to="/quiz8" />
      </div>
    </ScreenLayout>
  )
}
