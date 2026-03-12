import { motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <h2 className={`font-bold font-heading mb-3 ${light ? 'text-white' : 'gold-text'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-1 w-24 bg-gold-gradient rounded-full mt-4 ${center ? 'mx-auto' : ''}`}
      />
    </motion.div>
  )
}
