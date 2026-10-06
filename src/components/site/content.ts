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
      login: string;
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
    integrations: {
      kicker: string;
      title: string;
      body: string;
      connectorsTitle: string;
      flowTitle: string;
      flow: {
        sellerTools: string;
        nokiConnector: string;
        centralApi: string;
        operations: string;
        postbacks: string;
        sellerSystem: string;
      };
      connectors: {
        name: string;
        mark: string;
        status: string;
      }[];
      operations: string[];
      universalTitle: string;
      universalBody: string;
      plannedStatus: string;
      postbacksTitle: string;
      postbacksNote: string;
      postbackEvents: string[];
      capabilitiesTitle: string;
      capabilities: {
        title: string;
        items: string[];
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
    markets: {
      kicker: string;
      title: string;
      body: string;
      cardDesc: string;
      loading: string;
    };
    benefits: {
      kicker: string;
      title: string;
      items: {
        title: string;
        desc: string;
      }[];
    };
    faq: {
      kicker: string;
      title: string;
      titleAccent: string;
      body: string;
      more: string;
      talk: string;
      items: {
        q: string;
        a: string;
      }[];
    };
    mobile: {
      kicker: string;
      title: string;
      titleAccent: string;
      body: string;
      dailyFigure: string;
      shipped: string;
      shippedSub: string;
      newOrder: string;
      newOrderSub: string;
      preview: string;
      features: string[];
    };
    ctaFinal: {
      title: string;
      body: string;
      cta1: string;
      cta2: string;
    };
    footer: {
      tagline: string;
      colPlatform: string;
      colTrust: string;
      colContact: string;
      linkModules: string;
      linkCycle: string;
      linkIA: string;
      linkSecurity: string;
      linkMarkets: string;
      linkContact: string;
      linkSignup: string;
      linkLogin: string;
      copyright: string;
      designed: string;
    };
    chat: {
      greeting: string;
      placeholder: string;
      assistantLabel: string;
      typing: string;
      unavailable: string;
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
      login: "Se connecter",
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
    integrations: {
      kicker: "Intégrations e-commerce",
      title: "Connectez vos outils. NOKI orchestre le reste.",
      body:
        "Conservez votre stack e-commerce existant : Google Sheets, Shopify, WooCommerce, YouCan, Storeino, CRM, ERP ou back-office. NOKI centralise la synchronisation des commandes via son API e-commerce, puis restitue les statuts avec webhooks et postbacks selon l’intégration configurée.",
      connectorsTitle: "Outils vendeur",
      flowTitle: "Architecture API-only",
      flow: {
        sellerTools: "Plateforme vendeur / CRM",
        nokiConnector: "API ou connecteur NOKI",
        centralApi: "API centrale NOKI",
        operations: "Traitement opérationnel",
        postbacks: "Webhooks / postbacks",
        sellerSystem: "Système vendeur",
      },
      connectors: [
        { name: "Google Sheets", mark: "GS", status: "En préparation" },
        { name: "Shopify", mark: "SH", status: "En préparation" },
        { name: "WooCommerce", mark: "WC", status: "En préparation" },
        { name: "YouCan", mark: "YC", status: "En préparation" },
        { name: "Storeino", mark: "ST", status: "En préparation" },
        { name: "API / CRM / ERP", mark: "API", status: "Architecture API" },
      ],
      operations: ["Confirmation", "Stock", "Fulfillment", "Dispatch", "Livraison", "COD", "Retours"],
      universalTitle: "API universelle pour systèmes propriétaires",
      universalBody:
        "Connectez votre CRM, ERP, back-office, marketplace ou application métier à l’architecture NOKI via API, webhooks et postbacks sécurisés.",
      plannedStatus: "Architecture prévue",
      postbacksTitle: "Exemple de timeline postback",
      postbacksNote:
        "Et d’autres événements opérationnels selon les droits et l’intégration configurée.",
      postbackEvents: ["Commande reçue", "Confirmée", "En livraison", "Livrée", "Rapprochée"],
      capabilitiesTitle: "Capacités techniques prévues",
      capabilities: [
        { title: "Sécurité", items: ["Signatures", "Webhooks entrants contrôlés"] },
        { title: "Fiabilité", items: ["Idempotence", "Retries contrôlés"] },
        { title: "Mapping", items: ["Mapping des statuts", "Mapping des champs"] },
        { title: "Observabilité", items: ["API documentée", "Logs d’intégration"] },
        { title: "Credentials", items: ["Scopes dédiés", "Rotation et révocation"] },
        { title: "Replay", items: ["Historique des tentatives", "Replay d’événements échoués"] },
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
      missionText: "Livraison — Zone Poto-Poto",
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
    markets: {
      kicker: "Marchés ciblés",
      title: "Une plateforme pensée pour plusieurs marchés africains.",
      body:
        "Une architecture adaptable, conçue pour s'étendre à mesure que de nouveaux marchés sont ciblés.",
      cardDesc: "Marché ciblé — architecture pensée pour s'y déployer avec une gouvernance adaptée.",
      loading: "Chargement de la carte…",
    },
    benefits: {
      kicker: "Pourquoi choisir NOKI",
      title: "La valeur d'un pilotage centralisé.",
      items: [
        { title: "Visibilité", desc: "Une vue consolidée sur l'ensemble du cycle opérationnel." },
        { title: "Centralisation", desc: "Un seul environnement pour piloter commandes, stock et cash." },
        { title: "Contrôle", desc: "Des permissions et une gouvernance clairement définies." },
        { title: "Coordination", desc: "Des équipes alignées sur un même référentiel opérationnel." },
        { title: "Gouvernance", desc: "Une structure de validation pensée pour la confiance." },
        { title: "Évolutivité", desc: "Une architecture adaptable aux marchés ciblés." },
      ],
    },
    faq: {
      kicker: "Questions fréquentes",
      title: "Tout ce que vous devez savoir",
      titleAccent: "avant de commencer.",
      body:
        "Les questions les plus posées par les équipes qui découvrent NOKI Service. Votre question n'y figure pas ? Notre équipe reste joignable.",
      more: "Encore des questions ?",
      talk: "Parler à notre équipe →",
      items: [
        {
          q: "Faut-il des compétences techniques pour utiliser NOKI Service ?",
          a: "Non. La plateforme est pensée pour les équipes opérationnelles, pas pour des développeurs : configuration guidée, interface simple, sans ligne de code.",
        },
        {
          q: "Combien de temps pour être opérationnel ?",
          a: "Le temps de mise en route dépend de votre organisation actuelle. L'architecture est pensée pour une prise en main rapide, sans migration lourde.",
        },
        {
          q: "Puis-je connecter mes outils actuels de commande ou de livraison ?",
          a: "L'architecture est conçue pour s'adapter à différents flux existants. Chaque intégration est étudiée selon vos outils en place.",
        },
        {
          q: "Quels moyens de paiement et transporteurs sont pris en charge ?",
          a: "NOKI Service est pensé pour le paiement à la livraison et s'articule avec vos partenaires de livraison actuels ; le périmètre exact est défini selon votre marché.",
        },
        {
          q: "Que se passe-t-il si je souhaite arrêter d'utiliser la plateforme ?",
          a: "Vos données opérationnelles restent accessibles et exportables ; aucune dépendance forcée n'est imposée.",
        },
        {
          q: "Mes données et celles de mes clients sont-elles protégées ?",
          a: "La gouvernance intègre rôles, permissions et journal d'actions, avec une supervision humaine sur les étapes sensibles.",
        },
        {
          q: "Le support est-il disponible en français ?",
          a: "Oui, le support est pensé pour accompagner les équipes en français, avec une extension à d'autres langues selon les marchés ciblés.",
        },
      ],
    },
    mobile: {
      kicker: "Mobile-friendly",
      title: "Pilotez votre activité.",
      titleAccent: "Où que vous soyez.",
      body:
        "Un contrôle pensé pour suivre vos commandes, votre stock et votre cash depuis un mobile, sans dépendre d'un poste fixe — la même plateforme, adaptée à l'écran que vous avez sous la main.",
      dailyFigure: "Chiffre du jour",
      shipped: "Commande expédiée",
      shippedSub: "Livrée demain, 10h",
      newOrder: "Nouvelle commande",
      newOrderSub: "+69,00 $ · il y a 2 min",
      preview: "Aperçu illustratif",
      features: [
        "Alertes commande en temps réel",
        "Chiffre du jour d'un coup d'œil",
        "Suivi du stock en déplacement",
        "Confirmation de commande en un clic",
      ],
    },
    ctaFinal: {
      title: "Découvrez ce que NOKI Service permet de piloter.",
      body: "Inscrivez-vous pour découvrir comment la plateforme s'adapte à votre cycle opérationnel.",
      cta1: "S'inscrire maintenant",
      cta2: "Contacter l'équipe",
    },
    footer: {
      tagline: "Plateforme opérationnelle pensée pour le cycle du paiement à la livraison en Afrique.",
      colPlatform: "Plateforme",
      colTrust: "Confiance",
      colContact: "Contact",
      linkModules: "Modules",
      linkCycle: "Cycle",
      linkIA: "IA d'assistance",
      linkSecurity: "Sécurité & gouvernance",
      linkMarkets: "Marchés ciblés",
      linkContact: "Contact",
      linkSignup: "S'inscrire maintenant",
      linkLogin: "Se connecter",
      copyright: "© 2026 NOKI Service. Tous droits réservés.",
      designed: "Conçu pour une gouvernance opérationnelle claire.",
    },
    chat: {
      greeting: "Bonjour, je suis Idjor. Comment puis-je vous aider à comprendre la plateforme NOKI Service ?",
      placeholder: "Posez votre question…",
      assistantLabel: "Assistant NOKI",
      typing: "Idjor rédige une réponse…",
      unavailable: "Idjor est en préparation.",
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
      login: "Sign in",
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
    integrations: {
      kicker: "E-commerce integrations",
      title: "Connect your tools. NOKI orchestrates the rest.",
      body:
        "Keep your existing e-commerce stack: Google Sheets, Shopify, WooCommerce, YouCan, Storeino, CRM, ERP or back office. NOKI centralizes order synchronization through its e-commerce API, then returns statuses through webhooks and postbacks depending on the configured integration.",
      connectorsTitle: "Seller tools",
      flowTitle: "API-only architecture",
      flow: {
        sellerTools: "Seller platform / CRM",
        nokiConnector: "NOKI API or connector",
        centralApi: "NOKI central API",
        operations: "Operational processing",
        postbacks: "Webhooks / postbacks",
        sellerSystem: "Seller system",
      },
      connectors: [
        { name: "Google Sheets", mark: "GS", status: "Coming soon" },
        { name: "Shopify", mark: "SH", status: "Coming soon" },
        { name: "WooCommerce", mark: "WC", status: "Coming soon" },
        { name: "YouCan", mark: "YC", status: "Coming soon" },
        { name: "Storeino", mark: "ST", status: "Coming soon" },
        { name: "API / CRM / ERP", mark: "API", status: "API architecture" },
      ],
      operations: ["Confirmation", "Stock", "Fulfillment", "Dispatch", "Delivery", "COD", "Returns"],
      universalTitle: "Universal API for proprietary systems",
      universalBody:
        "Connect your CRM, ERP, back office, marketplace or business application to the NOKI architecture through secure APIs, webhooks and postbacks.",
      plannedStatus: "Planned architecture",
      postbacksTitle: "Example postback timeline",
      postbacksNote: "And additional operational events depending on permissions and integration configuration.",
      postbackEvents: ["Order received", "Confirmed", "Out for delivery", "Delivered", "Reconciled"],
      capabilitiesTitle: "Planned technical capabilities",
      capabilities: [
        { title: "Security", items: ["Signatures", "Controlled inbound webhooks"] },
        { title: "Reliability", items: ["Idempotence", "Controlled retries"] },
        { title: "Mapping", items: ["Status mapping", "Field mapping"] },
        { title: "Observability", items: ["Documented API", "Integration logs"] },
        { title: "Credentials", items: ["Dedicated scopes", "Rotation and revocation"] },
        { title: "Replay", items: ["Attempt history", "Failed event replay"] },
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
      missionText: "Delivery — Poto-Poto zone",
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
    markets: {
      kicker: "Target markets",
      title: "A platform designed for several African markets.",
      body: "An adaptable architecture, designed to expand as new markets are targeted.",
      cardDesc: "Target market — architecture designed to deploy there with adapted governance.",
      loading: "Loading map…",
    },
    benefits: {
      kicker: "Why choose NOKI",
      title: "The value of centralized control.",
      items: [
        { title: "Visibility", desc: "A consolidated view across the entire operational cycle." },
        { title: "Centralization", desc: "A single environment to run orders, stock and cash." },
        { title: "Control", desc: "Clearly defined permissions and governance." },
        { title: "Coordination", desc: "Teams aligned on the same operational reference." },
        { title: "Governance", desc: "A validation structure built for trust." },
        { title: "Scalability", desc: "An architecture adaptable to target markets." },
      ],
    },
    faq: {
      kicker: "Frequently asked questions",
      title: "Everything you need to know",
      titleAccent: "before getting started.",
      body: "The most common questions from teams discovering NOKI Service. Don't see yours? Our team is reachable.",
      more: "More questions?",
      talk: "Talk to our team →",
      items: [
        {
          q: "Do I need technical skills to use NOKI Service?",
          a: "No. The platform is built for operational teams, not developers: guided setup, simple interface, no code required.",
        },
        {
          q: "How long does it take to get up and running?",
          a: "Onboarding time depends on your current organization. The architecture is designed for a quick start, without heavy migration.",
        },
        {
          q: "Can I connect my current order or delivery tools?",
          a: "The architecture is designed to adapt to different existing flows. Each integration is assessed based on your current tools.",
        },
        {
          q: "Which payment methods and carriers are supported?",
          a: "NOKI Service is built for cash on delivery and works alongside your current delivery partners; exact scope is defined per market.",
        },
        {
          q: "What happens if I want to stop using the platform?",
          a: "Your operational data remains accessible and exportable; no forced lock-in is imposed.",
        },
        {
          q: "Is my data and my customers’ data protected?",
          a: "Governance includes roles, permissions and an action log, with human supervision on sensitive steps.",
        },
        {
          q: "Is support available in English?",
          a: "Yes, support is designed to assist teams in English, with extension to other languages depending on target markets.",
        },
      ],
    },
    mobile: {
      kicker: "Mobile-friendly",
      title: "Run your business.",
      titleAccent: "Wherever you are.",
      body:
        "A control layer designed to track your orders, stock and cash from a phone, with no dependency on a fixed workstation — the same platform, adapted to whatever screen you have on hand.",
      dailyFigure: "Today's figure",
      shipped: "Order shipped",
      shippedSub: "Delivered tomorrow, 10am",
      newOrder: "New order",
      newOrderSub: "+$69.00 · 2 min ago",
      preview: "Illustrative preview",
      features: [
        "Real-time order alerts",
        "Today's figure at a glance",
        "Stock tracking on the move",
        "One-tap order confirmation",
      ],
    },
    ctaFinal: {
      title: "See what NOKI Service lets you run.",
      body: "Sign up to see how the platform adapts to your operational cycle.",
      cta1: "Sign up now",
      cta2: "Contact the team",
    },
    footer: {
      tagline: "An operational platform designed for the cash-on-delivery cycle in Africa.",
      colPlatform: "Platform",
      colTrust: "Trust",
      colContact: "Contact",
      linkModules: "Modules",
      linkCycle: "Cycle",
      linkIA: "AI assistant",
      linkSecurity: "Security & governance",
      linkMarkets: "Target markets",
      linkContact: "Contact",
      linkSignup: "Sign up now",
      linkLogin: "Sign in",
      copyright: "© 2026 NOKI Service. All rights reserved.",
      designed: "Built for clear operational governance.",
    },
    chat: {
      greeting: "Hi, I'm Idjor. How can I help you understand the NOKI Service platform?",
      placeholder: "Ask a question…",
      assistantLabel: "NOKI Assistant",
      typing: "Idjor is typing a reply…",
      unavailable: "Idjor is in development.",
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
      login: "تسجيل الدخول",
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
    integrations: {
      kicker: "تكاملات التجارة الإلكترونية",
      title: "اربط أدواتك. NOKI يتولى تنسيق بقية العمليات.",
      body:
        "احتفظ بمنظومة التجارة الإلكترونية الحالية لديك: Google Sheets أو Shopify أو WooCommerce أو YouCan أو Storeino أو CRM أو ERP أو لوحة خلفية. تعمل NOKI على مركزة مزامنة الطلبات عبر واجهة API للتجارة الإلكترونية، ثم تعيد الحالات عبر webhooks وpostbacks حسب إعداد التكامل.",
      connectorsTitle: "أدوات البائع",
      flowTitle: "بنية تعتمد على API فقط",
      flow: {
        sellerTools: "منصة البائع / CRM",
        nokiConnector: "API أو موصل NOKI",
        centralApi: "واجهة NOKI المركزية",
        operations: "المعالجة التشغيلية",
        postbacks: "Webhooks / postbacks",
        sellerSystem: "نظام البائع",
      },
      connectors: [
        { name: "Google Sheets", mark: "GS", status: "قيد الإعداد" },
        { name: "Shopify", mark: "SH", status: "قيد الإعداد" },
        { name: "WooCommerce", mark: "WC", status: "قيد الإعداد" },
        { name: "YouCan", mark: "YC", status: "قيد الإعداد" },
        { name: "Storeino", mark: "ST", status: "قيد الإعداد" },
        { name: "API / CRM / ERP", mark: "API", status: "بنية API" },
      ],
      operations: ["التأكيد", "المخزون", "Fulfillment", "التوزيع", "التوصيل", "COD", "المرتجعات"],
      universalTitle: "واجهة API موحدة للأنظمة المملوكة",
      universalBody:
        "اربط CRM أو ERP أو اللوحة الخلفية أو marketplace أو تطبيقك التشغيلي ببنية NOKI عبر API وwebhooks وpostbacks آمنة.",
      plannedStatus: "بنية مخططة",
      postbacksTitle: "مثال لمسار postback",
      postbacksNote: "وأحداث تشغيلية إضافية حسب الصلاحيات وإعدادات التكامل.",
      postbackEvents: ["تم استلام الطلب", "تم التأكيد", "قيد التوصيل", "تم التسليم", "تمت المطابقة"],
      capabilitiesTitle: "قدرات تقنية مخططة",
      capabilities: [
        { title: "الأمان", items: ["توقيعات", "Webhooks واردة مضبوطة"] },
        { title: "الاعتمادية", items: ["Idempotence", "إعادات محاولة مضبوطة"] },
        { title: "المواءمة", items: ["مواءمة الحالات", "مواءمة الحقول"] },
        { title: "المراقبة", items: ["API موثقة", "سجلات التكامل"] },
        { title: "بيانات الاعتماد", items: ["Scopes مخصصة", "تدوير وإلغاء"] },
        { title: "إعادة التشغيل", items: ["سجل المحاولات", "Replay للأحداث الفاشلة"] },
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
      missionText: "توصيل — منطقة بوتو-بوتو",
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
    markets: {
      kicker: "الأسواق المستهدفة",
      title: "منصة مصمّمة لعدة أسواق أفريقية.",
      body: "بنية قابلة للتكيّف، مصمّمة للتوسع مع استهداف أسواق جديدة.",
      cardDesc: "سوق مستهدف — بنية مصمّمة للانتشار فيه بحوكمة مناسبة.",
      loading: "جارٍ تحميل الخريطة…",
    },
    benefits: {
      kicker: "لماذا تختار NOKI",
      title: "قيمة القيادة المركزية.",
      items: [
        { title: "الرؤية", desc: "نظرة موحّدة على الدورة التشغيلية بأكملها." },
        { title: "المركزية", desc: "بيئة واحدة لإدارة الطلبات والمخزون والنقد." },
        { title: "التحكّم", desc: "صلاحيات وحوكمة محددة بوضوح." },
        { title: "التنسيق", desc: "فرق متناسقة حول مرجع تشغيلي واحد." },
        { title: "الحوكمة", desc: "بنية تحقق مصمّمة لبناء الثقة." },
        { title: "قابلية التوسع", desc: "بنية قابلة للتكيّف مع الأسواق المستهدفة." },
      ],
    },
    faq: {
      kicker: "الأسئلة الشائعة",
      title: "كل ما تحتاج معرفته",
      titleAccent: "قبل البدء.",
      body: "أكثر الأسئلة شيوعًا من الفرق التي تكتشف NOKI Service. سؤالك غير موجود؟ فريقنا متاح للتواصل.",
      more: "أسئلة أخرى؟",
      talk: "تحدث مع فريقنا ←",
      items: [
        {
          q: "هل أحتاج إلى مهارات تقنية لاستخدام NOKI Service؟",
          a: "لا. المنصة مصمّمة للفرق التشغيلية، وليس للمطورين: إعداد موجّه، واجهة بسيطة، دون أي كتابة أكواد.",
        },
        {
          q: "كم من الوقت يلزم لتصبح المنصة تشغيلية؟",
          a: "يعتمد وقت الانطلاق على تنظيمكم الحالي. البنية مصمّمة لانطلاقة سريعة، دون ترحيل ثقيل.",
        },
        {
          q: "هل يمكنني ربط أدواتي الحالية للطلبات أو التوصيل؟",
          a: "البنية مصمّمة للتكيّف مع مختلف التدفقات القائمة. تُدرَس كل عملية دمج حسب أدواتكم الحالية.",
        },
        {
          q: "ما هي وسائل الدفع وشركات التوصيل المدعومة؟",
          a: "صُمّمت NOKI Service للدفع عند الاستلام وتتكامل مع شركاء التوصيل الحاليين لديكم؛ يُحدَّد النطاق الدقيق حسب سوقكم.",
        },
        {
          q: "ماذا يحدث إذا رغبت في التوقف عن استخدام المنصة؟",
          a: "تبقى بياناتكم التشغيلية قابلة للوصول والتصدير؛ دون أي ارتباط إجباري.",
        },
        {
          q: "هل بياناتي وبيانات عملائي محمية؟",
          a: "تتضمن الحوكمة أدوارًا وصلاحيات وسجل إجراءات، مع إشراف بشري على الخطوات الحساسة.",
        },
        {
          q: "هل الدعم متوفر باللغة العربية؟",
          a: "نعم، الدعم مصمّم لمرافقة الفرق باللغة العربية، مع إمكانية التوسع للغات أخرى حسب الأسواق المستهدفة.",
        },
      ],
    },
    mobile: {
      kicker: "متوافق مع الهاتف المحمول",
      title: "أدر نشاطك.",
      titleAccent: "أينما كنت.",
      body:
        "تحكّم مصمّم لمتابعة طلباتكم ومخزونكم ونقدكم من الهاتف المحمول، دون الاعتماد على محطة عمل ثابتة — نفس المنصة، متكيّفة مع أي شاشة بين يديك.",
      dailyFigure: "رقم اليوم",
      shipped: "تم شحن الطلب",
      shippedSub: "التسليم غدًا، الساعة 10 صباحًا",
      newOrder: "طلب جديد",
      newOrderSub: "69.00 دولار+ · منذ دقيقتين",
      preview: "معاينة توضيحية",
      features: [
        "تنبيهات الطلبات في الوقت الفعلي",
        "رقم اليوم بنظرة واحدة",
        "متابعة المخزون أثناء التنقل",
        "تأكيد الطلب بلمسة واحدة",
      ],
    },
    ctaFinal: {
      title: "اكتشف ما يمكن لـ NOKI Service أن يديره لك.",
      body: "سجّل لتكتشف كيف تتكيّف المنصة مع دورتك التشغيلية.",
      cta1: "سجّل الآن",
      cta2: "تواصل مع الفريق",
    },
    footer: {
      tagline: "منصة تشغيلية مصمّمة لدورة الدفع عند الاستلام في أفريقيا.",
      colPlatform: "المنصة",
      colTrust: "الثقة",
      colContact: "اتصل بنا",
      linkModules: "الوحدات",
      linkCycle: "الدورة",
      linkIA: "المساعد الذكي",
      linkSecurity: "الأمان والحوكمة",
      linkMarkets: "الأسواق المستهدفة",
      linkContact: "اتصل بنا",
      linkSignup: "سجّل الآن",
      linkLogin: "تسجيل الدخول",
      copyright: "© 2026 NOKI Service. جميع الحقوق محفوظة.",
      designed: "مصمّمة لحوكمة تشغيلية واضحة.",
    },
    chat: {
      greeting: "مرحبًا، أنا إيدجور. كيف يمكنني مساعدتك على فهم منصة NOKI Service؟",
      placeholder: "اطرح سؤالك…",
      assistantLabel: "مساعد NOKI",
      typing: "إيدجور يكتب ردًا…",
      unavailable: "إدجور قيد التحضير.",
    },
  },
};
