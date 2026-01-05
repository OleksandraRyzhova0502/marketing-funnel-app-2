import { useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { initAnalytics } from './lib/analytics'
import { useUTMStore } from './store/utmStore'
import { StartScreen } from './screens/StartScreen'
import { Quiz1Screen } from './screens/Quiz1Screen'
import { Quiz2Screen } from './screens/Quiz2Screen'
import { Quiz3Screen } from './screens/Quiz3Screen'
import { Quiz4Screen } from './screens/Quiz4Screen'
import { Quiz5Screen } from './screens/Quiz5Screen'
import { Quiz6Screen } from './screens/Quiz6Screen'
import { Quiz7Screen } from './screens/Quiz7Screen'
import { Quiz8Screen } from './screens/Quiz8Screen'
import { LoaderScreen } from './screens/LoaderScreen'
import { PlanScreen } from './screens/PlanScreen'
import { MailScreen } from './screens/MailScreen'
import { PriceStandartScreen } from './screens/PriceStandartScreen'
import { PriceOfferScreen } from './screens/PriceOfferScreen'
import { ThanksScreen } from './screens/ThanksScreen'
import { ErrorScreen } from './screens/ErrorScreen'

function App() {
  const initializeUTM = useUTMStore((state) => state.initialize)

  useEffect(() => {
    // Initialize UTM parameters on first app load
    // This reads from URL and sessionStorage, and stores in the global store
    initializeUTM()

    // Initialize analytics (sets UTM params as Amplitude user properties)
    initAnalytics()
  }, [initializeUTM])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/quiz1" element={<Quiz1Screen />} />
        <Route path="/quiz2" element={<Quiz2Screen />} />
        <Route path="/quiz3" element={<Quiz3Screen />} />
        <Route path="/quiz4" element={<Quiz4Screen />} />
        <Route path="/quiz5" element={<Quiz5Screen />} />
        <Route path="/quiz6" element={<Quiz6Screen />} />
        <Route path="/quiz7" element={<Quiz7Screen />} />
        <Route path="/quiz8" element={<Quiz8Screen />} />
        <Route path="/loader" element={<LoaderScreen />} />
        <Route path="/plan" element={<PlanScreen />} />
        <Route path="/mail" element={<MailScreen />} />
        <Route path="/price-standart" element={<PriceStandartScreen />} />
        <Route path="/price-offer" element={<PriceOfferScreen />} />
        <Route path="/thanks" element={<ThanksScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default App

