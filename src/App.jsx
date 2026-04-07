import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import BookingPage from './pages/BookingPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminImages from './pages/admin/AdminImages'
import AdminProjects from './pages/admin/AdminProjects'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import StickyBookNow from './components/StickyBookNow'
import SmoothScroll from './components/SmoothScroll'
import PageTransition from './components/PageTransition'

function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-dark-700">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={
            <PageTransition>
              <Navbar />
              <Home />
              <Footer />
              <StickyBookNow />
            </PageTransition>
          } />
          <Route path="/gallery" element={
            <PageTransition>
              <Navbar />
              <GalleryPage />
              <Footer />
              <StickyBookNow />
            </PageTransition>
          } />
          <Route path="/projects" element={
            <PageTransition>
              <Navbar />
              <ProjectsPage />
              <Footer />
              <StickyBookNow />
            </PageTransition>
          } />
          <Route path="/projects/:id" element={
            <PageTransition>
              <Navbar />
              <ProjectDetail />
              <Footer />
              <StickyBookNow />
            </PageTransition>
          } />
          <Route path="/booking" element={
            <PageTransition>
              <Navbar />
              <BookingPage />
              <Footer />
            </PageTransition>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <PageTransition>
                <AdminLayout />
              </PageTransition>
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="images" element={<AdminImages />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
    </SmoothScroll>
  )
}

export default App
