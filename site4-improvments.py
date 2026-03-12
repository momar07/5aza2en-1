import os

ROOT = "."  # المشروع في نفس المجلد

def write_file(path, content):
    full_path = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ تم: {path}")

# ══════════════════════════════════════════════════════
# 1) src/config/site.js — ملف مركزي لكل الإعدادات
# ══════════════════════════════════════════════════════
site_config = '''/**
 * site.js — الملف المركزي لإعدادات الموقع
 * عدّل هنا فقط وسيتغير في كل الموقع تلقائياً
 */

export const SITE = {
  name:        "خبراء الخزائن",
  nameEn:      "The Closet Experts",
  tagline:     "تصميم وتصنيع خزائن الملابس في الرياض",
  founded:     "2015",
  url:         "https://www.theclosetexperts.com",

  // ── تواصل ──────────────────────────────────────────
  whatsapp:    "966503167122",
  phone:       "+966 50 316 7122",
  email:       "info@theclosetexperts.com",

  // ── العنوان ────────────────────────────────────────
  branches: [
    { name: "الفرع الرئيسي", area: "حي الورود",          city: "الرياض" },
    { name: "الفرع الثاني",  area: "حي المعذر الشمالي",  city: "الرياض" },
  ],

  // ── ساعات العمل ────────────────────────────────────
  workingHours: "السبت – الخميس: 9 ص – 9 م | الجمعة: 4 م – 9 م",

  // ── سوشيال ─────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/theclosetexperts",
    facebook:  "https://www.facebook.com/theclosetexperts",
    twitter:   "https://www.twitter.com/theclosetexperts",
    youtube:   "https://www.youtube.com/@theclosetexperts",
  },

  // ── SEO افتراضي ─────────────────────────────────────
  defaultMeta: {
    title:       "خبراء الخزائن | تصميم خزائن الملابس في الرياض منذ 2015",
    description: "الشركة الرائدة في تصميم وتصنيع خزائن الملابس المدمجة والمنفصلة في الرياض منذ 2015. ضمان 10 سنوات وقياس مجاني.",
    keywords:    "خزائن ملابس, غرف ملابس, خزائن الرياض, خبراء الخزائن",
    ogImage:     "https://www.theclosetexperts.com/og-image.jpg",
  },
};

// ── رابط واتساب جاهز ─────────────────────────────────
export const waLink = (msg = "مرحباً، أريد الاستفسار عن خزائن الملابس") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
'''

# ══════════════════════════════════════════════════════
# 2) src/context/AuthContext.jsx — بدون fallback مكشوف
# ══════════════════════════════════════════════════════
auth_context = '''import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

/**
 * بيانات المستخدمين تُقرأ من .env فقط
 * لا توجد كلمات سر hardcoded في الكود
 * أنشئ ملف .env وضع فيه:
 *   VITE_ADMIN_USER1=admin
 *   VITE_ADMIN_PASS1=YourStrongPassword1
 *   VITE_ADMIN_USER2=manager
 *   VITE_ADMIN_PASS2=YourStrongPassword2
 */
function getUsers() {
  const u1 = import.meta.env.VITE_ADMIN_USER1;
  const p1 = import.meta.env.VITE_ADMIN_PASS1;
  const u2 = import.meta.env.VITE_ADMIN_USER2;
  const p2 = import.meta.env.VITE_ADMIN_PASS2;

  // إذا لم تُعرَّف المتغيرات — ارفض تسجيل الدخول تماماً
  if (!u1 || !p1 || !u2 || !p2) {
    console.error("⚠️ متغيرات البيئة VITE_ADMIN_* غير معرّفة في ملف .env");
    return [];
  }

  return [
    { username: u1, password: p1, role: "admin",   name: "مدير النظام"   },
    { username: u2, password: p2, role: "manager",  name: "مدير المحتوى" },
  ];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kk_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = useCallback((username, password) => {
    const USERS = getUsers();
    if (USERS.length === 0) {
      return { success: false, message: "خطأ في إعداد النظام — تواصل مع المسؤول" };
    }
    const found = USERS.find(
      u => u.username === username && u.password === password
    );
    if (found) {
      const userData = { username: found.username, role: found.role, name: found.name };
      setUser(userData);
      localStorage.setItem("kk_auth_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kk_auth_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
'''

