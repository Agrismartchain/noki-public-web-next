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
    modules: {
      kicker: string;
      title: string;
      body: string;
      building: string;
      ctaFinal: string;
      statusReady: string;
      statusProgress: string;
      statusQueued: string;
      data: {
        title: string;
        desc: string;
        bullets: string[];
      }[];
    };
    cycle: {
      kicker: string;
      title: string;
      body: string;
      steps: string[];
    };
    ia: {
      kicker: string;
      title: string;
      body: string;
      queueTitle: string;
      supervised: string;
      supervisionTitle: string;
      disclaimer: string;
      queue: {
        title: string;
        detail: string;
        status: string;
      }[];
      supervision: {
        title: string;
        desc: string;
      }[];
    };
    courier: {
      appName: string;
      prep: string;
      missionLabel: string;
      missionText: string;
      codLabel: string;
      codText: string;
      incidentLabel: string;
      incidentTag1: string;
      incidentTag2: string;
      confirmSent: string;
      kicker: string;
      title: string;
      body: string;
      benefits: string[];
    };
    security: {
      kicker: string;
      title: string;
      body: string;
      logTitle: string;
      preview: string;
      items: string[];
      log: {
        action: string;
        role: string;
      }[];
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
    modules: {
      kicker: "Modules",
      title: "Chaque étape du cycle, un module dédié.",
      body:
        "Des briques opérationnelles pensées pour s'articuler ensemble, du premier contact client au reversement final.",
      building: "Construction de votre plateforme…",
      ctaFinal: "Commencer maintenant →",
      statusReady: "PRÊT",
      statusProgress: "EN COURS",
      statusQueued: "EN FILE",
      data: [
        {
          title: "Commandes & confirmation",
          desc: "Centralisez la réception des commandes et structurez la confirmation client.",
          bullets: [
            "Réception centralisée des commandes",
            "Confirmation client structurée",
            "Historique consultable par équipe",
          ],
        },
        {
          title: "Stock & préparation",
          desc: "Réservez le stock et coordonnez la préparation des commandes.",
          bullets: [
            "Réservation automatique du stock",
            "Suivi de la préparation en temps réel",
            "Alertes sur les ruptures",
          ],
        },
        {
          title: "Livraison & dispatch",
          desc: "Organisez le dispatch et suivez la livraison en temps réel.",
          bullets: [
            "Attribution des livraisons par zone",
            "Suivi du statut en direct",
            "Coordination avec les livreurs",
          ],
        },
        {
          title: "COD & reversements",
          desc: "Rapprochez le cash collecté et structurez les reversements.",
          bullets: ["Rapprochement du cash collecté", "Suivi des reversements par livreur", "Historique consultable"],
        },
        {
          title: "Gouvernance",
          desc: "Rôles, permissions et périmètres clairs pour chaque équipe.",
          bullets: [
            "Rôles et permissions par équipe",
            "Périmètres d'accès définis",
            "Validation humaine sur les actions sensibles",
          ],
        },
        {
          title: "Automatisation supervisée",
          desc: "Des tâches répétitives assistées, toujours validées par une personne.",
          bullets: [
            "Tâches répétitives assistées",
            "Suggestions soumises à validation",
            "Aucune action automatique sans accord",
          ],
        },
      ],
    },
    cycle: {
      kicker: "Cycle complet",
      title: "De la commande au reversement, une seule ligne.",
      body: "Chaque commande traverse un parcours structuré, tracé et supervisé de bout en bout.",
      steps: [
        "Commande reçue",
        "Confirmation",
        "Stock réservé",
        "Préparation",
        "Dispatch",
        "Livraison",
        "Rapprochement COD",
        "Reversement",
      ],
    },
    ia: {
      kicker: "Assistant opérationnel IA",
      title: "Une IA d'assistance, toujours supervisée.",
      body:
        "En préparation : un assistant conçu pour aider les équipes à prioriser, confirmer et détecter — jamais pour décider seul à leur place.",
      queueTitle: "File de priorisation",
      supervised: "Supervisé",
      supervisionTitle: "Zone de supervision",
      disclaimer:
        "Chaque recommandation reste soumise à validation humaine avant toute action sur une commande ou un paiement.",
      queue: [
        {
          title: "Priorisation des commandes",
          detail: "Suggestion d'ordre de traitement selon l'urgence",
          status: "À valider",
        },
        {
          title: "Aide à la confirmation",
          detail: "Résumé des échanges avec le client",
          status: "Proposé",
        },
        {
          title: "Détection d'anomalie",
          detail: "Écart identifié sur un rapprochement cash",
          status: "Signalé",
        },
        {
          title: "Prochaine action",
          detail: "Recommandation de relance livreur",
          status: "En attente",
        },
      ],
      supervision: [
        {
          title: "Résumé d'interactions",
          desc: "L'assistant condense les échanges pour accélérer la lecture par l'équipe.",
        },
        {
          title: "Proposition de prochaines actions",
          desc: "Des suggestions d'étape suivante, jamais exécutées automatiquement.",
        },
        {
          title: "Validation humaine finale",
          desc: "Aucune action sur une commande ou un paiement sans confirmation d'un opérateur.",
        },
      ],
    },
    courier: {
      appName: "NOKI Livreur",
      prep: "En préparation",
      missionLabel: "Mission assignée",
      missionText: "Livraison — Zone Cocody",
      codLabel: "COD à déclarer",
      codText: "Montant à saisir",
      incidentLabel: "Signaler un incident",
      incidentTag1: "Client absent",
      incidentTag2: "Colis endommagé",
      confirmSent: "Confirmation de progression envoyée",
      kicker: "Application livreur — en préparation",
      title: "Un compagnon terrain pensé pour vos livreurs.",
      body:
        "Une application dédiée est en préparation pour accompagner les livreurs directement sur le terrain : mission assignée, statut de progression, déclaration du cash collecté et remontée d'incident en quelques gestes.",
      benefits: [
        "Mission assignée et statut clair",
        "Déclaration du cash en quelques gestes",
        "Remontée d'incident simplifiée",
        "Confirmation de progression en temps réel",
      ],
    },
    security: {
      kicker: "Sécurité & gouvernance",
      title: "Un contrôle structuré, pas une boîte noire.",
      body:
        "Rôles, permissions et périmètres définis clairement, avec un journal d'actions consultable et une validation humaine sur chaque étape sensible du cycle.",
      logTitle: "Journal d'actions",
      preview: "Aperçu illustratif",
      items: [
        "Rôles & permissions par équipe",
        "Périmètres d'accès définis",
        "Journal d'actions consultable",
        "Validation humaine sur les étapes sensibles",
      ],
      log: [
        { action: "Confirmation de commande validée", role: "Superviseur" },
        { action: "Reversement initié", role: "Finance" },
        { action: "Accès stock modifié", role: "Admin" },
        { action: "Anomalie cash signalée", role: "Système supervisé" },
        { action: "Compte livreur activé", role: "Opérations" },
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
    modules: {
      kicker: "Modules",
      title: "A dedicated module for every stage of the cycle.",
      body: "Operational building blocks designed to work together, from first customer contact to final reversal.",
      building: "Building your platform…",
      ctaFinal: "Get started now →",
      statusReady: "READY",
      statusProgress: "IN PROGRESS",
      statusQueued: "QUEUED",
      data: [
        {
          title: "Orders & confirmation",
          desc: "Centralize order intake and structure customer confirmation.",
          bullets: ["Centralized order intake", "Structured customer confirmation", "Team-wide history"],
        },
        {
          title: "Stock & preparation",
          desc: "Reserve stock and coordinate order preparation.",
          bullets: ["Automatic stock reservation", "Real-time preparation tracking", "Stockout alerts"],
        },
        {
          title: "Delivery & dispatch",
          desc: "Organize dispatch and track deliveries in real time.",
          bullets: ["Zone-based delivery assignment", "Live status tracking", "Coordination with couriers"],
        },
        {
          title: "COD & reversals",
          desc: "Reconcile collected cash and structure reversals.",
          bullets: ["Collected cash reconciliation", "Per-courier reversal tracking", "Consultable history"],
        },
        {
          title: "Governance",
          desc: "Clear roles, permissions and scopes for every team.",
          bullets: ["Roles and permissions per team", "Defined access scopes", "Human validation on sensitive actions"],
        },
        {
          title: "Supervised automation",
          desc: "Repetitive tasks assisted, always validated by a person.",
          bullets: ["Assisted repetitive tasks", "Suggestions subject to validation", "No automatic action without approval"],
        },
      ],
    },
    cycle: {
      kicker: "Full cycle",
      title: "From order to reversal, one single line.",
      body: "Every order follows a structured path, tracked and supervised end to end.",
      steps: [
        "Order received",
        "Confirmation",
        "Stock reserved",
        "Preparation",
        "Dispatch",
        "Delivery",
        "COD reconciliation",
        "Reversal",
      ],
    },
    ia: {
      kicker: "AI operations assistant",
      title: "An AI assistant, always supervised.",
      body:
        "In development: an assistant designed to help teams prioritize, confirm and detect — never to decide alone on their behalf.",
      queueTitle: "Priority queue",
      supervised: "Supervised",
      supervisionTitle: "Supervision zone",
      disclaimer: "Every recommendation remains subject to human validation before any action on an order or a payment.",
      queue: [
        {
          title: "Order prioritization",
          detail: "Suggested processing order based on urgency",
          status: "To review",
        },
        {
          title: "Confirmation assistance",
          detail: "Summary of exchanges with the customer",
          status: "Suggested",
        },
        {
          title: "Anomaly detection",
          detail: "Discrepancy identified in a cash reconciliation",
          status: "Flagged",
        },
        {
          title: "Next action",
          detail: "Suggested courier follow-up",
          status: "Pending",
        },
      ],
      supervision: [
        {
          title: "Interaction summaries",
          desc: "The assistant condenses exchanges so the team can read faster.",
        },
        {
          title: "Next-action suggestions",
          desc: "Suggestions for the next step, never executed automatically.",
        },
        {
          title: "Final human validation",
          desc: "No action on an order or a payment without an operator's confirmation.",
        },
      ],
    },
    courier: {
      appName: "NOKI Courier",
      prep: "In development",
      missionLabel: "Assigned mission",
      missionText: "Delivery — Cocody zone",
      codLabel: "COD to declare",
      codText: "Amount to enter",
      incidentLabel: "Report an incident",
      incidentTag1: "Customer absent",
      incidentTag2: "Damaged parcel",
      confirmSent: "Progress confirmation sent",
      kicker: "Courier app — in development",
      title: "A field companion built for your couriers.",
      body:
        "A dedicated app is in development to support couriers directly in the field: assigned missions, progress status, collected-cash declaration and incident reporting in a few taps.",
      benefits: [
        "Assigned mission and clear status",
        "Cash declaration in a few taps",
        "Simplified incident reporting",
        "Real-time progress confirmation",
      ],
    },
    security: {
      kicker: "Security & governance",
      title: "Structured control, not a black box.",
      body:
        "Clearly defined roles, permissions and scopes, with a consultable action log and human validation at every sensitive step of the cycle.",
      logTitle: "Action log",
      preview: "Illustrative preview",
      items: [
        "Roles & permissions per team",
        "Defined access scopes",
        "Consultable action log",
        "Human validation on sensitive steps",
      ],
      log: [
        { action: "Order confirmation validated", role: "Supervisor" },
        { action: "Reversal initiated", role: "Finance" },
        { action: "Stock access changed", role: "Admin" },
        { action: "Cash anomaly flagged", role: "Supervised system" },
        { action: "Courier account activated", role: "Operations" },
      ],
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
    modules: {
      kicker: "الوحدات",
      title: "وحدة مخصّصة لكل مرحلة من الدورة.",
      body: "لبنات تشغيلية مصمّمة للعمل معًا، من أول تواصل مع العميل حتى التسوية النهائية.",
      building: "جارٍ بناء منصتك…",
      ctaFinal: "ابدأ الآن ←",
      statusReady: "جاهز",
      statusProgress: "قيد التنفيذ",
      statusQueued: "في الانتظار",
      data: [
        {
          title: "الطلبات والتأكيد",
          desc: "مركزة استقبال الطلبات وهيكلة تأكيد العميل.",
          bullets: ["استقبال مركزي للطلبات", "تأكيد منظم للعميل", "سجل قابل للاطلاع لكل فريق"],
        },
        {
          title: "المخزون والتحضير",
          desc: "حجز المخزون وتنسيق تحضير الطلبات.",
          bullets: ["حجز تلقائي للمخزون", "متابعة التحضير في الوقت الفعلي", "تنبيهات النفاد"],
        },
        {
          title: "التوصيل والتوزيع",
          desc: "تنظيم التوزيع ومتابعة التوصيل في الوقت الفعلي.",
          bullets: ["تخصيص التوصيل حسب المنطقة", "متابعة الحالة مباشرة", "تنسيق مع عمال التوصيل"],
        },
        {
          title: "الدفع عند الاستلام والتسويات",
          desc: "تسوية النقد المُحصّل وهيكلة التسويات.",
          bullets: ["تسوية النقد المُحصّل", "متابعة التسويات لكل عامل توصيل", "سجل قابل للاطلاع"],
        },
        {
          title: "الحوكمة",
          desc: "أدوار وصلاحيات ونطاقات واضحة لكل فريق.",
          bullets: ["أدوار وصلاحيات لكل فريق", "نطاقات وصول محددة", "تحقق بشري في الإجراءات الحساسة"],
        },
        {
          title: "أتمتة خاضعة للإشراف",
          desc: "مهام متكررة مدعومة، تخضع دائمًا للتحقق البشري.",
          bullets: ["مهام متكررة مدعومة", "اقتراحات خاضعة للتحقق", "لا إجراء تلقائي دون موافقة"],
        },
      ],
    },
    cycle: {
      kicker: "الدورة الكاملة",
      title: "من الطلب إلى التسوية، في خط واحد.",
      body: "يمر كل طلب بمسار منظم، مُتتبَّع وخاضع للإشراف من البداية إلى النهاية.",
      steps: [
        "استلام الطلب",
        "التأكيد",
        "حجز المخزون",
        "التحضير",
        "التوزيع",
        "التوصيل",
        "تسوية النقد",
        "التسوية النهائية",
      ],
    },
    ia: {
      kicker: "مساعد تشغيلي بالذكاء الاصطناعي",
      title: "ذكاء اصطناعي مساعد، خاضع للإشراف دائمًا.",
      body:
        "قيد التحضير: مساعد مصمّم لمساعدة الفرق على تحديد الأولويات والتأكيد والكشف — وليس لاتخاذ القرار بمفرده أبدًا.",
      queueTitle: "قائمة الأولويات",
      supervised: "خاضع للإشراف",
      supervisionTitle: "منطقة الإشراف",
      disclaimer: "تبقى كل توصية خاضعة للتحقق البشري قبل أي إجراء على طلب أو دفعة.",
      queue: [
        {
          title: "ترتيب أولويات الطلبات",
          detail: "اقتراح ترتيب المعالجة حسب الأهمية",
          status: "بانتظار التحقق",
        },
        {
          title: "مساعدة في التأكيد",
          detail: "ملخص التبادلات مع العميل",
          status: "مقترح",
        },
        {
          title: "كشف الحالات الشاذة",
          detail: "فرق مُكتشف في تسوية نقدية",
          status: "مُبلَّغ عنه",
        },
        {
          title: "الإجراء التالي",
          detail: "اقتراح متابعة مع عامل التوصيل",
          status: "قيد الانتظار",
        },
      ],
      supervision: [
        {
          title: "ملخصات التفاعلات",
          desc: "يقوم المساعد بتلخيص التبادلات لتسريع قراءة الفريق.",
        },
        {
          title: "اقتراح الإجراءات التالية",
          desc: "اقتراحات للخطوة التالية، لا تُنفَّذ تلقائيًا أبدًا.",
        },
        {
          title: "التحقق البشري النهائي",
          desc: "لا إجراء على طلب أو دفعة دون تأكيد من مشرف.",
        },
      ],
    },
    courier: {
      appName: "NOKI للتوصيل",
      prep: "قيد التحضير",
      missionLabel: "مهمة مُسندة",
      missionText: "توصيل — منطقة كوكودي",
      codLabel: "مبلغ الدفع عند الاستلام",
      codText: "المبلغ المطلوب إدخاله",
      incidentLabel: "الإبلاغ عن حادثة",
      incidentTag1: "غياب العميل",
      incidentTag2: "طرد تالف",
      confirmSent: "تم إرسال تأكيد التقدم",
      kicker: "تطبيق التوصيل — قيد التحضير",
      title: "رفيق ميداني مصمّم لعمال التوصيل لديك.",
      body:
        "تطبيق مخصّص قيد التحضير لمرافقة عمال التوصيل مباشرة في الميدان: مهمة مُسندة، حالة التقدم، الإعلان عن النقد المُحصّل، والإبلاغ عن الحوادث ببضع لمسات.",
      benefits: [
        "مهمة مُسندة وحالة واضحة",
        "الإعلان عن النقد ببضع لمسات",
        "إبلاغ مبسّط عن الحوادث",
        "تأكيد التقدم في الوقت الفعلي",
      ],
    },
    security: {
      kicker: "الأمان والحوكمة",
      title: "تحكّم منظم، لا صندوق أسود.",
      body:
        "أدوار وصلاحيات ونطاقات محددة بوضوح، مع سجل إجراءات قابل للاطلاع وتحقق بشري في كل مرحلة حساسة من الدورة.",
      logTitle: "سجل الإجراءات",
      preview: "معاينة توضيحية",
      items: [
        "أدوار وصلاحيات لكل فريق",
        "نطاقات وصول محددة",
        "سجل إجراءات قابل للاطلاع",
        "تحقق بشري في الخطوات الحساسة",
      ],
      log: [
        { action: "تم التحقق من تأكيد الطلب", role: "مشرف" },
        { action: "تم بدء التسوية", role: "المالية" },
        { action: "تعديل صلاحيات الوصول للمخزون", role: "مسؤول" },
        { action: "الإبلاغ عن حالة نقدية شاذة", role: "نظام خاضع للإشراف" },
        { action: "تفعيل حساب عامل التوصيل", role: "العمليات" },
      ],
    },
  },
};
