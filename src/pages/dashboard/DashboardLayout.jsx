import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Package, Megaphone, BookOpen, LogOut, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { to: '/dashboard/products', icon: Package,   label: 'المنتجات'   },
  { to: '/dashboard/ads',      icon: Megaphone, label: 'الإعلانات'  },
  { to: '/dashboard/blog',     icon: BookOpen,  label: 'المدونة'    },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const [sideOpen, setSideOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('تم تسجيل الخروج بنجاح')
    navigate('/dashboard/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-gold-700/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold">
            <Shield className="w-5 h-5 text-dark-900" />
          </div>
          <div>
            <p className="text-gold-400 font-bold text-sm">خبراء الخزائن</p>
            <p className="text-gray-500 text-xs">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gold-700/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div className="w-9 h-9 bg-gold-700/30 rounded-full flex items-center justify-center
                          text-gold-400 font-bold text-sm">
            {user?.name?.charAt(0) || 'م'}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{user?.name || 'المدير'}</p>
            <p className="text-gray-500 text-xs capitalize">{user?.role || 'admin'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
               transition-all duration-200 ${
                isActive
                  ? 'bg-gold-gradient text-dark-900 shadow-gold'
                  : 'text-gray-400 hover:text-gold-400 hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer links */}
      <div className="px-3 py-4 border-t border-gold-700/10 space-y-1">
        <a href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400
                     hover:text-gold-400 hover:bg-white/5 transition-all">
          <Home size={18} /> عرض الموقع
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                     text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark-900 flex" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-800 border-l border-gold-700/20 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar overlay */}
      {sideOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-72 bg-dark-800 border-l border-gold-700/20 h-full overflow-y-auto"
          >
            <SidebarContent />
          </motion.div>
          <div className="flex-1 bg-black/50" onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-dark-800 border-b border-gold-700/20 px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden text-gold-400 p-1"
            onClick={() => setSideOpen(v => !v)}
          >
            <Menu size={22} />
          </button>
          <h2 className="text-white font-bold text-lg">لوحة تحكم خبراء الخزائن</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-700/30 rounded-full flex items-center justify-center
                            text-gold-400 text-sm font-bold">
              {user?.name?.charAt(0) || 'م'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
