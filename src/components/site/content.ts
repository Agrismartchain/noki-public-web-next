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
  },
};
