import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Onboarding } from './pages/Onboarding'
import { Parking } from './pages/Parking'
import { Header } from './components/Header'
import { ParkingDetail } from './pages/ParkingDetail'
import { Profile } from './pages/Profile'
import localStorageService from './utils/localStorage'

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorageService.getOnboardingComplete()
  )

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true)
  }

  return (
    <BrowserRouter>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            localStorageService.getOnboardingComplete()
              ? <Navigate to="/parking" />
              : <Navigate to="/onboarding" />
          } />
          <Route path="/onboarding" element={
            onboardingComplete
              ? <Navigate to="/parking" />
              : <Onboarding onComplete={handleOnboardingComplete} />
          } />
          <Route path="/parking" element={
            onboardingComplete ? <Parking /> : <Navigate to="/onboarding" />
          } />
          <Route path="/parking/:name" element={
            localStorageService.getOnboardingComplete()
              ? <ParkingDetail />
              : <Navigate to="/onboarding" />
          } />
          <Route path="/profile" element={
            localStorageService.getOnboardingComplete()
              ? <Profile />
              : <Navigate to="/onboarding" />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App