import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const number  = import.meta.env.VITE_WHATSAPP_NUMBER || '966500000000'
  const message = encodeURIComponent(
    import.meta.env.VITE_WHATSAPP_MESSAGE || 'مرحباً، أريد الاستفسار عن خدماتكم'
  )
  const href = `https://wa.me/${number}?text=${message}`

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{   scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{ background: '#25D366' }}
        >
          {/* Ping ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: '#25D366' }} />
          {/* WhatsApp SVG */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.784 6.867L2 30l7.338-1.766A13.917 13.917 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 01-5.832-1.594l-.418-.248-4.35 1.047 1.066-4.243-.272-.436A11.46 11.46 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.556c-.344-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.344-.889 1.12-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.767-1.707-1.022-.912-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.7.155-.154.344-.4.516-.602.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.602.086-.916.43-.315.344-1.2 1.174-1.2 2.862s1.228 3.32 1.4 3.55c.172.23 2.418 3.69 5.857 5.174.818.353 1.457.564 1.955.72.822.262 1.57.225 2.161.137.659-.099 2.04-.833 2.328-1.637.287-.805.287-1.494.2-1.638-.086-.143-.315-.23-.66-.4z"/>
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
