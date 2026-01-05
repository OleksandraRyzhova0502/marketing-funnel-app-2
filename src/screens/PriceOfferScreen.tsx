import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './PriceScreen.css'

export const PriceOfferScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_price_offer')
      hasTrackedView.current = true
    }
  }, [])

  const handleClose = () => {
    track('clicked_cancel_offer')
    navigate('/error')
  }

  const handlePay = () => {
    track('clicked_pay_offer', { currency: 'USD' })
    navigate('/thanks')
  }

  return (
    <ScreenLayout showCloseButton onClose={handleClose}>
      <div className="price-offer-screen">
        <div className="price-offer-screen__header">
          <span className="price-offer-screen__flame">🔥</span>
          <h1 className="price-offer-screen__title">Personal<br />offer</h1>
        </div>
        <div className="price-offer-screen__card">
          <div className="price-offer-screen__sale-badge">Sale 50%</div>
          <div className="price-offer-screen__duration">12 Weeks</div>
          <div className="price-offer-screen__prices">
            <span className="price-offer-screen__original-price">$36.99</span>
            <span className="price-offer-screen__discounted-price">$18.99</span>
          </div>
          <div className="price-offer-screen__weekly-price">
            $1.59
            <span className="price-offer-screen__weekly-label">per week</span>
          </div>
        </div>
        <PrimaryButton onClick={handlePay}>Get my plan</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

