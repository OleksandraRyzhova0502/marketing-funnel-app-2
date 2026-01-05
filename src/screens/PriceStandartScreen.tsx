import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import { useFunnelStore, PlanWeeks } from '../store/funnelStore'
import './PriceScreen.css'

export const PriceStandartScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [selectedWeeks, setSelectedWeeks] = useState<PlanWeeks>(12)
  const setSelectedPlanWeeks = useFunnelStore((state) => state.setSelectedPlanWeeks)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_price_standart')
      hasTrackedView.current = true
    }
  }, [])

  const handleClose = () => {
    track('clicked_cancel_standart')
    navigate('/price-offer')
  }

  const handlePlanClick = (weeks: PlanWeeks) => {
    setSelectedWeeks(weeks)
    setSelectedPlanWeeks(weeks)
    track(`clicked_plan_${weeks}`)
  }

  const handlePay = () => {
    track('Purchase', { weeks: selectedWeeks, currency: 'USD' })
    navigate('/thanks')
  }

  const plans = [
    { weeks: 4 as PlanWeeks, originalPrice: 16.99, discountedPrice: 13.49, weeklyPrice: 3.35, salePercent: 20 },
    { weeks: 12 as PlanWeeks, originalPrice: 36.99, discountedPrice: 24.99, weeklyPrice: 1.99, salePercent: 32, popular: true },
    { weeks: 24 as PlanWeeks, originalPrice: 79.99, discountedPrice: 41.99, weeklyPrice: 1.69, salePercent: 48 },
  ]

  return (
    <ScreenLayout showCloseButton onClose={handleClose}>
      <div className="price-screen">
        <h1 className="price-screen__title">Choose your plan</h1>
        <p className="price-screen__subtitle">
          Get <span className="price-screen__highlight">unlimited access</span> to a library of courses designed to enhance your sexual skills.
        </p>
        <div className="price-screen__plans">
          {plans.map((plan) => (
            <div
              key={plan.weeks}
              className={`price-screen__plan ${selectedWeeks === plan.weeks ? 'price-screen__plan--selected' : ''} ${plan.popular ? 'price-screen__plan--popular' : ''}`}
              onClick={() => handlePlanClick(plan.weeks)}
            >
              {plan.popular && <span className="price-screen__popular-badge">🔥</span>}
              <div className="price-screen__sale-badge">Sale {plan.salePercent}%</div>
              <div className="price-screen__plan-duration">{plan.weeks} Weeks</div>
              <div className="price-screen__plan-prices">
                <span className="price-screen__original-price">${plan.originalPrice.toFixed(2)}</span>
                <span className="price-screen__discounted-price">${plan.discountedPrice.toFixed(2)}</span>
              </div>
              <div className="price-screen__weekly-price">
                ${plan.weeklyPrice.toFixed(2)}
                <span className="price-screen__weekly-label">per week</span>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={handlePay}>Get my plan</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

