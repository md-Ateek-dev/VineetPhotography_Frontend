import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getImages } from '../services/api'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const categories = ['All', 'Wedding', 'Pre-wedding', 'Haldi', 'Mehendi', 'Bridal']

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  useEffect(() => {
    setImages([])
    setPage(1)
    fetchImages(1, true)
  }, [activeCategory])

  const fetchImages = async (pageNum = 1, reset = false) => {
    try {
      if (reset) setLoading(true)
      else setLoadingMore(true)

      const params = { page: pageNum, limit: 15 }
      if (activeCategory !== 'All') params.category = activeCategory

      const { data } = await getImages(params)

      if (reset) {
        setImages(data.images || [])
      } else {
        setImages(prev => [...prev, ...(data.images || [])])
      }
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchImages(nextPage)
  }

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (loadingMore || page >= totalPages) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 500) {
      loadMore()
    }
  }, [loadingMore, page, totalPages])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox({ open: false, index: 0 })
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % images.length }))
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }))

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox.open, images.length])

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Photo <span className="gold-text">Gallery</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Browse through our collection of wedding photography
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="masonry-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="masonry-grid-item">
                <div className={`skeleton rounded-xl ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-72'}`} />
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-white/30 font-body text-lg mb-2">No images found</p>
            <p className="text-white/20 font-body text-sm">Try a different category</p>
          </div>
        ) : (
          <>
            <div className="masonry-grid">
              {images.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 15) * 0.03 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-heading text-sm font-semibold">{image.title}</p>
                        <p className="text-gold-400/80 text-xs font-body">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Loading More Indicator */}
            {loadingMore && (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
              </div>
            )}

            {/* Load More Button (fallback) */}
            {page < totalPages && !loadingMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 border border-gold-500/30 text-gold-300 text-sm rounded-full hover:bg-gold-500/10 transition-all"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
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
    </main>
  )
}
