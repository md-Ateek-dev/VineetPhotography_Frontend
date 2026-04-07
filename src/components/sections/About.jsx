import { motion } from 'framer-motion'
import { HiCamera, HiFilm, HiHeart, HiSparkles } from 'react-icons/hi'
import aboutImg from '../../assets/image.png'

export default function About() {

  const services = [
    { icon: HiCamera, title: 'Candid Photography', desc: 'Natural, unposed moments' },
    { icon: HiFilm, title: 'Cinematic Videos', desc: 'Movie-style wedding films' },
    { icon: HiHeart, title: 'Wedding Stories', desc: 'Complete event coverage' },
    { icon: HiSparkles, title: 'Pre-Wedding', desc: 'Beautiful couple shoots' },
  ]

  return (
    <section className="py-24 relative overflow-hidden" id="about">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-600/3 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 img-hover-zoom group">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent z-10" />
              <img
                src={aboutImg}
                alt="Vineet Kumar"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-2 sm:-right-6 glass rounded-2xl p-5 max-w-[220px] z-20"
            >
              <p className="font-heading text-3xl font-bold gold-text">5+</p>
              <p className="text-white/50 text-sm font-body">Years of capturing beautiful moments</p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold-400/60 font-body text-xs uppercase tracking-[0.3em]">
              About the Photographer
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
              Meet <span className="gold-text">Vineet Kumar</span>
            </h2>
            <div className="space-y-4 text-white/50 font-body text-sm leading-relaxed">
              <p>
                Based in <strong className="text-white/70">Lucknow & Barabanki</strong>, I specialize in
                capturing the raw emotions and beautiful moments that make your wedding day truly special.
              </p>
              <p>
                With a passion for <strong className="text-white/70">candid & cinematic wedding photography</strong>,
                I blend traditional artistry with modern storytelling techniques to create images that
                you'll treasure for a lifetime.
              </p>
              <p>
                Every wedding is unique, and I believe in capturing the authentic emotions,
                joyful celebrations, and intimate moments that tell your complete love story.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-default"
                >
                  <service.icon className="w-8 h-8 text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-sm font-semibold text-white mb-1">{service.title}</h3>
                  <p className="text-white/40 text-xs font-body">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
