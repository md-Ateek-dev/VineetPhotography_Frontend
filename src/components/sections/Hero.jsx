import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight, HiCalendar } from 'react-icons/hi'

export default function Hero() {
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 1000], [0, 400])
  const yText = useTransform(scrollY, [0, 800], [0, 250])
  const opacityContent = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background with gradient overlay */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/40 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-600/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        style={{ y: yText, opacity: opacityContent }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-300/80 text-xs font-body uppercase tracking-[0.2em]">
            Lucknow & Barabanki
          </span>
        </motion.div>

        {/* Cursive pre-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script text-gold-400 text-2xl sm:text-3xl md:text-4xl mb-4"
        >
          Vineet Kumar
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-shadow-gold"
        >
          Capturing Timeless
          <br />
          <span className="gold-text">Wedding Stories</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/50 font-body text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Candid & cinematic wedding photography that transforms your special day 
          into everlasting memories. Every frame tells your love story.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/gallery"
            className="group flex items-center gap-2 px-8 py-3.5 border border-gold-500/30 text-gold-300 font-body font-medium text-sm rounded-full hover:bg-gold-500/10 hover:border-gold-400/50 transition-all duration-300"
            id="hero-view-portfolio"
          >
            View Portfolio
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/booking"
            className="flex items-center gap-2 px-8 py-3.5 gold-gradient text-dark-900 font-body font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 hover:scale-105"
            id="hero-book-now"
          >
            <HiCalendar size={18} />
            Book Now
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { num: '200+', label: 'Weddings' },
            { num: '5+', label: 'Years' },
            { num: '10K+', label: 'Photos' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl sm:text-3xl font-bold gold-text">{stat.num}</p>
              <p className="text-white/40 text-xs font-body uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold-400/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
