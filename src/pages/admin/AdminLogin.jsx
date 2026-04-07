import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginAdmin } from '../../services/api'
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    try {
      setLoading(true)
      const { data } = await loginAdmin(form)
      localStorage.setItem('admin_token', data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4">
            <HiLockClosed className="w-8 h-8 text-dark-900" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/40 font-body text-sm mt-1">Vineet Photography</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm font-body">
              {error}
            </div>
          )}

          <div>
            <label className="text-white/50 text-xs font-body block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              placeholder="admin@vineetphotography.com"
              id="admin-email"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs font-body block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                placeholder="••••••••"
                id="admin-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 gold-gradient text-dark-900 font-body font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 disabled:opacity-50"
            id="admin-login-submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
