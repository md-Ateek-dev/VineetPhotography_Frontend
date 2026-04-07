import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjectById } from '../services/api'
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const { data } = await getProjectById(id)
      setProject(data.project)
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox({ open: false, index: 0 })
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % project.images.length }))
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + project.images.length) % project.images.length }))

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox.open, project?.images?.length])

  if (loading) {
    return (
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="skeleton h-12 w-48 rounded-lg mb-8" />
          <div className="skeleton h-96 rounded-2xl mb-8" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-48 rounded-xl" />)}
          </div>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 font-body text-xl mb-4">Project not found</p>
          <Link to="/projects" className="text-gold-400 font-body text-sm hover:underline">
            ← Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/projects" className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 font-body text-sm mb-8 transition-colors">
            <HiArrowLeft /> Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {project.title}
          </h1>
          <p className="font-script text-gold-400 text-2xl sm:text-3xl mb-4">{project.coupleName}</p>
          <div className="flex flex-wrap items-center gap-6 text-white/40 font-body text-sm">
            <span className="flex items-center gap-2">
              <HiLocationMarker className="text-gold-400/50" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <HiCalendar className="text-gold-400/50" />
              {project.date}
            </span>
            <span className="text-gold-400/40">{project.images?.length || 0} photos</span>
          </div>
          {project.description && (
            <p className="text-white/40 font-body text-sm mt-4 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          )}
        </motion.div>

        {/* Images Grid */}
        {project.images && project.images.length > 0 ? (
          <div className="masonry-grid">
            {project.images.map((img, index) => (
              <motion.div
                key={img._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="masonry-grid-item"
              >
                <div
                  className="img-hover-zoom rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.url}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 font-body">No images in this project yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && project.images[lightbox.index] && (
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
              src={project.images[lightbox.index].url}
              alt={`${project.title} - ${lightbox.index + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-heading text-lg">{project.title}</p>
              <p className="text-gold-400/60 text-sm font-body">{lightbox.index + 1} / {project.images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
