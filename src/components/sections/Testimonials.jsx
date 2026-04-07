import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTestimonials } from '../../services/api'
import { HiStar } from 'react-icons/hi'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data } = await getTestimonials()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback testimonials if none in DB
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    { _id: '1', name: 'Priya & Rahul', role: 'Wedding Client', message: 'Vineet captured our wedding so beautifully! Every photo tells a story and brings back the emotions of that magical day. Highly recommended!', rating: 5 },
    { _id: '2', name: 'Anita & Suresh', role: 'Wedding Client', message: 'The candid shots were absolutely stunning. Vineet has an amazing eye for detail and captured moments we didn\'t even know were happening.', rating: 5 },
    { _id: '3', name: 'Kavita & Amit', role: 'Pre-Wedding Client', message: 'Our pre-wedding shoot was a dream come true. The cinematic style and creative compositions exceeded all our expectations!', rating: 5 },
  ]

  return (
    <section className="py-24 relative" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-900/[0.03] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400/60 font-body text-xs uppercase tracking-[0.3em]">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            What Our <span className="gold-text">Couples Say</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Real stories from our happy couples
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, j) => (
                  <HiStar key={j} className="text-gold-400 w-4 h-4" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/60 font-body text-sm leading-relaxed mb-6 italic">
                "{testimonial.message}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-dark-900 font-heading font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-body font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gold-400/50 text-xs font-body">{testimonial.role || 'Client'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
