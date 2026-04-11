import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-dark-900 font-heading font-bold text-lg">V</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold gold-text">Vineet</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400/60 -mt-1">Photography Studios</p>
              </div>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed">
              Capturing timeless wedding stories with a blend of candid moments and cinematic artistry.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: FaInstagram, href: 'https://instagram.com/vineet_photography_studios', label: 'Instagram' },
                { icon: FaFacebookF, href: '#', label: 'Facebook' },
                { icon: FaYoutube, href: '#', label: 'YouTube' },
                { icon: FaWhatsapp, href: 'https://wa.me/919336258870', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400/60 hover:text-gold-400 hover:border-gold-400/50 hover:bg-gold-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Gallery', 'Projects', 'Book Now'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : link === 'Book Now' ? '/booking' : `/${link.toLowerCase()}`}
                    className="text-white/50 hover:text-gold-300 text-sm font-body transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold-400 mb-6">Services</h4>
            <ul className="space-y-3">
              {['Wedding Photography', 'Pre-Wedding Shoots', 'Candid Photography', 'Cinematic Videos', 'Bridal Portraits'].map((service) => (
                <li key={service}>
                  <span className="text-white/50 text-sm font-body">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-gold-400/60 mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm font-body">Lucknow / Barabanki, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-gold-400/60 flex-shrink-0" />
                <a href="tel:+919336258870" className="text-white/50 hover:text-gold-300 text-sm font-body transition-colors">
                  +91 93362 58870
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-gold-400/60 flex-shrink-0" />
                <a href="mailto:vineetphotography@gmail.com" className="text-white/50 hover:text-gold-300 text-sm font-body transition-colors">
                  vineetphotography@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            © {currentYear} Vineet Photography Studios. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-white/20 hover:text-white/40 text-xs font-body transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
