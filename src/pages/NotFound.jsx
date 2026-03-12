import { motion } from "framer-motion";
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
