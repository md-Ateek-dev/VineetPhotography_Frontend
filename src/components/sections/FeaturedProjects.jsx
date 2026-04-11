import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProjects } from '../../services/api'
import { HiArrowRight, HiLocationMarker, HiCalendar } from 'react-icons/hi'

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects()
      setProjects((data.projects || []).slice(0, 4))
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 relative" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-900/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400/60 font-body text-xs uppercase tracking-[0.3em]">Our Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Featured <span className="gold-text">Projects</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Explore our recent wedding photography projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton rounded-2xl h-80" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 font-body">No projects yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  to={`/projects/${project._id}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[16/10] img-hover-zoom hover-gold-glow transition-all duration-500"
                >
                  {project.coverImage?.url ? (
                    <img
                      src={project.coverImage.url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-200 to-dark-400" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:gold-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-gold-400/70 font-script text-lg mb-3">{project.coupleName}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs font-body">
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="text-gold-400/50" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiCalendar className="text-gold-400/50" />
                        {project.date}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gold-400 text-sm font-body opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      View Project <HiArrowRight />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold-500/30 text-gold-300 font-body font-medium text-sm rounded-full hover:bg-gold-500/10 transition-all duration-300"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
