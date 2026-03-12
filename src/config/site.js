/**
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
