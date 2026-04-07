import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HiOutlineViewGrid,
  HiOutlinePhotograph,
  HiOutlineCollection,
  HiOutlineMail,
  HiOutlineStar,
  HiOutlineLogout,
  HiMenu,
  HiX,
  HiHome,
} from 'react-icons/hi'

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: HiOutlineViewGrid },
  { name: 'Images', path: '/admin/images', icon: HiOutlinePhotograph },
  { name: 'Projects', path: '/admin/projects', icon: HiOutlineCollection },
  { name: 'Inquiries', path: '/admin/inquiries', icon: HiOutlineMail },
  { name: 'Testimonials', path: '/admin/testimonials', icon: HiOutlineStar },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark-700 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-white/5 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center">
                  <span className="text-dark-900 font-heading font-bold text-sm">V</span>
                </div>
                <div>
                  <h2 className="font-heading text-sm font-semibold gold-text">Admin Panel</h2>
                  <p className="text-white/30 text-[10px] font-body">Vineet Photography</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50">
                <HiX size={20} />
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <link.icon size={20} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/5 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
            >
              <HiHome size={20} />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-body text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              <HiOutlineLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-dark-700/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/50 hover:text-white"
            >
              <HiMenu size={24} />
            </button>
            <div className="hidden lg:block">
              <h2 className="font-heading text-lg font-semibold text-white">
                {sidebarLinks.find(l => l.path === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-dark-900 font-bold text-xs">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
