import { useState } from 'react'
import { motion } from 'framer-motion'
import { createInquiry } from '../../services/api'
import { HiPhone, HiMail, HiLocationMarker, HiCheckCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', eventDate: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.eventDate) {
      setError('Please fill in all required fields')
      return
    }
    try {
      setLoading(true)
      await createInquiry(form)
      setSubmitted(true)
      setForm({ name: '', phone: '', eventDate: '', budget: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400/60 font-body text-xs uppercase tracking-[0.3em]">Get in Touch</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Let's <span className="gold-text">Connect</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Ready to capture your special moments? Reach out to us
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 mb-8">
              {[
                { icon: HiPhone, label: 'Phone', value: '+91 93362 58870', href: 'tel:+919336258870' },
                { icon: HiMail, label: 'Email', value: 'vineetphotography@gmail.com', href: 'mailto:vineetphotography@gmail.com' },
                { icon: HiLocationMarker, label: 'Location', value: 'Lucknow / Barabanki, UP', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 glass rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-body">{label}</p>
                    {href ? (
                      <a href={href} className="text-white font-body text-sm hover:text-gold-300 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white font-body text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919336258870?text=Hi%20Vineet%2C%20I%20am%20interested%20in%20your%20photography%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-700 text-white font-body font-semibold rounded-xl transition-all duration-300 mb-8"
              id="whatsapp-button"
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </a>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.902!2d81.2368!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399b!2sLucknow!5e0!3m2!1sen!2sin!4v1700000000000!5w0"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center">
                <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-white/50 font-body text-sm mb-6">
                  We've received your inquiry. We'll get back to you soon!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 border border-gold-500/30 text-gold-300 text-sm rounded-full hover:bg-gold-500/10 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Book Your Session</h3>

                {error && (
                  <p className="text-red-400 text-sm font-body bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>
                )}

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    placeholder="Your name"
                    id="contact-name"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    id="contact-phone"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                      id="contact-date"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Budget</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                      id="contact-budget"
                    >
                      <option value="" className="bg-dark-700">Select</option>
                      <option value="Under 25K" className="bg-dark-700">Under ₹25K</option>
                      <option value="25K - 50K" className="bg-dark-700">₹25K - ₹50K</option>
                      <option value="50K - 1L" className="bg-dark-700">₹50K - ₹1L</option>
                      <option value="Above 1L" className="bg-dark-700">Above ₹1L</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    placeholder="Tell us about your event..."
                    id="contact-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 gold-gradient text-dark-900 font-body font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 disabled:opacity-50"
                  id="contact-submit"
                >
                  {loading ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
