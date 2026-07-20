import type { Metadata } from "next";

import { MerchantOnboarding } from "@/components/site/MerchantOnboarding";

export const metadata: Metadata = {
  title: "Inscription e-commerçant | NOKI Service",
  description: "Onboarding prospect pour les e-commerçants souhaitant qualifier NOKI Service.",
};

export default function RegisterPage() {
  return <MerchantOnboarding />;
}
