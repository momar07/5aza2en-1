import { motion } from 'framer-motion'

/**
 * AnimatedCard
 * - variant="dark"  → glass-card (للداشبورد والأقسام الداكنة)
 * - variant="light" → light-card (للصفحات الفاتحة)
 * - variant="none"  → بدون class تلقائي (تحكم كامل عبر className)
 */
export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hover = true,
  variant = 'none',
  ...props
}) {
  const baseClass =
    variant === 'dark'  ? 'glass-card overflow-hidden transition-shadow duration-300 hover:shadow-gold' :
    variant === 'light' ? 'light-card overflow-hidden' :
    'overflow-hidden'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
