import React from 'react'
import './PrimaryButton.css'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, onClick, disabled = false, variant = 'primary' }, ref) => {
    return (
      <button
        ref={ref}
        className={`primary-button primary-button--${variant}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
)

PrimaryButton.displayName = 'PrimaryButton'

