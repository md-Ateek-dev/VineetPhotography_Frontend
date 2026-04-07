import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTestimonials, createTestimonial, deleteTestimonial } from '../../services/api'
import { HiPlus, HiTrash, HiX, HiUpload, HiStar } from 'react-icons/hi'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', role: 'Client', message: '', rating: 5 })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data } = await getTestimonials()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setForm({ name: '', role: 'Client', message: '', rating: 5 })
    setFile(null)
    setPreview(null)
    setShowModal(true)
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) {
      alert('Name and message are required')
      return
    }

    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('role', form.role)
      formData.append('message', form.message)
      formData.append('rating', form.rating)
      if (file) formData.append('avatar', file)

      await createTestimonial(formData)
      setShowModal(false)
      fetchTestimonials()
    } catch (error) {
      console.error('Submit error:', error)
      alert(error.response?.data?.message || 'Failed to create testimonial')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      setDeleting(id)
      await deleteTestimonial(id)
      setTestimonials(prev => prev.filter(t => t._id !== id))
    } catch (error) {
      console.error('Delete error:', error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-white/40 font-body text-sm">{testimonials.length} testimonials</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-dark-900 font-body font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all"
        >
          <HiPlus size={18} />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-36 rounded-xl" />)}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl">
          <HiStar className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-body">No testimonials yet</p>
          <button onClick={openCreate} className="mt-4 text-gold-400 font-body text-sm hover:underline">
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              layout
              className="glass rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 mb-3">
                  {testimonial.avatar?.url ? (
                    <img src={testimonial.avatar.url} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-dark-900 font-heading font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-body font-medium text-sm">{testimonial.name}</p>
                    <p className="text-gold-400/50 text-xs font-body">{testimonial.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  disabled={deleting === testimonial._id}
                  className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors text-red-400/60 hover:text-red-400 flex-shrink-0"
                >
                  <HiTrash size={16} />
                </button>
              </div>

              <div className="flex gap-0.5 mb-2">
                {[...Array(testimonial.rating || 5)].map((_, j) => (
                  <HiStar key={j} className="text-gold-400 w-3.5 h-3.5" />
                ))}
              </div>

              <p className="text-white/50 font-body text-sm italic">"{testimonial.message}"</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-500 rounded-2xl p-6 w-full max-w-md border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-semibold text-white">Add Testimonial</h3>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                  <HiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 cursor-pointer hover:border-gold-500/30 transition-colors overflow-hidden flex-shrink-0"
                    onClick={() => document.getElementById('testimonial-avatar').click()}
                  >
                    {preview ? (
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiUpload className="w-5 h-5 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="text-white/30 text-xs font-body">
                    Upload client photo (optional)
                  </div>
                  <input type="file" id="testimonial-avatar" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Role</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                      placeholder="e.g. Wedding Client"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm({ ...form, rating: star })}
                        className={`p-1 ${star <= form.rating ? 'text-gold-400' : 'text-white/20'}`}
                      >
                        <HiStar size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 resize-none"
                    placeholder="What the client said..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 gold-gradient text-dark-900 font-body font-semibold rounded-lg disabled:opacity-50 transition-all"
                >
                  {submitting ? 'Saving...' : 'Add Testimonial'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
