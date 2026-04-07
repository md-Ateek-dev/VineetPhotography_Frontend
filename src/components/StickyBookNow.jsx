import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiCalendar } from 'react-icons/hi'

export default function StickyBookNow() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Link
            to="/booking"
            className="flex items-center gap-2 px-5 py-3 gold-gradient text-dark-900 font-body font-semibold text-sm rounded-full shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-all"
            id="sticky-book-now"
          >
            <HiCalendar size={18} />
            Book Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
