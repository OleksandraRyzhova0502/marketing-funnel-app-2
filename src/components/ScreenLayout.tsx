import React from 'react'
import './ScreenLayout.css'

interface ScreenLayoutProps {
  children: React.ReactNode
  showCloseButton?: boolean
  onClose?: () => void
  variant?: 'default' | 'landing'
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showCloseButton = false,
  onClose,
  variant = 'default',
}) => {
  return (
    <div className={`screen-layout ${variant === 'landing' ? 'screen-layout--landing' : ''}`}>
      <div className="screen-layout__background" />
      <div className="screen-layout__container">
        {showCloseButton && onClose && (
          <button
            className="screen-layout__close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

