import { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/seo/SEOHead";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Phone, Mail, MapPin, Clock, Send,
  MessageCircle, ExternalLink, Instagram, Facebook, Twitter
} from "lucide-react";

const WHATSAPP = "966503167122";
const EMAIL = "info@theclosetexperts.com";
const WEBSITE = "https://www.theclosetexperts.com";

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "واتساب وهاتف",
    lines: ["+966 50 316 7122"],
    link: `https://wa.me/${WHATSAPP}`,
    linkText: "تواصل عبر واتساب",
    color: "bg-green-500",
    lightColor: "bg-green-50 border-green-200"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "البريد الإلكتروني",
    lines: [EMAIL],
    link: `mailto:${EMAIL}`,
    linkText: "أرسل بريداً إلكترونياً",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "فروعنا في الرياض",
    lines: ["حي الورود – الرياض", "حي المعذر الشمالي – الرياض"],
    link: "https://maps.google.com/?q=الرياض+حي+الورود",
    linkText: "عرض على الخريطة",
    color: "bg-red-500",
    lightColor: "bg-red-50 border-red-200"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "أوقات العمل",
    lines: ["السبت – الخميس: 9 ص – 9 م", "الجمعة: 4 م – 9 م"],
    link: null,
    linkText: null,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 border-amber-200"
  }
];

const services = [
  "خزائن منزلقة",
  "خزائن مفصلية",
  "غرف ملابس (Walk-in Closet)",
  "خزائن مكشوفة",
  "مكتبات",
  "خزائن أطفال",
  "استشارة فقط"
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", city: "", service: "", message: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `مرحباً، أنا ${form.name}\n` +
      `الهاتف: ${form.phone}\n` +
      `المدينة: ${form.city}\n` +
      `الخدمة المطلوبة: ${form.service}\n` +
      `الرسالة: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <>
      <SEOHead
        title="تواصل معنا | خبراء الخزائن – الرياض"
        description="تواصل مع خبراء الخزائن في الرياض. هاتف: 966503167122. بريد: info@theclosetexperts.com. فروع في حي الورود وحي المعذر الشمالي."
        keywords="تواصل خبراء الخزائن, هاتف خزائن الرياض, عنوان خبراء الخزائن"
        url="/contact"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-4"
        >
          <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            تواصل معنا
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            نحن هنا <span className="text-amber-400">لمساعدتك</span>
          </h1>
          <p className="text-slate-300 text-lg">
            تواصل معنا عبر واتساب أو ملء النموذج وسيتواصل معك فريقنا في أقرب وقت
          </p>
        </motion.div>
      </section>

      {/* WhatsApp Big Button */}
      <section className="py-10 bg-green-600 text-white text-center">
        <motion.a
          href={`https://wa.me/${WHATSAPP}?text=أريد الاستفسار عن خزائن الملابس`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-4 bg-white text-green-700 px-10 py-5 rounded-3xl text-xl font-black shadow-2xl hover:bg-green-50 transition-all"
        >
          <MessageCircle className="w-8 h-8" />
          تحدث معنا الآن على واتساب
          <ExternalLink className="w-5 h-5" />
        </motion.a>
        <p className="mt-4 text-green-100 text-sm">نرد خلال دقائق في أوقات العمل</p>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${info.lightColor}`}
              >
                <div className={`w-12 h-12 ${info.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-3">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className="text-slate-600 text-sm mb-1">{line}</p>
                ))}
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    {info.linkText}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Form */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
          <SectionTitle title="أرسل لنا رسالة" subtitle="سنتواصل معك فوراً عبر واتساب" center />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="اسمك الكريم"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="05xxxxxxxx"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">المدينة</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="الرياض"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الخدمة المطلوبة</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                >
                  <option value="">اختر الخدمة</option>
                  {services.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">رسالتك</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="أخبرنا بما تحتاجه..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-black transition-colors shadow-lg shadow-green-200"
            >
              <Send className="w-5 h-5" />
              إرسال عبر واتساب
            </motion.button>

            <p className="text-center text-slate-400 text-xs mt-4">
              سيتم فتح واتساب تلقائياً مع رسالتك جاهزة للإرسال
            </p>
          </motion.form>

          {/* Social Media */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm mb-4">تابعنا على منصات التواصل</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/theclosetexperts", label: "إنستغرام", bg: "bg-pink-500" },
                { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/theclosetexperts", label: "فيسبوك", bg: "bg-blue-600" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://www.twitter.com/theclosetexperts", label: "تويتر", bg: "bg-sky-500" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`${s.bg} text-white w-11 h-11 rounded-xl flex items-center justify-center hover:scale-110 transition-transform`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