# ══════════════════════════════════════════════════════
# 3) .env.example — محدّث بتعليمات واضحة
# ══════════════════════════════════════════════════════
env_example = '''# ════════════════════════════════════════════════════
# خبراء الخزائن — متغيرات البيئة
# انسخ هذا الملف إلى .env وعدّل القيم
# cp .env.example .env
# ════════════════════════════════════════════════════

# ── إعدادات الموقع ───────────────────────────────────
VITE_SITE_URL=https://www.theclosetexperts.com
VITE_WHATSAPP=966503167122

# ── بيانات لوحة التحكم (لا تشاركها أبداً) ───────────
# ⚠️  غيّر كلمات السر قبل الرفع على الاستضافة
VITE_ADMIN_USER1=admin
VITE_ADMIN_PASS1=ChangeMe@2025!

VITE_ADMIN_USER2=manager
VITE_ADMIN_PASS2=ChangeMe@2025!
'''

# ══════════════════════════════════════════════════════
# 4) .gitignore — تأكد من حماية .env
# ══════════════════════════════════════════════════════
gitignore = '''# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
dist-ssr/
build/

# Environment variables — لا ترفعها أبداً
.env
.env.local
.env.production
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db
'''

# ══════════════════════════════════════════════════════
# 5) public/robots.txt — يحمي dashboard من الفهرسة
# ══════════════════════════════════════════════════════
robots_txt = '''User-agent: *
Allow: /
Allow: /services
Allow: /products
Allow: /ads
Allow: /blog
Allow: /contact

# منع فهرسة لوحة التحكم
Disallow: /dashboard/
Disallow: /dashboard/login
Disallow: /dashboard/products
Disallow: /dashboard/ads
Disallow: /dashboard/blog

# Sitemap
Sitemap: https://www.theclosetexperts.com/sitemap.xml
'''

