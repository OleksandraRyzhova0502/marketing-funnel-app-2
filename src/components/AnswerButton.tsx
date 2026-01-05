import React from 'react'
import './AnswerButton.css'

interface AnswerButtonProps {
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
  variant?: 'text' | 'number'
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  children,
  onClick,
  selected = false,
  variant = 'text',
}) => {
  return (
    <button
      className={`answer-button answer-button--${variant} ${
        selected ? 'answer-button--selected' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

