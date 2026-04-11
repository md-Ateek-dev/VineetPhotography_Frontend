import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { getImages } from '../../services/api'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const categories = ['All', 'Wedding', 'Pre-wedding', 'Haldi', 'Mehendi', 'Bridal']

export default function GalleryPreview() {
  const [images, setImages] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  useEffect(() => {
    fetchImages()
  }, [activeCategory])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const params = { limit: 12 }
      if (activeCategory !== 'All') params.category = activeCategory
      const { data } = await getImages(params)
      setImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox({ open: false, index: 0 })
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % images.length }))
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }))

  return (
    <section className="py-24 relative" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold-400/60 font-body text-xs uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Our <span className="gold-text">Gallery</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            A glimpse into the beautiful moments we've captured
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-body font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'gold-gradient text-dark-900'
                  : 'border border-white/10 text-white/50 hover:text-gold-300 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="masonry-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="masonry-grid-item">
                <div className={`skeleton rounded-xl ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-72'}`} />
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 font-body">No images found in this category</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {images.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                className="masonry-grid-item"
              >
                <div
                  className="relative group img-hover-zoom rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-heading text-sm font-semibold">{image.title}</p>
                      <p className="text-gold-400/80 text-xs font-body">{image.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold-500/30 text-gold-300 font-body font-medium text-sm rounded-full hover:bg-gold-500/10 transition-all duration-300"
          >
            View Full Gallery
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && images[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button onClick={(e) => { e.stopPropagation(); closeLightbox() }} className="absolute top-6 right-6 text-white/70 hover:text-white z-50">
              <HiX size={32} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-2 glass rounded-full">
              <HiChevronLeft size={32} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-2 glass rounded-full">
              <HiChevronRight size={32} />
            </button>
            <motion.img
              key={lightbox.index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightbox.index].imageUrl}
              alt={images[lightbox.index].title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-heading text-lg">{images[lightbox.index].title}</p>
              <p className="text-gold-400/60 text-sm font-body">{lightbox.index + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
