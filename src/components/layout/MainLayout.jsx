import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

const pageVariants = {
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.25 } },
}

export default function MainLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
