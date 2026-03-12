import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useData } from "@/context/DataContext";
import SEOHead from "@/components/seo/SEOHead";
import { Phone, Search, Filter, X, Star, CheckCircle2 } from "lucide-react";

const WHATSAPP = "966503167122";

const CATEGORIES = [
  { id: "all",     label: "الكل" },
  { id: "sliding", label: "خزائن منزلقة" },
  { id: "hinged",  label: "خزائن مفصلية" },
  { id: "walkin",  label: "غرف الملابس" },
  { id: "open",    label: "خزائن مكشوفة" },
  { id: "library", label: "مكتبات" },
  { id: "kids",    label: "خزائن الأطفال" },
];

const CATEGORY_ICONS = {
  sliding: "🚪", hinged: "🪞", walkin: "✨", open: "📦", library: "📚", kids: "🎨", all: "🏠"
};

function getEmoji(slug) {
  return CATEGORY_ICONS[slug] || "🗄️";
}

export default function Products() {
  const { products } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === "all" || p.category_slug === activeCategory;
      const matchSearch = !search ||
        p.name.includes(search) ||
        (p.description && p.description.includes(search));
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const handleCategory = (id) => {
    setActiveCategory(id);
    id === "all" ? searchParams.delete("category") : searchParams.set("category", id);
    setSearchParams(searchParams);
  };

  return (
    <>
      <SEOHead
        title="منتجاتنا | خبراء الخزائن – خزائن ملابس فاخرة بالرياض"
        description="تصفح مجموعتنا الكاملة من خزائن الملابس: منزلقة، مفصلية، غرف ملابس كاملة، خزائن مكشوفة، مكتبات وخزائن أطفال. جودة عالية وضمان 10 سنوات."
        keywords="خزائن ملابس, خزائن منزلقة, غرف ملابس, خزائن مفصلية, مكتبات الرياض"
        url="/products"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full border border-amber-500/10"
            style={{ width: `${300 + i * 200}px`, height: `${300 + i * 200}px`, top: "50%", left: "20%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              كتالوج منتجاتنا
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              خزائن <span className="text-amber-400">راقية</span> لكل مساحة
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10">
              اختر من تشكيلتنا المتنوعة من خزائن الملابس المصنوعة بأجود الخامات
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
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

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => handleCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-amber-600 text-white shadow-md shadow-amber-200"
                    : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                <span>{CATEGORY_ICONS[cat.id]}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-500 text-sm">
              {filtered.length === 0 ? "لا توجد نتائج" : `${filtered.length} منتج`}
            </p>
            {(search || activeCategory !== "all") && (
              <button onClick={() => { setSearch(""); handleCategory("all"); }}
                className="flex items-center gap-1.5 text-amber-600 text-sm font-semibold hover:text-amber-700">
                <X className="w-4 h-4" /> مسح الفلاتر
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">لا توجد منتجات</h3>
              <p className="text-slate-400">جرب البحث بكلمة مختلفة أو تصفح فئة أخرى</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((product, i) => (
                  <motion.div key={product.id} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} onDetails={() => setSelectedProduct(product)} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-3">لم تجد ما تبحث عنه؟</h2>
          <p className="text-slate-400 mb-8">نصمم خزانتك المثالية وفق مقاساتك واحتياجاتك تماماً</p>
          <a href={`https://wa.me/${WHATSAPP}?text=أريد تصميم خزانة ملابس مخصصة`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-lg font-black transition-all hover:scale-105 shadow-lg shadow-green-900/30">
            <Phone className="w-6 h-6" /> اطلب تصميماً مخصصاً
          </a>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Product Card ──────────────────────────────────────
function ProductCard({ product, onDetails }) {
  const hasImage = product.image && product.image.trim() !== "";
  return (
    <motion.div whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl border border-slate-200 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-50 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">
            {getEmoji(product.category_slug)}
          </span>
        )}
        {product.badge && (
          <span className={`absolute top-3 right-3 ${product.badgeColor || "bg-amber-500"} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
            {product.badge}
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" /> مميز
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 mt-2 mb-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>
        {product.features && product.features.slice(0, 2).map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {f}
          </div>
        ))}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <div>
            <div className="text-amber-600 font-black text-base">{product.priceNote || product.price}</div>
            {product.priceNote && <div className="text-slate-400 text-xs">{product.price}</div>}
          </div>
          <div className="flex gap-2">
            <button onClick={onDetails}
              className="text-slate-500 hover:text-amber-600 text-xs font-semibold border border-slate-200 hover:border-amber-300 px-3 py-2 rounded-xl transition-all">
              التفاصيل
            </button>
            <a href={`https://wa.me/${WHATSAPP}?text=أريد الاستفسار عن: ${product.name}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
              <Phone className="w-3.5 h-3.5" /> استفسار
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Product Modal ─────────────────────────────────────
function ProductModal({ product, onClose }) {
  const hasImage = product.image && product.image.trim() !== "";
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ── صورة كبيرة ── */}
        <div className="relative w-full h-[420px] flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
          {hasImage ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10rem]">{getEmoji(product.category_slug)}</span>
            </div>
          )}
          {/* تدرج سفلي فوق الصورة */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />
          {/* زر الإغلاق */}
          <button onClick={onClose}
            className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full p-2.5 transition-all hover:scale-110 z-10">
            <X className="w-5 h-5" />
          </button>
          {/* الشارات */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {product.badge && (
              <span className={`${product.badgeColor || "bg-amber-500"} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                {product.badge}
              </span>
            )}
            {product.featured && (
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-white" /> مميز
              </span>
            )}
          </div>
          {/* اسم المنتج فوق التدرج */}
          <div className="absolute bottom-4 right-4 left-4 z-10">
            <span className="text-xs font-semibold text-amber-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
              {product.category}
            </span>
            <h2 className="text-3xl font-black text-white mt-1.5 drop-shadow-lg leading-tight">
              {product.name}
            </h2>
          </div>
        </div>

        {/* ── التفاصيل ── */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* السعر + واتساب */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">السعر يبدأ من</p>
              <div className="text-amber-600 font-black text-2xl">
                {product.priceNote || product.price || "اسأل عن السعر"}
              </div>
              {product.priceNote && product.price && (
                <div className="text-slate-400 text-xs mt-0.5">{product.price}</div>
              )}
            </div>
            <a href={`https://wa.me/${WHATSAPP}?text=أريد الاستفسار عن: ${product.name}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-md shadow-green-200">
              <Phone className="w-5 h-5" /> تواصل الآن
            </a>
          </div>

          {/* الوصف */}
          {product.description && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2">وصف المنتج</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* المزايا */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">المزايا والمواصفات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
