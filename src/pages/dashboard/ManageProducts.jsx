import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { useData } from '@/context/DataContext'

const emptyForm = {
  name: '', category: '', price: '', description: '',
  features: '', badge: '', inStock: true,
  image: '', featured: false,
}

const categories = [
  'خزائن منزلقة','خزائن مفصلية','غرف الملابس',
  'خزائن مكشوفة','مكتبات','خزائن الأطفال','أخرى',
]

export default function ManageProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useData()
  const [modal,  setModal]  = useState(false)
  const [form,   setForm]   = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = (p) => {
    setForm({ ...p, price: String(p.price), features: p.features?.join(', ')||'' })
    setEditId(p.id); setModal(true)
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type==='checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) {
      toast.error('يرجى تعبئة الاسم والفئة والسعر على الأقل'); return
    }
    const data = {
      ...form,
      price: form.price,
      features: form.features ? form.features.split(',').map(s=>s.trim()).filter(Boolean) : [],
    }
    if (editId) { updateProduct(editId, data); toast.success('تم تحديث المنتج بنجاح ✅') }
    else        { addProduct(data);             toast.success('تم إضافة المنتج بنجاح ✅')  }
    setModal(false)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`هل أنت متأكد من حذف "${name}"؟`)) {
      deleteProduct(id); toast.success('تم الحذف بنجاح')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="text-gold-400" size={26}/> إدارة المنتجات
          </h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} منتج مسجّل</p>
        </div>
        <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.96}}
          onClick={openAdd} className="btn-gold flex items-center gap-2">
          <Plus size={18}/> إضافة منتج
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label:'إجمالي المنتجات', value: products.length,                            color:'from-blue-900/40 to-blue-800/20',   border:'border-blue-700/20'  },
          { label:'متوفر',           value: products.filter(p=>p.inStock).length,        color:'from-green-900/40 to-green-800/20', border:'border-green-700/20' },
          { label:'نفذ المخزون',     value: products.filter(p=>!p.inStock).length,       color:'from-red-900/40 to-red-800/20',     border:'border-red-700/20'   },
          { label:'الفئات',          value: new Set(products.map(p=>p.category)).size,   color:'from-gold-900/40 to-gold-800/20',   border:'border-gold-700/20'  },
        ].map(({label,value,color,border}) => (
          <div key={label} className={`glass-card p-5 bg-gradient-to-br ${color} border ${border}`}>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-700/20 bg-white/5">
                {['المنتج','الفئة','السعر','الحالة','مميز','إجراءات'].map(h=>(
                  <th key={h} className="px-5 py-4 text-right text-gold-500 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-500">
                      <Package size={40} className="mx-auto mb-3 text-gray-600"/>
                      لا توجد منتجات — أضف منتجاً جديداً
                    </td>
                  </tr>
                ) : products.map((prod, i) => (
                  <motion.tr key={prod.id}
                    initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                    exit={{opacity:0,y:-10}} transition={{delay:i*0.04}}
                    className="border-b border-gold-700/10 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {prod.image && !prod.image.startsWith('/assets') ? (
                          <img src={prod.image} alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gold-700/20"/>
                        ) : (
                          <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-xl shrink-0">🛡️</div>
                        )}
                        <div>
                          <p className="text-white font-medium">{prod.name}</p>
                          <p className="text-gray-500 text-xs line-clamp-1 max-w-48">{prod.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-gold-500 text-xs bg-gold-900/20 px-2 py-1 rounded-full border border-gold-700/20">
                        {prod.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white font-bold whitespace-nowrap">
                      {prod.price || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        prod.inStock
                          ? 'bg-green-900/30 text-green-400 border border-green-700/20'
                          : 'bg-red-900/30 text-red-400 border border-red-700/20'
                      }`}>
                        {prod.inStock ? '✓ متوفر' : '✗ نفذ'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        {prod.badge
                          ? <span className="text-xs bg-gold-gradient text-dark-900 px-2 py-0.5 rounded-full font-bold">{prod.badge}</span>
                          : <span className="text-gray-600 text-xs">—</span>}
                        {prod.featured && (
                          <span className="text-xs text-amber-400">⭐ رئيسية</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                          onClick={()=>openEdit(prod)}
                          className="w-8 h-8 rounded-lg bg-blue-900/30 text-blue-400 hover:bg-blue-900/60 flex items-center justify-center transition-colors">
                          <Pencil size={14}/>
                        </motion.button>
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                          onClick={()=>handleDelete(prod.id,prod.name)}
                          className="w-8 h-8 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/60 flex items-center justify-center transition-colors">
                          <Trash2 size={14}/>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
            <motion.div
              initial={{scale:0.9,y:30}} animate={{scale:1,y:0}} exit={{scale:0.9,y:30}}
              transition={{type:'spring',stiffness:260,damping:22}}
              className="bg-dark-800 border border-gold-700/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-gold-lg">

              <div className="flex items-center justify-between p-6 border-b border-gold-700/20">
                <h2 className="text-xl font-bold text-white">
                  {editId ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد'}
                </h2>
                <button onClick={()=>setModal(false)} className="text-gray-400 hover:text-white p-1 transition-colors">
                  <X size={22}/>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name:'name',  label:'اسم المنتج *',    type:'text',   placeholder:'خزانة منزلقة فاخرة...' },
                    { name:'price', label:'السعر أو النطاق *',type:'text',   placeholder:'يبدأ من 2,500 ريال'     },
                    { name:'badge', label:'شارة مميزة',       type:'text',   placeholder:'الأكثر مبيعاً'         },
                    { name:'image', label:'رابط الصورة',      type:'url',    placeholder:'https://...'           },
                  ].map(({name,label,type,placeholder}) => (
                    <div key={name}>
                      <label className="block text-gold-500 text-sm mb-2">{label}</label>
                      <input name={name} type={type} value={form[name]||''} onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                   text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block text-gold-500 text-sm mb-2">الفئة *</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-gold-700/20
                                 text-white focus:outline-none focus:border-gold-500 transition-colors">
                      <option value="">اختر فئة...</option>
                      {categories.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gold-500 text-sm mb-2">وصف المنتج</label>
                  <textarea name="description" value={form.description} onChange={handleChange}
                    rows={3} placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                               text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"/>
                </div>

                <div>
                  <label className="block text-gold-500 text-sm mb-2">
                    المزايا <span className="text-gray-500 font-normal">(افصل بفاصلة)</span>
                  </label>
                  <input name="features" type="text" value={form.features} onChange={handleChange}
                    placeholder="أبواب منزلقة, ضمان 10 سنوات, تصميم مجاني"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                               text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-gold-700/10">
                    <input type="checkbox" id="inStock" name="inStock"
                      checked={form.inStock} onChange={handleChange}
                      className="w-5 h-5 accent-yellow-500 cursor-pointer"/>
                    <label htmlFor="inStock" className="text-white font-medium cursor-pointer">متوفر في المخزون</label>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-gold-700/10">
                    <input type="checkbox" id="featured" name="featured"
                      checked={form.featured || false} onChange={handleChange}
                      className="w-5 h-5 accent-yellow-500 cursor-pointer"/>
                    <label htmlFor="featured" className="text-white font-medium cursor-pointer">⭐ ظهور في الصفحة الرئيسية</label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button type="submit"
                    whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                    className="flex-1 btn-gold py-3 flex items-center justify-center gap-2">
                    <Save size={18}/> {editId?'حفظ التعديلات':'إضافة المنتج'}
                  </motion.button>
                  <button type="button" onClick={()=>setModal(false)}
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
