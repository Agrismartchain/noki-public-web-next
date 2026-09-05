import type { Metadata } from "next";

import { TrackingApp } from "@/components/tracking/TrackingApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Suivi du trajet | NOKI",
  description: "Suivez votre trajet NOKI en direct.",
  robots: { index: false, follow: false, nocache: true },
};

type PageProps = { params: Promise<{ token: string }> };

export default async function TrackPage({ params }: PageProps) {
  const { token } = await params;

  return <TrackingApp token={token} />;
}
