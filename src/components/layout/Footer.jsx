import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, Heart } from "lucide-react";

const WHATSAPP = "966503167122";
const EMAIL = "info@theclosetexperts.com";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "الرئيسية" },
    { to: "/services", label: "خدماتنا" },
    { to: "/products", label: "المنتجات" },
    { to: "/ads", label: "العروض والتخفيضات" },
    { to: "/blog", label: "المدونة" },
    { to: "/contact", label: "تواصل معنا" },
  ];

  const ourServices = [
    "خزائن بأبواب منزلقة",
    "خزائن بأبواب مفصلية",
    "غرف ملابس كاملة",
    "خزائن مكشوفة",
    "مكتبات الكتب",
    "خزائن الأطفال",
    "خزائن المطبخ",
  ];

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/theclosetexperts", label: "Instagram" },
    { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/theclosetexperts", label: "Facebook" },
    { icon: <Twitter className="w-4 h-4" />, href: "https://www.twitter.com/theclosetexperts", label: "Twitter" },
    { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/@theclosetexperts", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-black">خ</span>
              </div>
              <div>
                <div className="text-white font-black text-lg">خبراء الخزائن</div>
                <div className="text-amber-400 text-xs">The Closet Experts</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              تأسست عام 2015 في الرياض وتمكنا من وضع بصمة واضحة في قطاع الخزائن للاستفادة من جميع المساحات في المنزل.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 bg-slate-800 hover:bg-amber-600 text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-700">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-700">خدماتنا</h4>
            <ul className="space-y-2.5">
              {ourServices.map((s, i) => (
                <li key={i}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 pb-2 border-b border-slate-700">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-slate-400 hover:text-green-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                  <span>+966 50 316 7122</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                <span>حي الورود، الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span>حي المعذر الشمالي، الرياض</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} <span className="text-amber-400 font-semibold">خبراء الخزائن</span> – جميع الحقوق محفوظة
          </p>
          <p className="flex items-center gap-1">
            صُنع بـ <Heart className="w-3 h-3 text-red-400 fill-red-400" /> في الرياض، المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
