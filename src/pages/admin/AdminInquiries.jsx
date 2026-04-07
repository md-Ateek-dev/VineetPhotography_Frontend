import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getInquiries, updateInquiry, deleteInquiry } from '../../services/api'
import { HiTrash, HiMail, HiPhone, HiCalendar, HiCheckCircle, HiClock } from 'react-icons/hi'

const statusColors = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  booked: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const statusIcons = {
  new: HiClock,
  contacted: HiMail,
  booked: HiCheckCircle,
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const { data } = await getInquiries()
      setInquiries(data.inquiries || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiry(id, { status })
      setInquiries(prev => prev.map(inq =>
        inq._id === id ? { ...inq, status } : inq
      ))
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      setDeleting(id)
      await deleteInquiry(id)
      setInquiries(prev => prev.filter(inq => inq._id !== id))
    } catch (error) {
      console.error('Delete error:', error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-white">Inquiries</h1>
        <p className="text-white/40 font-body text-sm">{inquiries.length} total inquiries</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-36 rounded-xl" />)}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl">
          <HiMail className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-body">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry, i) => {
            const StatusIcon = statusIcons[inquiry.status] || HiClock
            return (
              <motion.div
                key={inquiry._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-body font-semibold text-white">{inquiry.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-medium border ${statusColors[inquiry.status]}`}>
                        <StatusIcon size={12} />
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-white/40 text-xs font-body mb-3">
                      <span className="flex items-center gap-1">
                        <HiPhone size={14} className="text-gold-400/40" />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-gold-300">{inquiry.phone}</a>
                      </span>
                      <span className="flex items-center gap-1">
                        <HiCalendar size={14} className="text-gold-400/40" />
                        {inquiry.eventDate}
                      </span>
                      {inquiry.budget && (
                        <span className="text-gold-400/60">💰 {inquiry.budget}</span>
                      )}
                    </div>

                    {inquiry.message && (
                      <p className="text-white/30 text-sm font-body bg-white/5 px-4 py-3 rounded-lg">
                        {inquiry.message}
                      </p>
                    )}

                    <p className="text-white/20 text-[10px] font-body mt-2">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="flex sm:flex-col gap-2">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="new" className="bg-dark-700">New</option>
                      <option value="contacted" className="bg-dark-700">Contacted</option>
                      <option value="booked" className="bg-dark-700">Booked</option>
                    </select>
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      disabled={deleting === inquiry._id}
                      className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors text-red-400/60 hover:text-red-400"
                    >
                      <HiTrash size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
