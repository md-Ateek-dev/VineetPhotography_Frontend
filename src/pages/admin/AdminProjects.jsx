import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjects, createProject, updateProject, deleteProject, removeProjectImage } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload, HiCollection, HiPhotograph } from 'react-icons/hi'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [form, setForm] = useState({ title: '', coupleName: '', date: '', location: '', description: '' })
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setEditingProject(null)
    setForm({ title: '', coupleName: '', date: '', location: '', description: '' })
    setFiles([])
    setPreviews([])
    setShowModal(true)
  }

  const openEdit = (project) => {
    setEditingProject(project)
    setForm({
      title: project.title,
      coupleName: project.coupleName,
      date: project.date,
      location: project.location,
      description: project.description || '',
    })
    setFiles([])
    setPreviews([])
    setShowModal(true)
  }

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected])
    const newPreviews = selected.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removePreview = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.coupleName || !form.date || !form.location) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('coupleName', form.coupleName)
      formData.append('date', form.date)
      formData.append('location', form.location)
      formData.append('description', form.description)
      files.forEach(file => formData.append('images', file))

      if (editingProject) {
        await updateProject(editingProject._id, formData)
      } else {
        await createProject(formData)
      }

      setShowModal(false)
      fetchProjects()
    } catch (error) {
      console.error('Submit error:', error)
      alert(error.response?.data?.message || 'Failed to save project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project and all its images from Cloudinary?')) return
    try {
      setDeleting(id)
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p._id !== id))
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete project')
    } finally {
      setDeleting(null)
    }
  }

  const handleRemoveProjectImage = async (projectId, imageId) => {
    if (!confirm('Remove this image from the project?')) return
    try {
      await removeProjectImage(projectId, imageId)
      fetchProjects()
    } catch (error) {
      console.error('Remove image error:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Projects</h1>
          <p className="text-white/40 font-body text-sm">{projects.length} projects</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-dark-900 font-body font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all"
        >
          <HiPlus size={18} />
          New Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl">
          <HiCollection className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-body">No projects created yet</p>
          <button onClick={openCreate} className="mt-4 text-gold-400 font-body text-sm hover:underline">
            Create your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-5 flex flex-col sm:flex-row gap-4"
            >
              {/* Cover */}
              <div className="w-full sm:w-40 h-32 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                {project.coverImage?.url ? (
                  <img src={project.coverImage.url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-dark-400 flex items-center justify-center">
                    <HiPhotograph className="w-8 h-8 text-white/10" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg font-semibold text-white truncate">{project.title}</h3>
                <p className="text-gold-400/60 font-script text-base">{project.coupleName}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-white/30 text-xs font-body">
                  <span>📍 {project.location}</span>
                  <span>📅 {project.date}</span>
                  <span>📸 {project.images?.length || 0} photos</span>
                </div>

                {/* Project Images Preview */}
                {project.images?.length > 0 && (
                  <div className="flex gap-1 mt-3 overflow-x-auto">
                    {project.images.slice(0, 6).map((img) => (
                      <div key={img._id} className="relative group flex-shrink-0">
                        <img src={img.url} alt="" className="w-12 h-12 object-cover rounded" />
                        <button
                          onClick={() => handleRemoveProjectImage(project._id, img._id)}
                          className="absolute inset-0 bg-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
                        >
                          <HiTrash size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                    {project.images.length > 6 && (
                      <div className="w-12 h-12 bg-dark-400 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white/30 text-[10px]">+{project.images.length - 6}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(project)}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <HiPencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deleting === project._id}
                  className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors text-red-400/60 hover:text-red-400"
                >
                  <HiTrash size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-500 rounded-2xl p-6 w-full max-w-lg border border-white/5 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                  <HiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                    placeholder="Wedding of..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Couple Name *</label>
                    <input
                      type="text"
                      value={form.coupleName}
                      onChange={(e) => setForm({ ...form, coupleName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                      placeholder="Priya & Rahul"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-body block mb-2">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                    placeholder="Lucknow, UP"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 resize-none"
                    placeholder="About this wedding..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">
                    {editingProject ? 'Add More Images' : 'Images'}
                  </label>
                  <div
                    className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-gold-500/30 transition-colors"
                    onClick={() => document.getElementById('project-files-input').click()}
                  >
                    <HiUpload className="w-6 h-6 text-white/20 mx-auto mb-1" />
                    <p className="text-white/30 text-xs font-body">Click to select images (multiple)</p>
                  </div>
                  <input
                    type="file"
                    id="project-files-input"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Previews */}
                  {previews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {previews.map((src, i) => (
                        <div key={i} className="relative">
                          <img src={src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removePreview(i)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <HiX size={12} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 gold-gradient text-dark-900 font-body font-semibold rounded-lg disabled:opacity-50 transition-all"
                >
                  {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
