import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { verifyToken } from '../../services/api'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      await verifyToken()
      setAuthenticated(true)
    } catch (error) {
      localStorage.removeItem('admin_token')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
