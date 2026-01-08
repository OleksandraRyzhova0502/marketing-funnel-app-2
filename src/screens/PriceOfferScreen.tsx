import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track, trackFacebookPixelPurchase } from '../lib/analytics'
import './PriceScreen.css'

export const PriceOfferScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const buyButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_price_offer')
      hasTrackedView.current = true
    }
  }, [])

  useEffect(() => {
    const buyButton = buyButtonRef.current
    if (!buyButton) return

    const handleBuyClick = (e: MouseEvent) => {
      // Prevent default behavior
      e.preventDefault()
      
      // Fixed price for the offer
      const purchaseValue = 18.99
      
      // Track Amplitude event
      track('clicked_pay_offer', { currency: 'USD', value: purchaseValue })
      
      // Track Meta Pixel Purchase event
      trackFacebookPixelPurchase(purchaseValue, 'USD')
      
      // Add delay before redirect to ensure event is sent successfully
      setTimeout(() => {
        navigate('/thanks')
      }, 400)
    }

    buyButton.addEventListener('click', handleBuyClick)

    return () => {
      buyButton.removeEventListener('click', handleBuyClick)
    }
  }, [navigate])

  const handleClose = () => {
    track('clicked_cancel_offer')
    navigate('/error')
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
        <PrimaryButton ref={buyButtonRef}>Get my plan</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