# ══════════════════════════════════════════════════════
# 6) src/pages/Home.jsx — يستخدم SITE config
# ══════════════════════════════════════════════════════
home_jsx = '''import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import SEOHead from "@/components/seo/SEOHead";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE, waLink } from "@/config/site";
import {
  Shield, Ruler, Star, Clock, Phone, ChevronLeft,
  Award, Users, Home as HomeIcon, CheckCircle2, Sparkles
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1672137233327-37b0c1049e77?q=80&w=1374&auto=format&fit=crop";

// ══════════════════════════════════════════════════════
// Hero Section
// ══════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── 1. صورة الخلفية ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="خزانة ملابس فاخرة"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-l
          from-slate-900/95 via-slate-900/75 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t
          from-amber-950/60 via-transparent to-slate-900/50" />
      </div>

      {/* ── 2. حلقات متحركة ── */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-amber-400/10 z-[1]"
          style={{ width: `${280 + i * 180}px`, height: `${280 + i * 180}px` }}
          animate={{ rotate: 360, scale: [1, 1.02, 1] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* ── 3. المحتوى ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2
            bg-amber-500/20 border border-amber-400/40
            text-amber-300 px-5 py-2 rounded-full
            text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          منذ عام {SITE.founded} — الشركة الرائدة في الرياض
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
        >
          <span className="text-amber-400">خبراء</span> الخزائن
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-200 mb-4 max-w-3xl mx-auto drop-shadow-lg"
        >
          تصميم وتصنيع خزائن الملابس المدمجة والمنفصلة بأعلى جودة
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-slate-300/90 mb-10 text-lg max-w-2xl mx-auto"
        >
          تأسسنا عام {SITE.founded} في الرياض وتمكنا من خلال الخبرة من وضع بصمة
          واضحة في قطاع الخزائن للاستفادة من جميع المساحات في المنزل
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={waLink("أريد الاستفسار عن خزائن الملابس")}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3
              bg-green-500 hover:bg-green-600 text-white
              px-8 py-4 rounded-2xl text-lg font-bold
              transition-all duration-300 hover:scale-105
              shadow-lg shadow-green-500/30"
          >
            <Phone className="w-5 h-5" />
            تواصل عبر واتساب
          </a>
          <Link
            to="/products"
            className="flex items-center gap-2
              bg-white/10 hover:bg-white/20 backdrop-blur-sm
              border border-white/30 text-white
              px-8 py-4 rounded-2xl text-lg font-bold
              transition-all duration-300 hover:scale-105"
          >
            تصفح منتجاتنا
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* إحصائيات داخل الهيرو */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "10+",   label: "سنوات خبرة"  },
            { value: "+5000", label: "عميل راضٍ"    },
            { value: "+8000", label: "مشروع منجز"   },
            { value: "10",    label: "سنوات ضمان"   },
          ].map((s, i) => (
            <div key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20
                rounded-2xl py-4 px-3 text-center"
            >
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-white/70 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade سفلي */}
      <div className="absolute bottom-0 left-0 right-0 h-32
        bg-gradient-to-t from-white via-white/60 to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-amber-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// Categories Section
// ══════════════════════════════════════════════════════
function CategoriesSection() {
  const categories = [
    { title: "خزائن بأبواب منزلقة",  subtitle: "Sliding Door Wardrobes",  icon: "🚪", desc: "توفر مساحة أكبر في الغرفة مع أناقة عصرية",    slug: "sliding" },
    { title: "خزائن بأبواب مفصلية",  subtitle: "Hinged Door Wardrobes",   icon: "🪞", desc: "التصميم الكلاسيكي بلمسة فاخرة ومتينة",        slug: "hinged"  },
    { title: "غرف الملابس الكاملة",   subtitle: "Walk-in Closets",         icon: "✨", desc: "غرفة ملابسك المثالية بتصميم احترافي",         slug: "walkin"  },
    { title: "خزائن مكشوفة",          subtitle: "Open Closets",            icon: "📦", desc: "تصميم مفتوح عصري وسهل الوصول",               slug: "open"    },
    { title: "مكتبات الكتب",          subtitle: "Bookshelves & Libraries",  icon: "📚", desc: "مكتبات خشبية أنيقة لمنزلك ومكتبك",          slug: "library" },
    { title: "خزائن الأطفال",         subtitle: "Kids Wardrobes",          icon: "🎨", desc: "تصاميم مبهجة وآمنة لغرف أطفالك",            slug: "kids"    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="أنواع خزائننا" subtitle="تشكيلة متنوعة تناسب كل ذوق ومساحة" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {categories.map((cat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/products?category=${cat.slug}`}
                className="group block p-7 bg-white rounded-2xl border border-slate-200
                  hover:border-amber-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-amber-600 text-sm font-medium mb-3">{cat.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-amber-600 text-sm font-semibold
                  opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>تصفح المنتجات</span>
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// Why Us Section
// ══════════════════════════════════════════════════════
function WhyUsSection() {
  const features = [
    { icon: <Ruler        className="w-6 h-6" />, title: "قياس مجاني",     desc: "نزور منزلك ونأخذ القياسات الدقيقة مجاناً وبدون التزام"          },
    { icon: <Star         className="w-6 h-6" />, title: "جودة عالمية",     desc: "نستخدم أجود الخامات والمواد المستوردة ذات الجودة العالمية"       },
    { icon: <Shield       className="w-6 h-6" />, title: "ضمان 10 سنوات",  desc: "ضمان شامل على الهيكل والتشغيل لمدة 10 سنوات كاملة"             },
    { icon: <Clock        className="w-6 h-6" />, title: "تسليم في الموعد",desc: "نلتزم بمواعيد التسليم المتفق عليها مع الحفاظ على الجودة"         },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "تصميم مخصص",     desc: "كل خزانة مصممة خصيصاً لمساحتك واحتياجاتك وذوقك"                },
    { icon: <Users        className="w-6 h-6" />, title: "فريق متخصص",     desc: "فريق من المصممين والحرفيين المتخصصين بخبرة تتجاوز 10 سنوات"     },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="لماذا تختار خبراء الخزائن؟"
          subtitle="نقدم أكثر من مجرد خزانة ملابس — نقدم تجربة متكاملة"
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex gap-4 p-6 rounded-2xl
                bg-gradient-to-br from-slate-50 to-amber-50
                border border-amber-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-xl
                flex items-center justify-center text-white">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// Featured Products Section
// ══════════════════════════════════════════════════════
function FeaturedProductsSection() {
  const { products } = useData();
  const featured = products.filter(p => p.featured).slice(0, 3);
  if (!featured.length) return null;

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="أبرز منتجاتنا" subtitle="اكتشف مجموعتنا المميزة من خزائن الملابس الفاخرة" center light />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featured.map((product, i) => (
            <AnimatedCard key={product.id} delay={i * 0.1} dark>
              <div className="relative overflow-hidden rounded-2xl
                bg-slate-800 border border-slate-700 group
                hover:border-amber-500/50 transition-all duration-300">
                <div className="h-52 bg-gradient-to-br from-slate-700 to-slate-600
                  flex items-center justify-center">
                  <span className="text-6xl">🪞</span>
                </div>
                {product.badge && (
                  <span className={`absolute top-4 right-4
                    ${product.badgeColor || "bg-amber-500"}
                    text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold">{product.priceNote || product.price}</span>
                    <a href={waLink(`أريد الاستفسار عن: ${product.name}`)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600
                        text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      استفسار
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600
              text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
          >
            عرض جميع المنتجات <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// Ads Section
// ══════════════════════════════════════════════════════
function AdsSection() {
  const { ads } = useData();
  const activeAds = ads.filter(a => a.isActive).slice(0, 3);
  if (!activeAds.length) return null;

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="عروض وتخفيضات حصرية" subtitle="استفد من عروضنا المميزة لفترة محدودة" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {activeAds.map((ad, i) => (
            <motion.div key={ad.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl
                bg-gradient-to-br ${ad.colorClass} p-7 text-white`}
            >
              {ad.badge && (
                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm
                  text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                  {ad.badge}
                </span>
              )}
              <div className="text-4xl font-black mb-2 opacity-20 text-right">{ad.discountText}</div>
              <h3 className="text-xl font-black mb-2">{ad.title}</h3>
              <p className="text-white/80 text-sm mb-5">{ad.subtitle}</p>
              <a href={ad.ctaLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30
                  border border-white/40 text-white px-5 py-2.5 rounded-xl
                  text-sm font-bold transition-all duration-300"
              >
                {ad.ctaText} <ChevronLeft className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// CTA Section
// ══════════════════════════════════════════════════════
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-800 text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-4">هل أنت جاهز لتصميم خزانتك المثالية؟</h2>
          <p className="text-amber-100 text-lg mb-8">
            تواصل معنا الآن للحصول على استشارة مجانية وقياس مجاني في منزلك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink("أريد استشارة مجانية لتصميم خزانة ملابس")}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3
                bg-white text-amber-700 px-8 py-4 rounded-2xl
                text-lg font-black hover:bg-amber-50 transition-all hover:scale-105"
            >
              <Phone className="w-6 h-6" /> تواصل عبر واتساب
            </a>
            <Link to="/contact"
              className="flex items-center justify-center gap-2
                bg-amber-700/50 border-2 border-white/50 text-white
                px-8 py-4 rounded-2xl text-lg font-bold
                hover:bg-amber-700/70 transition-all hover:scale-105"
            >
              صفحة التواصل <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
// Main Export
// ══════════════════════════════════════════════════════
export default function Home() {
  return (
    <>
      <SEOHead
        title={SITE.defaultMeta.title}
        description={SITE.defaultMeta.description}
        keywords={SITE.defaultMeta.keywords}
        url="/"
      />
      <HeroSection />
      <CategoriesSection />
      <WhyUsSection />
      <FeaturedProductsSection />
      <AdsSection />
      <CTASection />
    </>
  );
}
'''

