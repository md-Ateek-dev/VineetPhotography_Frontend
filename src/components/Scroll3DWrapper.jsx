import { motion } from 'framer-motion'

export default function Scroll3DWrapper({ children }) {
  return (
    <div style={{ perspective: "1500px" }} className="w-full overflow-hidden">
      <motion.div
        initial={{ rotateX: 30, scale: 0.9, opacity: 0 }}
        whileInView={{ rotateX: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1] // Custom smooth ease-out curve
        }}
        style={{
          transformOrigin: "top"
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
