import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { GradientBackground } from './components/GradientBackground'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/TrackingPage'
import ContractsPage from './pages/ContractsPage'
import ProfilePage from './pages/ProfilePage'
import SupportPage from './pages/SupportPage'

function App() {
  return (
    <div className='min-h-screen bg-dark-bg'>
      <GradientBackground />
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tracking' element={<TrackingPage />} />
        <Route path='/contracts' element={<ContractsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/support' element={<SupportPage />} />
      </Routes>
    </div>
  )
}

export default App
