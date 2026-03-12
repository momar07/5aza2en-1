import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, BookOpen, Clock, User, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { useData } from '@/context/DataContext'

const emptyForm = {
  title: '', excerpt: '', content: '', category: '',
  author: 'فريق خبراء الخزائن', readTime: '5 دقائق',
  tags: '', image: '',
}

const categories = ['نصائح','تقنية','أمان','أخبار','صيانة','مقارنات']

export default function ManageBlog() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData()
  const [modal,   setModal]   = useState(false)
  const [form,    setForm]    = useState(emptyForm)
  const [editId,  setEditId]  = useState(null)
  const [preview, setPreview] = useState(false)

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setPreview(false); setModal(true) }
  const openEdit = (b) => {
    setForm({ ...b, tags: b.tags?.join(', ') || '' })
    setEditId(b.id); setPreview(false); setModal(true)
  }

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.excerpt) {
      toast.error('يرجى إدخال العنوان والمقتطف على الأقل'); return
    }
    const data = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }
    if (editId) { updateBlog(editId, data); toast.success('تم تحديث المقال ✅') }
    else        { addBlog(data);             toast.success('تم نشر المقال ✅')   }
    setModal(false)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`حذف مقال "${title}"؟`)) { deleteBlog(id); toast.success('تم حذف المقال') }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-gold-400" size={26}/> إدارة المدونة
          </h1>
          <p className="text-gray-500 text-sm mt-1">{blogs.length} مقال منشور</p>
        </div>
        <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.96}}
          onClick={openAdd} className="btn-gold flex items-center gap-2">
          <Plus size={18}/> مقال جديد
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label:'إجمالي المقالات', value: blogs.length },
          { label:'الفئات',          value: new Set(blogs.map(b=>b.category).filter(Boolean)).size },
          { label:'الكُتّاب',        value: new Set(blogs.map(b=>b.author).filter(Boolean)).size  },
          { label:'الوسوم',          value: [...new Set(blogs.flatMap(b=>b.tags||[]))].length      },
        ].map(({label,value}) => (
          <div key={label} className="glass-card p-5 bg-gradient-to-br from-gold-900/30 to-dark-800/50 border border-gold-700/20">
            <p className="text-3xl font-bold gold-text mb-1">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-600"/>
          <p className="text-gray-400 text-lg">لا توجد مقالات — ابدأ بكتابة أول مقال</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {blogs.map((post, i) => (
              <motion.div key={post.id}
                initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
                exit={{opacity:0,x:20}} transition={{delay:i*0.05}}
                className="glass-card p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-16 h-16 bg-dark-700 rounded-xl flex items-center justify-center
                                text-3xl shrink-0 border border-gold-700/10">📝</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {post.category && (
                      <span className="text-xs bg-gold-900/30 text-gold-400 border border-gold-700/20 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    )}
                    {post.tags?.slice(0,2).map(t=>(
                      <span key={t} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">#{t}</span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold line-clamp-1 mb-1">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User size={11} className="text-gold-600"/> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} className="text-gold-600"/> {post.readTime}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                    onClick={()=>openEdit(post)}
                    className="w-9 h-9 rounded-xl bg-blue-900/30 text-blue-400 hover:bg-blue-900/60 flex items-center justify-center transition-colors">
                    <Pencil size={15}/>
                  </motion.button>
                  <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                    onClick={()=>handleDelete(post.id,post.title)}
                    className="w-9 h-9 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900/60 flex items-center justify-center transition-colors">
                    <Trash2 size={15}/>
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
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
            <motion.div
              initial={{scale:0.9,y:30}} animate={{scale:1,y:0}} exit={{scale:0.9}}
              transition={{type:'spring',stiffness:260,damping:22}}
              className="bg-dark-800 border border-gold-700/20 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-gold-lg">

              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold-700/20 sticky top-0 bg-dark-800 z-10">
                <h2 className="text-xl font-bold text-white">
                  {editId ? '✏️ تعديل المقال' : '📝 مقال جديد'}
                </h2>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={()=>setPreview(v=>!v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      preview ? 'bg-gold-gradient text-dark-900' : 'bg-white/5 text-gray-400 hover:text-white border border-gold-700/20'
                    }`}>
                    {preview ? '✏️ تحرير' : '👁 معاينة'}
                  </button>
                  <button onClick={()=>setModal(false)} className="text-gray-400 hover:text-white p-1">
                    <X size={22}/>
                  </button>
                </div>
              </div>

              {preview ? (
                /* Preview */
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-3">{form.title||'العنوان'}</h2>
                  <p className="text-gold-400 text-sm mb-4">{form.excerpt||'المقتطف'}</p>
                  <div className="text-gray-300 leading-loose prose-custom"
                    dangerouslySetInnerHTML={{__html: form.content||'<p>المحتوى...</p>'}}/>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div>
                    <label className="block text-gold-500 text-sm mb-2">عنوان المقال *</label>
                    <input name="title" type="text" value={form.title} onChange={handleChange}
                      placeholder="اكتب عنواناً جذاباً..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                  </div>

                  <div>
                    <label className="block text-gold-500 text-sm mb-2">المقتطف (ملخص) *</label>
                    <textarea name="excerpt" value={form.excerpt} onChange={handleChange}
                      rows={2} placeholder="ملخص قصير للمقال يظهر في القائمة..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"/>
                  </div>

                  {/* محرر المحتوى — textarea عادي يدعم HTML */}
                  <div>
                    <label className="block text-gold-500 text-sm mb-1">
                      محتوى المقال
                      <span className="text-gray-500 font-normal mr-2 text-xs">(يدعم HTML)</span>
                    </label>
                    <div className="text-xs text-gray-600 mb-2 flex flex-wrap gap-2">
                      {['<strong>عريض</strong>','<em>مائل</em>','<h2>عنوان</h2>',
                        '<ul><li>نقطة</li></ul>','<a href="#">رابط</a>'].map(tag=>(
                        <button key={tag} type="button"
                          onClick={()=>setForm(prev=>({...prev,content:(prev.content||'')+tag}))}
                          className="bg-white/5 hover:bg-white/10 text-gold-500 px-2 py-0.5 rounded border border-gold-700/20 font-mono transition-colors">
                          {tag}
                        </button>
                      ))}
                    </div>
                    <textarea name="content" value={form.content} onChange={handleChange}
                      rows={10} placeholder="<p>اكتب محتوى المقال هنا...</p>"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500
                                 transition-colors resize-y font-mono text-sm leading-relaxed"/>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gold-500 text-sm mb-2">الفئة</label>
                      <select name="category" value={form.category} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-gold-700/20
                                   text-white focus:outline-none focus:border-gold-500 transition-colors">
                        <option value="">اختر فئة...</option>
                        {categories.map(c=><option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gold-500 text-sm mb-2">اسم الكاتب</label>
                      <input name="author" type="text" value={form.author} onChange={handleChange}
                        placeholder="فريق خبراء الخزائن"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                   text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-gold-500 text-sm mb-2">وقت القراءة</label>
                      <input name="readTime" type="text" value={form.readTime} onChange={handleChange}
                        placeholder="5 دقائق"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                   text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-gold-500 text-sm mb-2">
                        الوسوم <span className="text-gray-500 font-normal">(افصل بفاصلة)</span>
                      </label>
                      <input name="tags" type="text" value={form.tags} onChange={handleChange}
                        placeholder="خزائن, أمان, نصائح"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                   text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gold-500 text-sm mb-2">رابط صورة المقال</label>
                      <input name="image" type="url" value={form.image} onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gold-700/20
                                   text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"/>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <motion.button type="submit"
                      whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                      className="flex-1 btn-gold py-3 flex items-center justify-center gap-2">
                      <Save size={18}/> {editId?'حفظ التعديلات':'نشر المقال'}
                    </motion.button>
                    <button type="button" onClick={()=>setModal(false)}
                      className="px-6 py-3 rounded-xl border border-gray-600 text-gray-400
                                 hover:border-gray-400 hover:text-white transition-colors">
                      إلغاء
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
