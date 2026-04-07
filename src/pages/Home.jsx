import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import GalleryPreview from '../components/sections/GalleryPreview'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <GalleryPreview />
      <FeaturedProjects />
      <Testimonials />
      <Contact />
    </main>
  )
}
