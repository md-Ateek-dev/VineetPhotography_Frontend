import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getImages, uploadImage, updateImage, deleteImage } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload, HiPhotograph } from 'react-icons/hi'

const categories = ['Wedding', 'Pre-wedding', 'Haldi', 'Mehendi', 'Bridal', 'Other']

export default function AdminImages() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'Wedding' })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data } = await getImages({ limit: 100 })
      setImages(data.images || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setEditingImage(null)
    setForm({ title: '', category: 'Wedding' })
    setFile(null)
    setPreview(null)
    setShowModal(true)
  }

  const openEdit = (image) => {
    setEditingImage(image)
    setForm({ title: image.title, category: image.category })
    setFile(null)
    setPreview(image.imageUrl)
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
    if (!form.title || !form.category) return

    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('category', form.category)
      if (file) formData.append('image', file)

      if (editingImage) {
        await updateImage(editingImage._id, formData)
      } else {
        if (!file) {
          alert('Please select an image')
          setSubmitting(false)
          return
        }
        await uploadImage(formData)
      }

      setShowModal(false)
      fetchImages()
    } catch (error) {
      console.error('Submit error:', error)
      alert(error.response?.data?.message || 'Failed to save image')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      setDeleting(id)
      await deleteImage(id)
      setImages(prev => prev.filter(img => img._id !== id))
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete image')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Images</h1>
          <p className="text-white/40 font-body text-sm">{images.length} images in gallery</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-dark-900 font-body font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all"
        >
          <HiPlus size={18} />
          Upload Image
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton h-48 rounded-xl" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl">
          <HiPhotograph className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-body">No images uploaded yet</p>
          <button onClick={openCreate} className="mt-4 text-gold-400 font-body text-sm hover:underline">
            Upload your first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative rounded-xl overflow-hidden bg-dark-400"
            >
              <img src={image.imageUrl} alt={image.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-dark-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <button
                  onClick={() => openEdit(image)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
                >
                  <HiPencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(image._id)}
                  disabled={deleting === image._id}
                  className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400"
                >
                  <HiTrash size={18} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-body font-medium truncate">{image.title}</p>
                <p className="text-gold-400/50 text-[10px] font-body">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload / Edit Modal */}
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
                <h3 className="font-heading text-lg font-semibold text-white">
                  {editingImage ? 'Edit Image' : 'Upload Image'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                  <HiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">
                    Image {editingImage ? '(leave empty to keep current)' : '*'}
                  </label>
                  <div
                    className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-gold-500/30 transition-colors"
                    onClick={() => document.getElementById('image-file-input').click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                    ) : (
                      <div className="py-4">
                        <HiUpload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                        <p className="text-white/30 text-xs font-body">Click to select image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image-file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                    placeholder="Image title"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-body block mb-2">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-dark-700">{cat}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 gold-gradient text-dark-900 font-body font-semibold rounded-lg disabled:opacity-50 transition-all"
                >
                  {submitting ? 'Saving...' : editingImage ? 'Update Image' : 'Upload Image'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
