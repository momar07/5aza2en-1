import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import SEOHead from "@/components/seo/SEOHead";
import SectionTitle from "@/components/ui/SectionTitle";
import { Phone, Clock, Tag, ChevronLeft, Sparkles, BadgePercent } from "lucide-react";

const WHATSAPP = "966503167122";

export default function Ads() {
  const { ads } = useData();
  const activeAds = ads.filter(a => a.isActive);
  const expiredAds = ads.filter(a => !a.isActive);

  return (
    <>
      <SEOHead
        title="العروض والتخفيضات | خبراء الخزائن"
        description="اكتشف أحدث عروض وتخفيضات خبراء الخزائن في الرياض – قياس مجاني، ضمان 10 سنوات، وخصومات حصرية على خزائن الملابس."
        keywords="عروض خزائن, تخفيضات خزائن الملابس, عروض الرياض, خبراء الخزائن"
        url="/ads"
      />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-amber-500/10"
            style={{ width: `${250 + i * 150}px`, height: `${250 + i * 150}px`,
                     top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <BadgePercent className="w-4 h-4" />
              عروض حصرية
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              عروض <span className="text-amber-400">لا تفوتها</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">
              استفد من عروضنا الحصرية وخصوماتنا الموسمية على جميع خزائن الملابس
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Active Ads ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {activeAds.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">لا توجد عروض نشطة حالياً</h3>
              <p className="text-slate-400">تابعنا لمعرفة أحدث العروض والتخفيضات</p>
            </div>
          ) : (
            <>
              <SectionTitle
                title="العروض النشطة"
                subtitle={`${activeAds.length} عرض متاح الآن — احجز قبل انتهاء المدة`}
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {activeAds.map((ad, i) => (
                  <AdCard key={ad.id} ad={ad} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Why Our Offers ───────────────────────────── */}
      <WhyOffersSection />

      {/* ── Expired / Inactive Ads ───────────────────── */}
      {expiredAds.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle title="عروض منتهية" subtitle="هذه العروض انتهت — تابعنا لعروض قادمة" center />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 opacity-60">
              {expiredAds.map((ad, i) => (
                <AdCard key={ad.id} ad={ad} index={i} expired />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-3">هل تريد عرضاً خاصاً؟</h2>
            <p className="text-amber-100 mb-8">تواصل معنا مباشرة للحصول على أفضل سعر لمشروعك</p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=أريد الاستفسار عن العروض الحالية`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-amber-700 px-8 py-4 rounded-2xl text-lg font-black hover:bg-amber-50 transition-all hover:scale-105 shadow-xl"
            >
              <Phone className="w-6 h-6" />
              تواصل عبر واتساب
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ── Ad Card Component ─────────────────────────────────
function AdCard({ ad, index, expired = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!expired ? { y: -6, scale: 1.02 } : {}}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${ad.colorClass || "from-amber-600 to-amber-800"} shadow-xl`}
    >
      {/* Badge */}
      {ad.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
            {ad.badge}
          </span>
        </div>
      )}

      {/* Expired overlay */}
      {expired && (
        <div className="absolute inset-0 bg-slate-900/40 z-10 flex items-center justify-center">
          <span className="bg-slate-900/70 text-white text-sm font-bold px-4 py-2 rounded-full border border-white/20">
            انتهى العرض
          </span>
        </div>
      )}

      {/* Discount watermark */}
      {ad.discountText && (
        <div className="absolute top-4 left-4 text-6xl font-black text-white/10 leading-none select-none pointer-events-none">
          {ad.discountText}
        </div>
      )}

      <div className="relative z-[5] p-7">
        {/* Discount badge */}
        {ad.discount && (
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-white text-sm font-black px-4 py-1.5 rounded-full mb-5 border border-white/30">
            <Tag className="w-4 h-4" />
            خصم {ad.discount}%
          </div>
        )}
        {!ad.discount && ad.discountText && (
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-white text-sm font-black px-4 py-1.5 rounded-full mb-5 border border-white/30">
            <Sparkles className="w-4 h-4" />
            {ad.discountText}
          </div>
        )}

        <h3 className="text-white text-2xl font-black mb-2 leading-tight">{ad.title}</h3>
        <p className="text-white/80 text-sm mb-2">{ad.subtitle}</p>
        {ad.description && (
          <p className="text-white/70 text-xs leading-relaxed mb-5">{ad.description}</p>
        )}

        {/* Valid Until */}
        {ad.validUntil && (
          <div className="flex items-center gap-2 text-white/60 text-xs mb-5">
            <Clock className="w-3.5 h-3.5" />
            <span>صالح حتى: {new Date(ad.validUntil).toLocaleDateString("ar-SA")}</span>
          </div>
        )}

        {/* CTA Button */}
        {!expired && ad.ctaLink && (
          <a
            href={ad.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/40 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 group"
          >
            {ad.ctaText || "احجز الآن"}
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Why Offers Section ────────────────────────────────
function WhyOffersSection() {
  const points = [
    { icon: "✅", title: "عروض حقيقية", desc: "عروضنا شفافة وحقيقية بدون رسوم مخفية" },
    { icon: "⏱️", title: "محدودة الوقت", desc: "العروض محدودة — استغل الفرصة قبل انتهائها" },
    { icon: "🤝", title: "شامل التركيب", desc: "جميع عروضنا تشمل التصميم والتصنيع والتركيب" },
    { icon: "🔒", title: "ضمان مستمر", desc: "الضمان يبقى ساري حتى مع العروض والتخفيضات" },
  ];
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle title="لماذا عروضنا مميزة؟" subtitle="جودة لا تُساوم عليها حتى مع الخصومات" center light />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-5 rounded-2xl bg-slate-800 border border-slate-700"
            >
              <div className="text-4xl mb-3">{p.icon}</div>
              <h4 className="font-bold text-amber-400 mb-1 text-sm">{p.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
