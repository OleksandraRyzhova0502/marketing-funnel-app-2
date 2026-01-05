import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './MailScreen.css'

// Email validation regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates email format using basic regex pattern
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

export const MailScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  
  // Email state management
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const setEmailStore = useFunnelStore((state) => state.setEmail)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_mail')
      hasTrackedView.current = true
    }
  }, [])

  /**
   * Handles email input changes
   * Updates email state and validates format in real-time
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setEmail(value)
    setIsValid(validateEmail(value))
  }

  const handleEmailFocus = () => {
    track('mail_input_click')
  }

  /**
   * Handles form submission
   * Validates email before proceeding with signup flow
   */
  const handleSubmit = () => {
    if (isValid && email) {
      // Store email in global state for use in authentication/signup flow
      setEmailStore(email)
      track('Lead', { email })
      navigate('/plan')
    } else {
      setHasTriedSubmit(true)
    }
  }

  return (
    <ScreenLayout>
      <div className="mail-screen">
        <h2 className="mail-screen__title">
          <span className="mail-screen__highlight" style={{ fontSize: '45px' }}>Your plan is ready!</span>
          <br />
          <span style={{ fontSize: '20px', fontWeight: '400' }}>Enter email to receive the course</span>
        </h2>
        <input
          type="email"
          className={`mail-screen__input ${!isValid && hasTriedSubmit ? 'mail-screen__input--error' : ''}`}
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
        />
        <PrimaryButton onClick={handleSubmit} disabled={!isValid}>
          Get my plan
        </PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

