import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Ruler, Pencil, Wrench, Star, Shield, Clock,
  CheckCircle2, ChevronLeft, Phone, Layers, Home, Sparkles
} from "lucide-react";

const WHATSAPP = "966503167122";

const services = [
  {
    icon: <Pencil className="w-8 h-8" />,
    title: "التصميم ثلاثي الأبعاد",
    subtitle: "3D Design",
    desc: "نقدم تصميماً ثلاثي الأبعاد احترافياً قبل البدء في التنفيذ، لتتخيل خزانتك قبل أن تراها على أرض الواقع. التصميم مجاني تماماً.",
    features: ["تصور واقعي قبل التنفيذ", "اختيار الألوان والخامات", "تعديل حتى الرضا التام"],
    color: "from-blue-500 to-blue-700",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-600"
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: "القياس والاستشارة المجانية",
    subtitle: "Free Measurement",
    desc: "يزور فريقنا المتخصص منزلك مجاناً لأخذ القياسات الدقيقة وتقديم الاستشارة اللازمة، بدون أي رسوم أو التزامات.",
    features: ["زيارة منزلية مجانية", "قياسات دقيقة بالميليمتر", "استشارة تصميم مخصصة"],
    color: "from-amber-500 to-amber-700",
    lightColor: "bg-amber-50 border-amber-200",
    textColor: "text-amber-600"
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "خزائن الخشب الصلب والـ MDF",
    subtitle: "Solid Wood & MDF",
    desc: "نستخدم أجود أنواع الخشب الصلب والـ MDF المستورد ذي الجودة العالمية لضمان المتانة والجمال على مدى سنوات طويلة.",
    features: ["خشب صلب 100% مستورد", "MDF عالي الكثافة", "أصباغ وورنيش آمنة"],
    color: "from-green-500 to-green-700",
    lightColor: "bg-green-50 border-green-200",
    textColor: "text-green-600"
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: "غرف الملابس الكاملة",
    subtitle: "Walk-in Closets",
    desc: "تصميم وتنفيذ غرف الملابس الكاملة (Walk-in Closet) بجميع تفاصيلها من أرفف وأدراج وإضاءة ومرايا ومناطق عرض للأحذية والإكسسوارات.",
    features: ["تصميم مخصص للمساحة", "إضاءة LED احترافية", "مناطق متخصصة للملابس والأحذية"],
    color: "from-purple-500 to-purple-700",
    lightColor: "bg-purple-50 border-purple-200",
    textColor: "text-purple-600"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "التشطيبات الفاخرة",
    subtitle: "Premium Finishing",
    desc: "نقدم تشطيبات فاخرة متعددة تشمل اللاكيه عالي اللمعان، المرايا، الزجاج الملون، والأبواب الزجاجية المطفية لإضفاء لمسة راقية.",
    features: ["لاكيه عالي اللمعان", "أبواب مرايا وزجاجية", "مقابض وإكسسوارات فاخرة"],
    color: "from-rose-500 to-rose-700",
    lightColor: "bg-rose-50 border-rose-200",
    textColor: "text-rose-600"
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "التركيب الاحترافي",
    subtitle: "Professional Installation",
    desc: "فريق تركيب محترف ومدرب يتولى تركيب الخزانة بدقة واحترافية عالية مع الحرص على نظافة موقع العمل والانتهاء في الموعد المحدد.",
    features: ["فريق تركيب معتمد", "أدوات تركيب حديثة", "تسليم نظيف في الموعد"],
    color: "from-slate-500 to-slate-700",
    lightColor: "bg-slate-50 border-slate-200",
    textColor: "text-slate-600"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "المكتبات وخزائن المطبخ",
    subtitle: "Libraries & Kitchen Cabinets",
    desc: "لا نقتصر على خزائن الملابس فحسب، بل نصمم ونصنع أيضاً مكتبات الكتب وخزائن المطبخ وأثاث المكاتب بنفس الجودة والاحترافية.",
    features: ["مكتبات خشبية أنيقة", "خزائن مطبخ متكاملة", "أثاث مكاتب مخصص"],
    color: "from-teal-500 to-teal-700",
    lightColor: "bg-teal-50 border-teal-200",
    textColor: "text-teal-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "الصيانة وما بعد البيع",
    subtitle: "After-Sales Service",
    desc: "خدمة ما بعد البيع لدينا لا تنتهي بالتسليم. نقدم صيانة دورية وضمان 10 سنوات على جميع منتجاتنا لراحة بالك على المدى البعيد.",
    features: ["ضمان 10 سنوات شامل", "صيانة دورية مجانية", "دعم فني متاح دائماً"],
    color: "from-amber-600 to-orange-700",
    lightColor: "bg-orange-50 border-orange-200",
    textColor: "text-orange-600"
  }
];

const processSteps = [
  { step: "01", title: "التواصل والاستفسار", desc: "تواصل معنا عبر واتساب أو اتصل بنا لتحديد موعد الزيارة المنزلية المجانية" },
  { step: "02", title: "الزيارة والقياس", desc: "يزور فريقنا منزلك ويأخذ القياسات الدقيقة ويستمع لاحتياجاتك وتفضيلاتك" },
  { step: "03", title: "التصميم والعرض", desc: "نقدم لك تصميماً ثلاثي الأبعاد مع عرض السعر النهائي الشامل بدون رسوم خفية" },
  { step: "04", title: "التصنيع والتركيب", desc: "بعد الموافقة، نبدأ في التصنيع ثم التركيب الاحترافي في موعدنا المحدد" },
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="خدماتنا | خبراء الخزائن – تصميم وتصنيع وتركيب خزائن الملابس"
        description="نقدم خدمات متكاملة لتصميم وتصنيع وتركيب خزائن الملابس في الرياض: قياس مجاني، تصميم 3D، خشب صلب وMDF، غرف ملابس كاملة، ضمان 10 سنوات."
        keywords="خدمات خزائن ملابس, تصميم خزائن, تركيب خزائن, غرف ملابس الرياض"
        url="/services"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">خدماتنا</span>
            <h1 className="text-5xl font-black mb-5">خدمات <span className="text-amber-400">متكاملة</span> من الفكرة للتنفيذ</h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">
              من الاستشارة المجانية وحتى التركيب والضمان — نرافقك في كل خطوة لتحصل على خزانة أحلامك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`p-6 rounded-2xl border ${service.lightColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{service.title}</h3>
                <p className={`text-xs font-semibold ${service.textColor} mb-3`}>{service.subtitle}</p>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <ul className="space-y-1">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${service.textColor} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle title="كيف نعمل؟" subtitle="خطوات بسيطة لخزانة مثالية" center />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-amber-200 -z-10" />
                )}
                <div className="w-16 h-16 bg-amber-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-amber-200">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">ابدأ مشروعك الآن</h2>
          <p className="text-amber-100 mb-8">تواصل معنا للحصول على استشارة مجانية وقياس بدون أي التزام</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP}?text=أريد الاستفسار عن خدمات خبراء الخزائن`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-3 rounded-2xl font-black hover:bg-amber-50 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              واتساب الآن
            </a>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-amber-700/50 border-2 border-white/50 text-white px-8 py-3 rounded-2xl font-bold hover:bg-amber-700/70 transition-all hover:scale-105"
            >
              تصفح المنتجات
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
