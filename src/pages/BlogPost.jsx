import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, User, Tag, ArrowRight, Share2, ChevronLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import SEOHead from '@/components/seo/SEOHead'
import AnimatedCard from '@/components/ui/AnimatedCard'
import { useData } from '@/context/DataContext'

export default function BlogPost() {
  const { id }    = useParams()
  const { blogs } = useData()
  const post      = blogs.find(b => b.id === id)
  const related   = blogs.filter(b => b.id !== id && b.category === post?.category).slice(0, 3)

  if (!post) return <Navigate to="/blog" replace />

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('تم نسخ رابط المقال!')
    }
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags?.join(', ')}
        url={`https://www.khubara-khazaen.com/blog/${post.id}`}
      />

      {/* ══ Hero ══ */}
      <div
        className="pt-32 pb-0 px-4"
        style={{ background: 'linear-gradient(135deg, #0d0d0d, #1a1a2e)' }}
      >
        <div className="max-w-4xl mx-auto pb-16">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap"
          >
            <Link to="/"     className="hover:text-gold-400 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold-400 transition-colors">المدونة</Link>
            <span>/</span>
            <span className="text-gold-400 line-clamp-1">{post.title}</span>
          </motion.div>

          {/* Category badge */}
          {post.category && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block text-xs font-bold px-3 py-1 rounded-full
                         bg-gold-900/30 text-gold-400 border border-gold-700/30 mb-4"
            >
              {post.category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-white font-heading mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-5 text-sm text-gray-400"
          >
            <span className="flex items-center gap-2">
              <User size={14} className="text-gold-600" />
              {post.author || 'فريق التحرير'}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-gold-600" />
              {post.readTime || '5 دقائق قراءة'}
            </span>
            <span className="text-gray-600">
              {new Date(post.createdAt).toLocaleDateString('ar-SA', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gold-500 hover:text-gold-300 transition-colors mr-auto"
            >
              <Share2 size={14} /> مشاركة
            </button>
          </motion.div>
        </div>
      </div>

      {/* ══ Featured image ══ */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="h-72 md:h-96 bg-dark-700 rounded-2xl flex items-center justify-center
                     text-9xl overflow-hidden -mt-4 mb-12 border border-gold-700/10"
        >
          📝
        </motion.div>
      </div>

      {/* ══ Content ══ */}
      <article className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              className="text-gray-300 leading-loose text-base space-y-4"
              style={{ fontFamily: 'Cairo, sans-serif', lineHeight: '2.2' }}
              dangerouslySetInnerHTML={{ __html: post.content || '<p>محتوى المقال...</p>' }}
            />

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gold-700/10">
                <p className="text-gold-500 text-sm mb-3 flex items-center gap-2">
                  <Tag size={14} /> الوسوم:
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span
                      key={t}
                      className="text-xs text-gold-500 bg-gold-900/20 border border-gold-700/20
                                 px-3 py-1 rounded-full cursor-default hover:bg-gold-900/40 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            <div className="mt-10 p-6 glass-card text-center">
              <p className="text-white font-bold text-lg mb-2">
                🪵 هل تحتاج إلى استشارة متخصصة؟
              </p>
              <p className="text-gray-400 text-sm mb-5">
                تواصل مع فريق خبراء الخزائن للحصول على تصميم مجاني
              </p>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '966500000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                💬 احصل على تصميمك المجاني
              </a>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-gold-400 hover:text-gold-300
                           transition-colors font-medium"
              >
                <ArrowRight size={18} />
                العودة إلى المدونة
              </Link>
            </div>
          </motion.div>

          {/* ══ Sidebar ══ */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Related posts */}
            {related.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-gold-400 font-bold mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gold-gradient rounded-full" />
                  مقالات ذات صلة
                </h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-14 h-14 bg-dark-700 rounded-lg flex items-center
                                      justify-center text-2xl shrink-0">
                        📝
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium group-hover:text-gold-400
                                      transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock size={10} /> {r.readTime || '5 دقائق'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick links */}
            <div className="glass-card p-6">
              <h3 className="text-gold-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gold-gradient rounded-full" />
                روابط سريعة
              </h3>
              <div className="space-y-1">
                {[
                  { to: '/products', label: '🗄️ تصاميمنا'        },
                  { to: '/services', label: '🔧 خدماتنا'          },
                  { to: '/ads',      label: '🎯 العروض'            },
                  { to: '/contact',  label: '📞 تواصل معنا'       },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center justify-between px-3 py-2 rounded-lg
                               text-gray-400 hover:text-gold-400 hover:bg-white/5
                               transition-all text-sm"
                  >
                    {label}
                    <ChevronLeft size={14} />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-card p-6 bg-gradient-to-br from-gold-900/30 to-dark-800/50
                            border border-gold-700/20 text-center">
              <div className="text-4xl mb-3">📐</div>
              <p className="text-white font-bold mb-2">تصميم مجاني</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                احصل على تصميم خزانتك ثلاثي الأبعاد مجاناً
              </p>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '966500000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs w-full flex items-center justify-center gap-2 py-2.5"
              >
                💬 ابدأ الآن
              </a>
            </div>
          </motion.aside>
        </div>
      </article>
    </>
  )
}
