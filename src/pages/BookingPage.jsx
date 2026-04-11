import Contact from '../components/sections/Contact'
import { motion } from 'framer-motion'
import Scroll3DWrapper from '../components/Scroll3DWrapper'

export default function BookingPage() {
  return (
    <main className="pt-28 pb-10 min-h-screen">
      <Scroll3DWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-0"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Book Your <span className="gold-text">Session</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Let us capture your special moments
          </p>
        </motion.div>
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Contact />
      </Scroll3DWrapper>
    </main>
  )
}
