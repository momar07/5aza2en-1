export const initialProducts = [
  {
    id: 1,
    name: "خزانة ملابس بأبواب منزلقة",
    nameEn: "Sliding Door Wardrobe",
    category: "خزائن منزلقة",
    price: "على حسب المقاس",
    priceNote: "يبدأ من 2,500 ريال",
    description: "خزانة ملابس عصرية بأبواب منزلقة أنيقة توفر مساحة أكبر وتناسب جميع أنواع الغرف. مصنوعة من أجود أنواع الخشب مع تشطيبات راقية.",
    features: [
      "أبواب منزلقة بدون مفصلات توفر مساحة الغرفة",
      "خيارات متعددة من الألوان والتشطيبات",
      "رفوف وأدراج قابلة للتخصيص",
      "مرآة داخلية اختيارية",
      "ضمان 10 سنوات على الهيكل"
    ],
    image: "/assets/images/sliding-wardrobe.jpg",
    gallery: [],
    badge: "الأكثر طلباً",
    badgeColor: "bg-amber-500",
    inStock: true,
    featured: true,
    category_slug: "sliding",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "خزانة ملابس بأبواب مفصلية",
    nameEn: "Hinged Door Wardrobe",
    category: "خزائن مفصلية",
    price: "على حسب المقاس",
    priceNote: "يبدأ من 3,000 ريال",
    description: "خزانة ملابس كلاسيكية بأبواب مفصلية ذات طراز فاخر، تتميز بالمتانة والتصميم المحكم. مثالية لغرف النوم الكبيرة.",
    features: [
      "أبواب مفصلية متينة بمقابض فاخرة",
      "تصاميم كلاسيكية وعصرية",
      "داخل مقسّم بشكل احترافي",
      "إضاءة LED داخلية اختيارية",
      "ألوان وخامات متعددة"
    ],
    image: "/assets/images/hinged-wardrobe.jpg",
    gallery: [],
    badge: "جديد",
    badgeColor: "bg-green-500",
    inStock: true,
    featured: true,
    category_slug: "hinged",
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "غرفة ملابس كاملة (Walk-in Closet)",
    nameEn: "Walk-in Closet",
    category: "غرف الملابس",
    price: "على حسب المساحة",
    priceNote: "يبدأ من 8,000 ريال",
    description: "غرفة ملابس متكاملة مصممة خصيصاً لمساحتك، تشمل أقساماً للملابس المعلقة، الأحذية، الإكسسوارات، وطاولة مكياج. الحل الأمثل للبيوت الفاخرة.",
    features: [
      "تصميم ثلاثي الأبعاد مجاني قبل التنفيذ",
      "أقسام متخصصة للملابس والأحذية والإكسسوارات",
      "إضاءة LED احترافية",
      "مرايا ودرج للمجوهرات",
      "تشطيبات فاخرة بخامات عالمية"
    ],
    image: "/assets/images/walkin-closet.jpg",
    gallery: [],
    badge: "فاخر",
    badgeColor: "bg-purple-600",
    inStock: true,
    featured: true,
    category_slug: "walkin",
    createdAt: "2024-01-03T00:00:00.000Z"
  },
  {
    id: 4,
    name: "خزانة ملابس مكشوفة (Open Closet)",
    nameEn: "Open Wardrobe",
    category: "خزائن مكشوفة",
    price: "على حسب المقاس",
    priceNote: "يبدأ من 1,800 ريال",
    description: "خزانة ملابس مكشوفة عصرية وعملية، تمنح غرفتك طابعاً معاصراً مع سهولة الوصول لجميع ملابسك. تصميمات متعددة تناسب جميع المساحات.",
    features: [
      "تصميم مفتوح يمنح إحساساً بالمساحة",
      "أرفف ومعالق قابلة للتعديل",
      "هيكل قوي من الألومنيوم أو الخشب",
      "مناسبة لغرف الشباب والأطفال",
      "سهلة التركيب والتنظيف"
    ],
    image: "/assets/images/open-closet.jpg",
    gallery: [],
    badge: null,
    badgeColor: null,
    inStock: true,
    featured: false,
    category_slug: "open",
    createdAt: "2024-01-04T00:00:00.000Z"
  },
  {
    id: 5,
    name: "مكتبة خشبية للكتب والديكور",
    nameEn: "Bookshelf & Library",
    category: "مكتبات",
    price: "على حسب المقاس",
    priceNote: "يبدأ من 1,500 ريال",
    description: "مكتبات خشبية فاخرة مصممة خصيصاً لمنزلك، تجمع بين الجمال الديكوري والوظيفة العملية لتنظيم الكتب والإكسسوارات بأناقة.",
    features: [
      "تصاميم كلاسيكية وعصرية ومعاصرة",
      "أرفف ثابتة ومتحركة",
      "خيارات ألوان متعددة تناسب ديكور منزلك",
      "مناسبة للمكتبة المنزلية والمكاتب",
      "تصنيع محلي بجودة عالية"
    ],
    image: "/assets/images/bookshelf.jpg",
    gallery: [],
    badge: null,
    badgeColor: null,
    inStock: true,
    featured: false,
    category_slug: "library",
    createdAt: "2024-01-05T00:00:00.000Z"
  },
  {
    id: 6,
    name: "خزانة ملابس للأطفال",
    nameEn: "Kids Wardrobe",
    category: "خزائن الأطفال",
    price: "على حسب المقاس",
    priceNote: "يبدأ من 1,200 ريال",
    description: "خزائن ملابس مصممة خصيصاً للأطفال بألوان مبهجة وتصاميم جذابة، آمنة ومتينة مع أقسام ذكية تناسب احتياجاتهم.",
    features: [
      "ألوان زاهية ومبهجة للأطفال",
      "حواف مستديرة آمنة بدون زوايا حادة",
      "أقفال أمان للأدراج السفلية",
      "مساحات للألعاب والكتب والملابس",
      "قابلة للتوسعة مع نمو الطفل"
    ],
    image: "/assets/images/kids-wardrobe.jpg",
    gallery: [],
    badge: "للأطفال",
    badgeColor: "bg-pink-500",
    inStock: true,
    featured: false,
    category_slug: "kids",
    createdAt: "2024-01-06T00:00:00.000Z"
  }
];

export const productCategories = [
  { id: "all", label: "جميع المنتجات" },
  { id: "sliding", label: "خزائن منزلقة" },
  { id: "hinged", label: "خزائن مفصلية" },
  { id: "walkin", label: "غرف الملابس" },
  { id: "open", label: "خزائن مكشوفة" },
  { id: "library", label: "مكتبات" },
  { id: "kids", label: "خزائن الأطفال" }
];
