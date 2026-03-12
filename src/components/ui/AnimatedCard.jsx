import { motion } from 'framer-motion'

export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hover = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      className={`glass-card overflow-hidden transition-shadow duration-300 hover:shadow-gold ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
