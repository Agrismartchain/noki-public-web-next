export type Language = "fr" | "en" | "ar";

export const LANGUAGES = ["fr", "en", "ar"] as const;

export const SITE_COPY: Record<
  Language,
  {
    nav: {
      home: string;
      services: string;
      how: string;
      tools: string;
      about: string;
      contact: string;
      cta: string;
    };
    hero: {
      title1: string;
      title2: string;
      titleAccent: string;
      subtitle: string;
      cta2: string;
      pills: string[];
    };
    why: {
      kicker: string;
      title: string;
      titleAccent: string;
      body: string;
      badge: string;
      ringCenter: string;
      barTitle: string;
      without: string;
      withoutStat: string;
      withLabel: string;
      withStat: string;
      features: {
        title: string;
        desc: string;
      }[];
      ringLegend: string[];
    };
  }
> = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      how: "Comment ça marche",
      tools: "Outils",
      about: "À propos",
      contact: "Contact",
      cta: "S'inscrire maintenant",
    },
    hero: {
      title1: "Pilotez tout votre cycle COD.",
      title2: "D'une seule",
      titleAccent: "plateforme",
      subtitle:
        "Commandes, confirmation, stock, préparation, livraison, cash et reversements réunis dans une plateforme opérationnelle structurée, conçue pour les acteurs du paiement à la livraison en Afrique.",
      cta2: "Découvrir la plateforme",
      pills: ["Commandes", "Stock", "Livraison", "Cash & reversements"],
    },
    why: {
      kicker: "Pensé pour piloter",
      title: "Le paiement à la livraison mérite",
      titleAccent: "une plateforme à la hauteur de sa complexité.",
      body:
        "Confirmer une commande, sécuriser un stock, coordonner une livraison et réconcilier du cash impliquent aujourd'hui des outils dispersés. NOKI Service centralise ce cycle dans une architecture adaptable, avec une gouvernance claire.",
      badge: "✓ Sup.",
      ringCenter: "étapes clés\ncouvertes",
      barTitle: "Pilotage — avant / après NOKI",
      without: "Sans NOKI",
      withoutStat: "Fragmenté",
      withLabel: "Avec NOKI",
      withStat: "Centralisé",
      features: [
        {
          title: "Un pilotage unifié",
          desc: "Commandes, stock, livraison et cash suivis depuis un seul environnement opérationnel.",
        },
        {
          title: "Moins de ruptures, plus de contrôle",
          desc: "Un stock réservé et une préparation coordonnée réduisent les erreurs de traitement.",
        },
        {
          title: "Gouvernance supervisée en continu",
          desc: "Chaque étape sensible reste soumise à une validation humaine claire.",
        },
      ],
      ringLegend: [
        "Commandes & confirmation",
        "Stock & préparation",
        "Livraison & dispatch",
        "Cash & reversements",
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      how: "How it works",
      tools: "Tools",
      about: "About",
      contact: "Contact",
      cta: "Sign up now",
    },
    hero: {
      title1: "Run your entire COD cycle.",
      title2: "From a single",
      titleAccent: "platform",
      subtitle:
        "Orders, confirmation, stock, preparation, delivery, cash and reversals brought together in one structured operational platform, built for cash-on-delivery operators in Africa.",
      cta2: "Discover the platform",
      pills: ["Orders", "Stock", "Delivery", "Cash & reversals"],
    },
    why: {
      kicker: "Built to run operations",
      title: "Cash on delivery deserves",
      titleAccent: "a platform equal to its complexity.",
      body:
        "Confirming an order, securing stock, coordinating delivery and reconciling cash today mean scattered tools. NOKI Service centralizes this cycle in an adaptable architecture, with clear governance.",
      badge: "✓ Sup.",
      ringCenter: "key stages\ncovered",
      barTitle: "Operations — before / after NOKI",
      without: "Without NOKI",
      withoutStat: "Fragmented",
      withLabel: "With NOKI",
      withStat: "Centralized",
      features: [
        {
          title: "Unified control",
          desc: "Orders, stock, delivery and cash tracked from a single operational environment.",
        },
        {
          title: "Fewer stockouts, more control",
          desc: "Reserved stock and coordinated preparation reduce processing errors.",
        },
        {
          title: "Continuously supervised governance",
          desc: "Every sensitive step remains subject to clear human validation.",
        },
      ],
      ringLegend: ["Orders & confirmation", "Stock & preparation", "Delivery & dispatch", "Cash & reversals"],
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      how: "كيف يعمل",
      tools: "الأدوات",
      about: "من نحن",
      contact: "اتصل بنا",
      cta: "سجّل الآن",
    },
    hero: {
      title1: "أدر دورة الدفع عند الاستلام بالكامل.",
      title2: "من",
      titleAccent: "منصة واحدة",
      subtitle:
        "الطلبات والتأكيد والمخزون والتحضير والتوصيل والنقد والتسويات، كلها مجتمعة في منصة تشغيلية منظمة، مصمّمة للفاعلين في الدفع عند الاستلام في أفريقيا.",
      cta2: "اكتشف المنصة",
      pills: ["الطلبات", "المخزون", "التوصيل", "النقد والتسويات"],
    },
    why: {
      kicker: "مصمّمة للقيادة التشغيلية",
      title: "الدفع عند الاستلام يستحق",
      titleAccent: "منصة بمستوى تعقيده.",
      body:
        "تأكيد طلب، تأمين مخزون، تنسيق توصيل، وتسوية النقد تتطلب اليوم أدوات متفرقة. تعمل NOKI Service على مركزة هذه الدورة ضمن بنية قابلة للتكيّف، بحوكمة واضحة.",
      badge: "✓ إشراف",
      ringCenter: "مراحل أساسية\nمغطاة",
      barTitle: "القيادة التشغيلية — قبل / بعد NOKI",
      without: "بدون NOKI",
      withoutStat: "متفرقة",
      withLabel: "مع NOKI",
      withStat: "مركزية",
      features: [
        {
          title: "قيادة موحّدة",
          desc: "متابعة الطلبات والمخزون والتوصيل والنقد من بيئة تشغيلية واحدة.",
        },
        {
          title: "نفاد أقل، تحكّم أكبر",
          desc: "يقلّل حجز المخزون والتحضير المنسّق من أخطاء المعالجة.",
        },
        {
          title: "حوكمة خاضعة للإشراف المستمر",
          desc: "تبقى كل خطوة حساسة خاضعة لتحقق بشري واضح.",
        },
      ],
      ringLegend: ["الطلبات والتأكيد", "المخزون والتحضير", "التوصيل والتوزيع", "النقد والتسويات"],
    },
  },
};
