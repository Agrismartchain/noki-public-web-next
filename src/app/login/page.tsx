import type { Metadata } from "next";

import { LoginForm } from "@/components/site/LoginForm";

export const metadata: Metadata = {
  title: "Connexion | NOKI Service",
  description: "Interface de connexion marchand NOKI Service.",
};

export default function LoginPage() {
  return <LoginForm />;
}
