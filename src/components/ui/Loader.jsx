import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-14 h-14 rounded-full border-4 border-gold-700/30 border-t-gold-400"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0,1,0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="text-gold-400 font-bold text-lg"
      >
        خبراء الخزائن
      </motion.p>
    </div>
  )
}
