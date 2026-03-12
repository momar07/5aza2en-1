import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const [form, setForm]       = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const { login }               = useAuth()
  const navigate                = useNavigate()
  const location                = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleChange = e =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      toast.error('يرجى إدخال اسم المستخدم وكلمة المرور')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700)) // simulate delay
    const result = login(form.username, form.password)
    setLoading(false)
    if (result.success) {
      toast.success('مرحباً بك في لوحة التحكم!')
      navigate(from, { replace: true })
    } else {
      toast.error(result.message || 'بيانات خاطئة')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%)' }}
    >
      {/* Animated BG rings */}
      {[0,1,2].map(i => (
        <motion.div key={i}
          className="absolute rounded-full border border-gold-700/10 pointer-events-none"
          style={{ width:`${300+i*150}px`, height:`${300+i*150}px` }}
          animate={{ rotate: i%2===0 ? 360 : -360 }}
          transition={{ duration: 18+i*6, repeat:Infinity, ease:'linear' }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-card p-10">

          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center
                         mx-auto mb-4 shadow-gold-lg"
            >
              <Shield className="w-10 h-10 text-dark-900" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white font-heading">لوحة التحكم</h1>
            <p className="text-gray-500 text-sm mt-1">خبراء الخزائن — نظام الإدارة</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gold-500 text-sm mb-2">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-600 w-4 h-4" />
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="أدخل اسم المستخدم"
                  autoComplete="username"
                  className="w-full pr-11 pl-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                             text-white placeholder-gray-600 focus:outline-none focus:border-gold-500
                             transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gold-500 text-sm mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-600 w-4 h-4" />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  className="w-full pr-11 pl-12 py-3 rounded-xl bg-white/5 border border-gold-700/20
                             text-white placeholder-gray-600 focus:outline-none focus:border-gold-500
                             transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-400 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full btn-gold py-4 text-base disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 rounded-full border-2 border-dark-900/30
                                   border-t-dark-900 animate-spin" />
                  جاري التحقق...
                </span>
              ) : (
                'دخول إلى لوحة التحكم 🔐'
              )}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            النظام مخصص للمستخدمين المصرح لهم فقط
          </p>
        </div>
      </motion.div>
    </div>
  )
}
