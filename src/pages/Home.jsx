import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import GalleryPreview from '../components/sections/GalleryPreview'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'
import Scroll3DWrapper from '../components/Scroll3DWrapper'

export default function Home() {
  return (
    <main>
      <Hero />
      <Scroll3DWrapper>
        <About />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <GalleryPreview />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <FeaturedProjects />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Testimonials />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Contact />
      </Scroll3DWrapper>
    </main>
  )
}