# ══════════════════════════════════════════════════════
# 7) src/pages/NotFound.jsx — محسّن
# ══════════════════════════════════════════════════════
not_found_jsx = '''import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Phone, Search } from "lucide-react";
import { waLink } from "@/config/site";

const quickLinks = [
  { to: "/",         label: "الرئيسية",    icon: "🏠" },
  { to: "/products", label: "المنتجات",    icon: "🪞" },
  { to: "/services", label: "خدماتنا",     icon: "⚙️" },
  { to: "/contact",  label: "تواصل معنا",  icon: "📞" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950
      flex items-center justify-center px-4 py-20">

      {/* حلقات خلفية */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full border border-amber-500/10"
          style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* رقم 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-[10rem] font-black leading-none
            bg-gradient-to-b from-amber-400 to-amber-600
            bg-clip-text text-transparent mb-4 select-none"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-black text-white mb-3">
            عذراً! الصفحة غير موجودة
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            الصفحة التي تبحث عنها قد تكون محذوفة أو تم تغيير رابطها
          </p>
        </motion.div>

        {/* روابط سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {quickLinks.map((link, i) => (
            <Link key={i} to={link.to}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl
                bg-white/10 hover:bg-white/20 backdrop-blur-sm
                border border-white/10 hover:border-amber-400/50
                text-white transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-xs font-semibold">{link.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* أزرار رئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/"
            className="flex items-center justify-center gap-2
              bg-amber-500 hover:bg-amber-600 text-white
              px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <a href={waLink("أحتاج مساعدة — وصلت لصفحة 404")}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2
              bg-green-500 hover:bg-green-600 text-white
              px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            تواصل معنا
          </a>
        </motion.div>
      </div>
    </div>
  );
}
'''

