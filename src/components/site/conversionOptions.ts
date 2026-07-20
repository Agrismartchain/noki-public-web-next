import type { Option } from "@/components/forms/NokiFormControls";

import type { Language } from "./content";
import { PRIORITY_COUNTRIES, labelFor } from "./conversionContent";

type Choice = {
  value: string;
  labels: Record<Language, string>;
};

export function choicesToOptions(choices: readonly Choice[], language: Language): Option[] {
  return choices.map((choice) => ({
    value: choice.value,
    label: choice.labels[language],
  }));
}

export function countryOptions(language: Language): Option[] {
  return PRIORITY_COUNTRIES.map((country) => ({
    value: country.value,
    label: labelFor(country.labels, language),
  }));
}

export const LANGUAGE_CHOICES = [
  { value: "fr", labels: { fr: "FR", en: "FR", ar: "FR" } },
  { value: "en", labels: { fr: "EN", en: "EN", ar: "EN" } },
  { value: "ar", labels: { fr: "AR", en: "AR", ar: "AR" } },
] as const satisfies readonly Choice[];

export const CHANNEL_CHOICES = [
  { value: "email", labels: { fr: "Email", en: "Email", ar: "البريد الإلكتروني" } },
  { value: "phone", labels: { fr: "Téléphone", en: "Phone", ar: "الهاتف" } },
  { value: "whatsapp", labels: { fr: "WhatsApp", en: "WhatsApp", ar: "واتساب" } },
] as const satisfies readonly Choice[];

export const MONTHLY_ORDER_CHOICES = [
  { value: "lt-100", labels: { fr: "Moins de 100", en: "Less than 100", ar: "أقل من 100" } },
  { value: "100-500", labels: { fr: "100-500", en: "100-500", ar: "100-500" } },
  { value: "500-2000", labels: { fr: "500-2 000", en: "500-2,000", ar: "500-2,000" } },
  { value: "2000-10000", labels: { fr: "2 000-10 000", en: "2,000-10,000", ar: "2,000-10,000" } },
  { value: "gt-10000", labels: { fr: "Plus de 10 000", en: "More than 10,000", ar: "أكثر من 10,000" } },
] as const satisfies readonly Choice[];

export const COD_SHARE_CHOICES = [
  { value: "lt-25", labels: { fr: "Moins de 25 %", en: "Less than 25%", ar: "أقل من 25%" } },
  { value: "25-50", labels: { fr: "25-50 %", en: "25-50%", ar: "25-50%" } },
  { value: "50-75", labels: { fr: "50-75 %", en: "50-75%", ar: "50-75%" } },
  { value: "gt-75", labels: { fr: "Plus de 75 %", en: "More than 75%", ar: "أكثر من 75%" } },
] as const satisfies readonly Choice[];

export const CURRENCY_CHOICES = [
  { value: "xaf", labels: { fr: "XAF", en: "XAF", ar: "XAF" } },
  { value: "xof", labels: { fr: "XOF", en: "XOF", ar: "XOF" } },
  { value: "usd", labels: { fr: "USD", en: "USD", ar: "USD" } },
  { value: "eur", labels: { fr: "EUR", en: "EUR", ar: "EUR" } },
] as const satisfies readonly Choice[];

