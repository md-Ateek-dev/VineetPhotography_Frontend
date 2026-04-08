import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getImages, uploadImage, updateImage, deleteImage } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload, HiPhotograph } from 'react-icons/hi'

const categories = ['Wedding', 'Pre-wedding', 'Haldi', 'Mehendi', 'Bridal', 'Other']

// 🔥 IMAGE COMPRESSION FUNCTION (NO LIBRARY)
const compressImage = (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      const maxWidth = 1200
      const scale = maxWidth / img.width

      canvas.width = maxWidth
      canvas.height = img.height * scale

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        const compressedFile = new File([blob], file.name, {
          type: 'image/jpeg',
        })
        resolve(compressedFile)
      }, 'image/jpeg', 0.7) // 🔥 70% quality
    }

    img.src = URL.createObjectURL(file)
  })
}

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

  // 🔥 FILE SELECT + COMPRESS
  const handleFileChange = async (e) => {
    const selected = e.target.files[0]

    if (selected) {
      const compressedFile = await compressImage(selected)

      setFile(compressedFile)
      setPreview(URL.createObjectURL(compressedFile))
    }
  }

  // 🔥 SUBMIT WITH FAST UPLOAD
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.category) return

    try {
      setSubmitting(true)

      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('category', form.category)

      if (file) {
        const compressedFile = await compressImage(file)
        formData.append('image', compressedFile)
      }

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
      console.error(error)
      alert('Upload failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete image?')) return

    try {
      setDeleting(id)
      await deleteImage(id)
      setImages(prev => prev.filter(img => img._id !== id))
    } catch (error) {
      console.error(error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Images</h1>

        <button onClick={openCreate} className="bg-yellow-500 px-4 py-2 rounded">
          Upload
        </button>
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img._id}>
              <img src={img.imageUrl} className="h-40 w-full object-cover" />

              <button onClick={() => handleDelete(img._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80">
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleFileChange}
              />

              {preview && <img src={preview} className="h-40" />}

              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <button type="submit">
                {submitting ? 'Uploading...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}