# ══════════════════════════════════════════════════════
# 8) tailwind.config.js — توحيد الألوان
# ══════════════════════════════════════════════════════
tailwind_config = '''/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── الألوان الرسمية للشركة ─────────────────────
      colors: {
        // الذهبي الرسمي — استخدم gold-* بدل amber-* لتوحيد الثيم
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // ← اللون الأساسي
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // الداكن الرسمي
        dark: {
          50:  "#f8f8f8",
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2e2e2e",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
        // اختصارات مباشرة
        primary:   "#b8962e",
        secondary: "#1a1a2e",
      },

      // ── الخطوط ────────────────────────────────────
      fontFamily: {
        sans:    ["Cairo", "Tajawal", "sans-serif"],
        arabic:  ["Cairo", "Tajawal", "sans-serif"],
        heading: ["Cairo", "sans-serif"],
      },

      // ── الانيميشن ──────────────────────────────────
      animation: {
        "fade-in":    "fadeIn 0.6s ease-in-out",
        "slide-up":   "slideUp 0.7s ease-out",
        "slide-right":"slideRight 0.7s ease-out",
        "glow":       "glow 2s ease-in-out infinite alternate",
        "float":      "float 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:     { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:    { "0%": { transform: "translateY(40px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideRight: { "0%": { transform: "translateX(-40px)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        glow:       { "0%": { boxShadow: "0 0 5px #b8962e" }, "100%": { boxShadow: "0 0 30px #b8962e, 0 0 60px #b8962e40" } },
        float:      { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGold:  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
      },

      // ── الظلال ────────────────────────────────────
      boxShadow: {
        "gold":    "0 4px 20px rgba(184,150,46,0.4)",
        "gold-lg": "0 8px 40px rgba(184,150,46,0.6)",
        "dark":    "0 4px 20px rgba(0,0,0,0.5)",
        "card":    "0 2px 15px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 30px rgba(0,0,0,0.12)",
      },

      screens: { xs: "480px" },
    },
  },
  plugins: [],
}
'''

# ══════════════════════════════════════════════════════
# Write all files
# ══════════════════════════════════════════════════════
write_file("src/config/site.js",              site_config)
write_file("src/context/AuthContext.jsx",     auth_context)
write_file(".env.example",                    env_example)
write_file(".gitignore",                      gitignore)
write_file("public/robots.txt",               robots_txt)
write_file("src/pages/Home.jsx",              home_jsx)
write_file("src/pages/NotFound.jsx",          not_found_jsx)
write_file("tailwind.config.js",              tailwind_config)

print("""
╔══════════════════════════════════════════════════════════╗
║        ✅  fix_all_improvements.py  اكتمل بنجاح          ║
╠══════════════════════════════════════════════════════════╣
║  الملفات المُنشأة / المُعدَّلة:                           ║
║                                                          ║
║  🆕 src/config/site.js         ← مركز إعدادات الموقع    ║
║  🔒 src/context/AuthContext.jsx ← بدون passwords مكشوفة ║
║  📝 .env.example               ← تعليمات واضحة          ║
║  🛡️  .gitignore                ← يحمي .env              ║
║  🤖 public/robots.txt          ← يحمي /dashboard        ║
║  🏠 src/pages/Home.jsx         ← يستخدم SITE config     ║
║  ❌ src/pages/NotFound.jsx     ← صفحة 404 احترافية      ║
║  🎨 tailwind.config.js         ← ألوان موحدة + خطوط     ║
╠══════════════════════════════════════════════════════════╣
║  ⚠️  مهم جداً — بعد التشغيل:                             ║
║                                                          ║
║  1. أنشئ ملف .env:                                       ║
║     cp .env.example .env                                 ║
║                                                          ║
║  2. عدّل كلمات السر في .env:                              ║
║     VITE_ADMIN_PASS1=كلمة_سر_قوية                        ║
║     VITE_ADMIN_PASS2=كلمة_سر_قوية                        ║
║                                                          ║
║  3. شغّل المشروع:                                         ║
║     npm run dev                                          ║
╚══════════════════════════════════════════════════════════╝
""")
