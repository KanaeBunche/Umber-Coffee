import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OrderAhead from './components/OrderAhead'
import BestSellers from './components/BestSellers'
import CoffeeClub from './components/CoffeeClub'
import GiftCards from './components/GiftCards'
import Rewards from './components/Rewards'
import Dashboard from './components/Dashboard'
import VisitUs from './components/VisitUs'
import Press from './components/Press'
import Footer from './components/Footer'
import OrderModal from './components/Ordermodal'
import PageTransition from './components/PageTransition'
import Club from './pages/Club'
import DashboardPage from './pages/dashboard'
import Staff from './pages/Staff'
import Menu from './pages/Menu'
import About from './pages/About'
import Account from './pages/Account'
import FloatingCTA from './components/Floatingcta'
import './index.css'

function Home({ onOrderClick }) {
  return (
    <PageTransition>
      <main>
        <Navbar onOrderClick={onOrderClick} />
        <Hero onOrderClick={onOrderClick} />
        <OrderAhead onOrderClick={onOrderClick} />
        <BestSellers onOrderClick={onOrderClick} />
        <CoffeeClub />
        <GiftCards />
        <Rewards />
        <Dashboard />
        <VisitUs />
        <Press />
        <Footer />
      </main>
    </PageTransition>
  )
}

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home onOrderClick={() => setOrderOpen(true)} />} />
          <Route path='/club' element={<PageTransition><Club /></PageTransition>} />
          <Route path='/menu' element={<PageTransition><Menu /></PageTransition>} />
          <Route path='/about' element={<PageTransition><About /></PageTransition>} />
          <Route path='/account' element={<PageTransition><Account /></PageTransition>} />
          <Route path='/dashboard' element={<PageTransition><DashboardPage /></PageTransition>} />
          <Route path='/staff' element={<PageTransition><Staff /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
      </AnimatePresence>
      <FloatingCTA />

    </>
  )
}