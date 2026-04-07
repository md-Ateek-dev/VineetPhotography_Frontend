import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getStats } from '../../services/api'
import { HiPhotograph, HiCollection, HiMail, HiStar, HiBell } from 'react-icons/hi'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data } = await getStats()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = stats ? [
    { label: 'Total Images', value: stats.totalImages, icon: HiPhotograph, color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400' },
    { label: 'Projects', value: stats.totalProjects, icon: HiCollection, color: 'from-purple-500/20 to-purple-600/5', iconColor: 'text-purple-400' },
    { label: 'Inquiries', value: stats.totalInquiries, icon: HiMail, color: 'from-green-500/20 to-green-600/5', iconColor: 'text-green-400' },
    { label: 'Testimonials', value: stats.totalTestimonials, icon: HiStar, color: 'from-gold-500/20 to-gold-600/5', iconColor: 'text-gold-400' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: HiBell, color: 'from-red-500/20 to-red-600/5', iconColor: 'text-red-400' },
  ] : []

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-2xl font-bold text-white mb-2"
      >
        Dashboard
      </motion.h1>
      <p className="text-white/40 font-body text-sm mb-8">Welcome back to your admin panel</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${card.color} border border-white/5 rounded-xl p-5`}
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                <span className="font-heading text-2xl font-bold text-white">{card.value}</span>
              </div>
              <p className="text-white/40 text-xs font-body">{card.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Info */}
      <div className="mt-8 glass rounded-xl p-6">
        <h3 className="font-heading text-lg font-semibold text-white mb-4">Quick Guide</h3>
        <ul className="space-y-3 text-white/50 font-body text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-0.5">•</span>
            <span><strong className="text-white/70">Images:</strong> Upload gallery photos with categories (Wedding, Pre-wedding, Haldi, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-0.5">•</span>
            <span><strong className="text-white/70">Projects:</strong> Create wedding albums with multiple photos, couple details, and location</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-0.5">•</span>
            <span><strong className="text-white/70">Inquiries:</strong> View and manage booking requests from clients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-0.5">•</span>
            <span><strong className="text-white/70">Testimonials:</strong> Add client reviews to showcase on the website</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
