import type { Metadata } from "next";

import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact | NOKI Service",
  description: "Qualifier une demande commerciale, technique ou partenaire pour NOKI Service.",
};

export default function ContactPage() {
  return <ContactForm />;
}
