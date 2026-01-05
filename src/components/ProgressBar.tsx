import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  progress: number // 0-1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const percentage = Math.min(100, Math.max(0, progress * 100))

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

