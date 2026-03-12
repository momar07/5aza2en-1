import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import SEOHead from "@/components/seo/SEOHead";
import SectionTitle from "@/components/ui/SectionTitle";
import { Clock, User, Tag, Search, X, ChevronLeft, BookOpen } from "lucide-react";

const CATEGORY_COLORS = {
  "خزائن ملابس":   "bg-amber-100 text-amber-700",
  "تصميم داخلي":   "bg-purple-100 text-purple-700",
  "نصائح وأفكار":  "bg-green-100 text-green-700",
  "أخبار الشركة":  "bg-blue-100 text-blue-700",
  "default":        "bg-slate-100 text-slate-600",
};

export default function Blog() {
  const { blogs } = useData();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = [...new Set(blogs.map(b => b.category).filter(Boolean))];
    return ["all", ...cats];
  }, [blogs]);

  const filtered = useMemo(() => {
    return blogs.filter(b => {
      const matchCat  = activeCategory === "all" || b.category === activeCategory;
      const matchSearch = !search || b.title.includes(search) ||
        (b.excerpt && b.excerpt.includes(search));
      return matchCat && matchSearch;
    });
  }, [blogs, search, activeCategory]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <>
      <SEOHead
        title="مدونة خبراء الخزائن | نصائح وأفكار لتنظيم خزانتك"
        description="مدونة خبراء الخزائن – نصائح، أفكار وإلهام لتصميم وتنظيم خزائن الملابس في منزلك بأسلوب عصري وعملي."
        keywords="مدونة خزائن, نصائح تنظيم الملابس, تصميم خزائن, أفكار غرف الملابس"
        url="/blog"
      />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-amber-500/10"
            style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px`,
                     top: "30%", right: "10%"  }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              مدونتنا
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              نصائح و<span className="text-amber-400">إلهام</span> لخزانتك
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10">
              أحدث الأفكار والنصائح الاحترافية لتصميم وتنظيم خزائن الملابس
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-slate-400 rounded-2xl py-4 pr-12 pl-5 focus:outline-none focus:border-amber-400 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Category Tabs ─────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-amber-600 text-white shadow-md shadow-amber-200"
                    : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                {cat === "all" ? "جميع المقالات" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">لا توجد مقالات</h3>
              <p className="text-slate-400">جرب البحث بكلمة مختلفة</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && !search && activeCategory === "all" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-14"
                >
                  <Link to={`/blog/${featured.id}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-slate-900 to-amber-950 rounded-3xl overflow-hidden border border-amber-900/30 hover:shadow-2xl transition-shadow duration-300">
                      <div className="h-64 lg:h-full min-h-[280px] bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                        <span className="text-9xl opacity-60">📚</span>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                          مقال مميز
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md w-fit mb-3 ${CATEGORY_COLORS[featured.category] || CATEGORY_COLORS.default}`}>
                          {featured.category}
                        </span>
                        <h2 className="text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug">
                          {featured.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-slate-500 text-xs mb-5">
                          {featured.author && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featured.author}</span>}
                          {featured.readTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>}
                        </div>
                        <span className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:gap-3 transition-all">
                          اقرأ المقال <ChevronLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(search || activeCategory !== "all" ? filtered : rest).map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

// ── Blog Card ─────────────────────────────────────────
function BlogCard({ blog, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/blog/${blog.id}`} className="group block bg-white rounded-3xl border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center overflow-hidden">
          <span className="text-6xl opacity-70 group-hover:scale-110 transition-transform duration-500">📰</span>
        </div>
        {/* Body */}
        <div className="p-6">
          {blog.category && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${CATEGORY_COLORS[blog.category] || CATEGORY_COLORS.default}`}>
              {blog.category}
            </span>
          )}
          <h3 className="text-lg font-bold text-slate-800 mt-2 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug">
            {blog.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {blog.author  && <span className="flex items-center gap-1"><User  className="w-3 h-3" />{blog.author}</span>}
              {blog.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>}
            </div>
            <span className="flex items-center gap-1 text-amber-600 font-semibold group-hover:gap-2 transition-all">
              اقرأ <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
