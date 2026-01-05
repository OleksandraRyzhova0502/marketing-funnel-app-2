import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BackButton.css'

interface BackButtonProps {
  to: string
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate()

  return (
    <button className="back-button" onClick={() => navigate(to)}>
      &lt;&lt;
    </button>
  )
}