export const PLATFORM_CHOICES = [
  { value: "shopify", labels: { fr: "Shopify", en: "Shopify", ar: "Shopify" } },
  { value: "woocommerce", labels: { fr: "WooCommerce", en: "WooCommerce", ar: "WooCommerce" } },
  { value: "prestashop", labels: { fr: "PrestaShop", en: "PrestaShop", ar: "PrestaShop" } },
  { value: "magento", labels: { fr: "Magento / Adobe Commerce", en: "Magento / Adobe Commerce", ar: "Magento / Adobe Commerce" } },
  { value: "marketplace", labels: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" } },
  {
    value: "social-commerce",
    labels: {
      fr: "Instagram / WhatsApp / Social Commerce",
      en: "Instagram / WhatsApp / Social Commerce",
      ar: "Instagram / WhatsApp / التجارة الاجتماعية",
    },
  },
  { value: "proprietary", labels: { fr: "Solution propriétaire", en: "Proprietary solution", ar: "حل خاص" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const DELIVERY_MODEL_CHOICES = [
  { value: "internal", labels: { fr: "Flotte interne", en: "Internal fleet", ar: "فريق توصيل داخلي" } },
  { value: "partners", labels: { fr: "Transporteurs partenaires", en: "Partner carriers", ar: "شركات توصيل شريكة" } },
  { value: "mixed", labels: { fr: "Mixte", en: "Mixed", ar: "مختلط" } },
] as const satisfies readonly Choice[];

export const PAIN_POINT_CHOICES = [
  { value: "confirmation", labels: { fr: "Confirmation des commandes", en: "Order confirmation", ar: "تأكيد الطلبات" } },
  { value: "fake-numbers", labels: { fr: "Faux numéros / commandes non fiables", en: "Wrong numbers / unreliable orders", ar: "أرقام خاطئة / طلبات غير موثوقة" } },
  { value: "stock", labels: { fr: "Stock", en: "Stock", ar: "المخزون" } },
  { value: "dispatch", labels: { fr: "Dispatch", en: "Dispatch", ar: "التوزيع" } },
  { value: "courier-tracking", labels: { fr: "Suivi livreurs", en: "Courier tracking", ar: "تتبع عمال التوصيل" } },
  { value: "failure-rate", labels: { fr: "Taux d’échec", en: "Failure rate", ar: "نسبة الفشل" } },
  { value: "cod", labels: { fr: "COD", en: "COD", ar: "الدفع عند الاستلام" } },
  { value: "reconciliation", labels: { fr: "Rapprochement", en: "Reconciliation", ar: "المطابقة" } },
  { value: "remittance", labels: { fr: "Reversements", en: "Remittances", ar: "التسويات" } },
  { value: "reporting", labels: { fr: "Reporting", en: "Reporting", ar: "التقارير" } },
  { value: "multi-country", labels: { fr: "Coordination multi-pays", en: "Multi-country coordination", ar: "تنسيق متعدد البلدان" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const TIMELINE_CHOICES = [
  { value: "now", labels: { fr: "Immédiatement", en: "Immediately", ar: "فورًا" } },
  { value: "lt-1-month", labels: { fr: "Moins de 1 mois", en: "Less than 1 month", ar: "أقل من شهر" } },
  { value: "1-3-months", labels: { fr: "1-3 mois", en: "1-3 months", ar: "1-3 أشهر" } },
  { value: "3-6-months", labels: { fr: "3-6 mois", en: "3-6 months", ar: "3-6 أشهر" } },
  { value: "exploration", labels: { fr: "Exploration", en: "Exploration", ar: "استكشاف" } },
] as const satisfies readonly Choice[];

export const API_CAPABILITY_CHOICES = [
  { value: "yes", labels: { fr: "Oui", en: "Yes", ar: "نعم" } },
  { value: "no", labels: { fr: "Non", en: "No", ar: "لا" } },
  { value: "review", labels: { fr: "En étude", en: "Under review", ar: "قيد الدراسة" } },
] as const satisfies readonly Choice[];

export const PARTNERSHIP_CHOICES = [
  { value: "coverage", labels: { fr: "Extension de couverture", en: "Coverage extension", ar: "توسيع التغطية" } },
  { value: "integration", labels: { fr: "Intégration opérationnelle", en: "Operational integration", ar: "تكامل تشغيلي" } },
  { value: "technology", labels: { fr: "Partenariat technologique", en: "Technology partnership", ar: "شراكة تقنية" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const INTEGRATION_NEED_CHOICES = [
  { value: "orders", labels: { fr: "Commandes", en: "Orders", ar: "الطلبات" } },
  { value: "stock", labels: { fr: "Stock", en: "Stock", ar: "المخزون" } },
  { value: "delivery", labels: { fr: "Livraison", en: "Delivery", ar: "التوصيل" } },
  { value: "cod", labels: { fr: "COD", en: "COD", ar: "الدفع عند الاستلام" } },
  { value: "webhooks", labels: { fr: "Webhooks", en: "Webhooks", ar: "Webhooks" } },
  { value: "reporting", labels: { fr: "Reporting", en: "Reporting", ar: "التقارير" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const ENVIRONMENT_CHOICES = [
  { value: "saas", labels: { fr: "SaaS", en: "SaaS", ar: "SaaS" } },
  { value: "erp", labels: { fr: "ERP", en: "ERP", ar: "ERP" } },
  { value: "wms", labels: { fr: "WMS", en: "WMS", ar: "WMS" } },
  { value: "proprietary-app", labels: { fr: "Application propriétaire", en: "Proprietary application", ar: "تطبيق خاص" } },
] as const satisfies readonly Choice[];

export const COMPANY_TYPE_CHOICES = [
  { value: "pure-player", labels: { fr: "E-commerce pure player", en: "E-commerce pure player", ar: "تجارة إلكترونية فقط" } },
  { value: "retail-commerce", labels: { fr: "Retail + e-commerce", en: "Retail + e-commerce", ar: "تجزئة + تجارة إلكترونية" } },
  { value: "marketplace", labels: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" } },
  { value: "social-commerce", labels: { fr: "Social commerce", en: "Social commerce", ar: "تجارة اجتماعية" } },
  { value: "distributor", labels: { fr: "Distributeur", en: "Distributor", ar: "موزع" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const SECTOR_CHOICES = [
  { value: "fashion", labels: { fr: "Mode", en: "Fashion", ar: "الموضة" } },
  { value: "beauty", labels: { fr: "Beauté", en: "Beauty", ar: "الجمال" } },
  { value: "electronics", labels: { fr: "Électronique", en: "Electronics", ar: "الإلكترونيات" } },
  { value: "home", labels: { fr: "Maison", en: "Home", ar: "المنزل" } },
  { value: "food", labels: { fr: "Alimentaire", en: "Food", ar: "الغذاء" } },
  { value: "health", labels: { fr: "Santé / bien-être", en: "Health / wellness", ar: "الصحة / العافية" } },
  { value: "generalist", labels: { fr: "Généraliste", en: "Generalist", ar: "متنوع" } },
  { value: "other", labels: { fr: "Autre", en: "Other", ar: "أخرى" } },
] as const satisfies readonly Choice[];

export const TEAM_SIZE_CHOICES = [
  { value: "1-5", labels: { fr: "1-5", en: "1-5", ar: "1-5" } },
  { value: "6-20", labels: { fr: "6-20", en: "6-20", ar: "6-20" } },
  { value: "21-50", labels: { fr: "21-50", en: "21-50", ar: "21-50" } },
  { value: "51-200", labels: { fr: "51-200", en: "51-200", ar: "51-200" } },
  { value: "gt-200", labels: { fr: "Plus de 200", en: "More than 200", ar: "أكثر من 200" } },
] as const satisfies readonly Choice[];

export const YEARS_ACTIVE_CHOICES = [
  { value: "lt-1", labels: { fr: "Moins de 1 an", en: "Less than 1 year", ar: "أقل من سنة" } },
  { value: "1-3", labels: { fr: "1-3 ans", en: "1-3 years", ar: "1-3 سنوات" } },
  { value: "3-5", labels: { fr: "3-5 ans", en: "3-5 years", ar: "3-5 سنوات" } },
  { value: "gt-5", labels: { fr: "Plus de 5 ans", en: "More than 5 years", ar: "أكثر من 5 سنوات" } },
] as const satisfies readonly Choice[];

export const SALES_CHANNEL_CHOICES = [
  { value: "website", labels: { fr: "Site web", en: "Website", ar: "الموقع" } },
  { value: "marketplace", labels: { fr: "Marketplace", en: "Marketplace", ar: "سوق إلكتروني" } },
  { value: "whatsapp", labels: { fr: "WhatsApp", en: "WhatsApp", ar: "واتساب" } },
  { value: "instagram", labels: { fr: "Instagram", en: "Instagram", ar: "Instagram" } },
  { value: "physical-shops", labels: { fr: "Boutiques physiques", en: "Physical stores", ar: "متاجر فعلية" } },
  { value: "call-center", labels: { fr: "Call center", en: "Call center", ar: "مركز اتصال" } },
] as const satisfies readonly Choice[];

export const SMALL_RANGE_CHOICES = [
  { value: "1", labels: { fr: "1", en: "1", ar: "1" } },
  { value: "2-5", labels: { fr: "2-5", en: "2-5", ar: "2-5" } },
  { value: "6-10", labels: { fr: "6-10", en: "6-10", ar: "6-10" } },
  { value: "gt-10", labels: { fr: "Plus de 10", en: "More than 10", ar: "أكثر من 10" } },
] as const satisfies readonly Choice[];

export const SKU_RANGE_CHOICES = [
  { value: "lt-100", labels: { fr: "Moins de 100", en: "Less than 100", ar: "أقل من 100" } },
  { value: "100-1000", labels: { fr: "100-1 000", en: "100-1,000", ar: "100-1,000" } },
  { value: "1000-10000", labels: { fr: "1 000-10 000", en: "1,000-10,000", ar: "1,000-10,000" } },
  { value: "gt-10000", labels: { fr: "Plus de 10 000", en: "More than 10,000", ar: "أكثر من 10,000" } },
] as const satisfies readonly Choice[];

export const COURIER_RANGE_CHOICES = [
  { value: "0", labels: { fr: "Aucune flotte interne", en: "No internal fleet", ar: "لا يوجد فريق داخلي" } },
  { value: "1-10", labels: { fr: "1-10", en: "1-10", ar: "1-10" } },
  { value: "11-50", labels: { fr: "11-50", en: "11-50", ar: "11-50" } },
  { value: "51-200", labels: { fr: "51-200", en: "51-200", ar: "51-200" } },
  { value: "gt-200", labels: { fr: "Plus de 200", en: "More than 200", ar: "أكثر من 200" } },
] as const satisfies readonly Choice[];

export const DELIVERY_TIME_CHOICES = [
  { value: "same-day", labels: { fr: "Même jour", en: "Same day", ar: "نفس اليوم" } },
  { value: "24-48h", labels: { fr: "24-48 h", en: "24-48h", ar: "24-48 ساعة" } },
  { value: "2-4-days", labels: { fr: "2-4 jours", en: "2-4 days", ar: "2-4 أيام" } },
  { value: "country-dependent", labels: { fr: "Selon pays/ville", en: "Depends on country/city", ar: "حسب البلد/المدينة" } },
] as const satisfies readonly Choice[];

export const REMITTANCE_CHOICES = [
  { value: "daily", labels: { fr: "Quotidienne", en: "Daily", ar: "يومي" } },
  { value: "weekly", labels: { fr: "Hebdomadaire", en: "Weekly", ar: "أسبوعي" } },
  { value: "biweekly", labels: { fr: "Bimensuelle", en: "Twice monthly", ar: "مرتين شهريًا" } },
  { value: "monthly", labels: { fr: "Mensuelle", en: "Monthly", ar: "شهري" } },
] as const satisfies readonly Choice[];

export const RECONCILIATION_CHOICES = [
  { value: "lt-48h", labels: { fr: "Moins de 48 h", en: "Less than 48h", ar: "أقل من 48 ساعة" } },
  { value: "2-7-days", labels: { fr: "2-7 jours", en: "2-7 days", ar: "2-7 أيام" } },
  { value: "1-4-weeks", labels: { fr: "1-4 semaines", en: "1-4 weeks", ar: "1-4 أسابيع" } },
  { value: "manual", labels: { fr: "Principalement manuel", en: "Mostly manual", ar: "يدوي غالبًا" } },
] as const satisfies readonly Choice[];

export const RATE_RANGE_CHOICES = [
  { value: "lt-5", labels: { fr: "Moins de 5 %", en: "Less than 5%", ar: "أقل من 5%" } },
  { value: "5-15", labels: { fr: "5-15 %", en: "5-15%", ar: "5-15%" } },
  { value: "15-30", labels: { fr: "15-30 %", en: "15-30%", ar: "15-30%" } },
  { value: "gt-30", labels: { fr: "Plus de 30 %", en: "More than 30%", ar: "أكثر من 30%" } },
] as const satisfies readonly Choice[];

export const MODULE_CHOICES = [
  { value: "orders-confirmation", labels: { fr: "Commandes & confirmation", en: "Orders & confirmation", ar: "الطلبات والتأكيد" } },
  { value: "stock-prep", labels: { fr: "Stock & préparation", en: "Stock & preparation", ar: "المخزون والتحضير" } },
  { value: "delivery-dispatch", labels: { fr: "Livraison & dispatch", en: "Delivery & dispatch", ar: "التوصيل والتوزيع" } },
  { value: "cod-remittance", labels: { fr: "COD & reversements", en: "COD & remittances", ar: "الدفع عند الاستلام والتسويات" } },
  { value: "governance", labels: { fr: "Gouvernance", en: "Governance", ar: "الحوكمة" } },
  { value: "reporting", labels: { fr: "Reporting", en: "Reporting", ar: "التقارير" } },
  { value: "supervised-automation", labels: { fr: "Automatisation supervisée", en: "Supervised automation", ar: "أتمتة بإشراف" } },
  { value: "multi-country", labels: { fr: "Multi-pays", en: "Multi-country", ar: "متعدد البلدان" } },
] as const satisfies readonly Choice[];
