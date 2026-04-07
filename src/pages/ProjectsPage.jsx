import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProjects } from '../services/api'
import { HiLocationMarker, HiCalendar, HiPhotograph } from 'react-icons/hi'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="gold-text">Projects</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Complete wedding photography albums from our recent projects
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton rounded-2xl h-96" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32">
            <HiPhotograph className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-body text-lg">No projects yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/projects/${project._id}`}
                  className="group block glass rounded-2xl overflow-hidden hover-gold-glow transition-all duration-500"
                >
                  {/* Cover Image */}
                  <div className="aspect-[4/3] overflow-hidden img-hover-zoom">
                    {project.coverImage?.url ? (
                      <img
                        src={project.coverImage.url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-dark-200 to-dark-400 flex items-center justify-center">
                        <HiPhotograph className="w-12 h-12 text-white/10" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-white group-hover:text-gold-300 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gold-400/60 font-script text-lg mb-3">{project.coupleName}</p>
                    <div className="flex items-center gap-4 text-white/30 text-xs font-body">
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="text-gold-400/40" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiCalendar className="text-gold-400/40" />
                        {project.date}
                      </span>
                    </div>
                    <div className="mt-3 text-white/20 text-xs font-body">
                      {project.images?.length || 0} photos
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
