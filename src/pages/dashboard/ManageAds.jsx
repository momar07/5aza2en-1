import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Megaphone, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useData } from '@/context/DataContext'

const emptyForm = {
  title: '', subtitle: '', description: '',
  discount: '', validUntil: '', active: true,
  color: 'from-gold-900 to-dark-800',
}

const colorOptions = [
  { label: 'ذهبي داكن',   value: 'from-gold-900 to-dark-800'       },
  { label: 'أزرق ليلي',   value: 'from-blue-900 to-secondary'      },
  { label: 'أخضر عميق',   value: 'from-green-900 to-dark-800'      },
  { label: 'أحمر فاخر',   value: 'from-red-900 to-dark-800'        },
  { label: 'بنفسجي',      value: 'from-purple-900 to-secondary'    },
]

export default function ManageAds() {
  const { ads, addAd, updateAd, deleteAd } = useData()
  const [modal, setModal]   = useState(false)
  const [form,  setForm]    = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = (a) => { setForm({ ...a }); setEditId(a.id); setModal(true) }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleToggleActive = (id, currentState) => {
    updateAd(id, { active: !currentState })
    toast.success(!currentState ? 'تم تفعيل الإعلان' : 'تم إيقاف الإعلان')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title) { toast.error('يرجى إدخال عنوان الإعلان'); return }
    if (editId) {
      updateAd(editId, form)
      toast.success('تم تحديث الإعلان ✅')
    } else {
      addAd(form)
      toast.success('تم إضافة الإعلان ✅')
    }
    setModal(false)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`حذف إعلان "${title}"؟`)) {
      deleteAd(id)
      toast.success('تم الحذف')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Megaphone className="text-gold-400" size={26} /> إدارة الإعلانات
          </h1>
          <p className="text-gray-500 text-sm mt-1">{ads.length} إعلان — {ads.filter(a=>a.active).length} نشط</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={openAdd} className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} /> إعلان جديد
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label:'إجمالي الإعلانات', value: ads.length,                       color:'from-blue-900/40 to-blue-800/20',  border:'border-blue-700/20'  },
          { label:'إعلانات نشطة',     value: ads.filter(a=>a.active).length,   color:'from-green-900/40 to-green-800/20', border:'border-green-700/20' },
          { label:'إعلانات موقوفة',   value: ads.filter(a=>!a.active).length,  color:'from-red-900/40 to-red-800/20',    border:'border-red-700/20'   },
        ].map(({ label, value, color, border }) => (
          <div key={label} className={`glass-card p-5 bg-gradient-to-br ${color} border ${border}`}>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Ads Cards */}
      {ads.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <Megaphone size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 text-lg">لا توجد إعلانات — أضف إعلاناً جديداً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {ads.map((ad, i) => (
              <motion.div
                key={ad.id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ delay: i*0.07 }}
                className={`glass-card p-6 bg-gradient-to-br ${ad.color || 'from-gold-900 to-dark-800'}
                            relative overflow-hidden`}
              >
                {/* Status badge */}
                <span className={`absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-full ${
                  ad.active
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {ad.active ? '● نشط' : '● موقوف'}
                </span>

                <div className="flex items-start justify-between mb-3 ml-20">
                  <div>
                    <h3 className="text-white font-bold text-lg">{ad.title}</h3>
                    <p className="text-gold-300 text-sm">{ad.subtitle}</p>
                  </div>
                  {ad.discount && (
                    <span className="bg-gold-gradient text-dark-900 font-bold text-xl
                                     px-3 py-1.5 rounded-xl shadow-gold shrink-0 mr-3">
                      {ad.discount}
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-sm line-clamp-2 mb-4">{ad.description}</p>
                {ad.validUntil && (
                  <p className="text-gold-500 text-xs mb-4">⏰ ساري حتى: {ad.validUntil}</p>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleToggleActive(ad.id, ad.active)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      ad.active
                        ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {ad.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    {ad.active ? 'إيقاف' : 'تفعيل'}
                  </button>
                  <motion.button
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => openEdit(ad)}
                    className="px-3 py-1.5 rounded-lg bg-blue-900/30 text-blue-400
                               hover:bg-blue-900/50 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Pencil size={12} /> تعديل
                  </motion.button>
                  <motion.button
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => handleDelete(ad.id, ad.title)}
                    className="px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400
                               hover:bg-red-900/50 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={12} /> حذف
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setModal(false) }}
          >
            <motion.div
              initial={{ scale:0.9, y:30 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9 }}
              transition={{ type:'spring', stiffness:260, damping:22 }}
              className="bg-dark-800 border border-gold-700/20 rounded-2xl w-full max-w-xl
                         max-h-[90vh] overflow-y-auto shadow-gold-lg"
            >
              <div className="flex items-center justify-between p-6 border-b border-gold-700/20">
                <h2 className="text-xl font-bold text-white">
                  {editId ? '✏️ تعديل الإعلان' : '➕ إعلان جديد'}
                </h2>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white p-1">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {[
                  { name:'title',    label:'العنوان *',            placeholder:'عرض رمضان الذهبي...' },
                  { name:'subtitle', label:'العنوان الفرعي',       placeholder:'خصم على الخزائن...'  },
                  { name:'discount', label:'نسبة الخصم / النوع',   placeholder:'30% أو مجاني...'    },
                  { name:'validUntil', label:'صالح حتى (تاريخ)',   placeholder:'2025-12-31'          },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-gold-500 text-sm mb-2">{label}</label>
                    <input
                      name={name} type="text" value={form[name] || ''} onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gold-500 text-sm mb-2">وصف الإعلان</label>
                  <textarea
                    name="description" value={form.description || ''} onChange={handleChange}
                    rows={3} placeholder="تفاصيل العرض..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                               text-white placeholder-gray-600 focus:outline-none focus:border-gold-500
                               transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gold-500 text-sm mb-2">لون الخلفية</label>
                  <select
                    name="color" value={form.color} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-gold-700/20
                               text-white focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-gold-700/10">
                  <input type="checkbox" id="adActive" name="active"
                    checked={form.active} onChange={handleChange}
                    className="w-5 h-5 accent-yellow-500 cursor-pointer" />
                  <label htmlFor="adActive" className="text-white font-medium cursor-pointer">
                    تفعيل الإعلان فوراً
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button type="submit"
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    className="flex-1 btn-gold py-3 flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> {editId ? 'حفظ التعديلات' : 'إضافة الإعلان'}
                  </motion.button>
                  <button type="button" onClick={() => setModal(false)}
                    className="px-6 py-3 rounded-xl border border-gray-600 text-gray-400
                               hover:border-gray-400 hover:text-white transition-colors">
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
