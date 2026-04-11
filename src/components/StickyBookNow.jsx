import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiCalendar } from 'react-icons/hi'

export default function StickyBookNow() {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden flex"
      style={{ perspective: '1000px' }}
    >
      <Link
        to="/booking"
        className="flex items-center gap-2 px-3 py-4 gold-gradient text-dark-900 font-body font-semibold text-sm shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-all rounded-l-lg border border-r-0 border-gold-400/50 group"
        id="sticky-book-now"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
      >
        <HiCalendar size={18} className="transform rotate-90 group-hover:scale-110 transition-transform" />
        <span className="tracking-widest uppercase text-xs mt-1">Book Now</span>
      </Link>
    </motion.div>
  )
}
