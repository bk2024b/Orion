import { setRequestLocale } from "next-intl/server";
import DivisionsGrid from "@/components/sections/DivisionsGrid";
import CareSection from "@/components/sections/CareSection";
import MethodSection from "@/components/sections/MethodSection";
import CtaSection from "@/components/sections/CtaSection";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <div className="py-16 text-center max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-glow px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/20 mb-4 inline-block">
          Offres & Divisions
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6">
          Des systèmes digitaux conçus pour scaler votre entreprise
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
          Découvrez en détail nos 4 divisions spécialisées et notre offre de maintenance prédictive ORION CARE.
        </p>
      </div>

      <DivisionsGrid />
      <CareSection />
      <MethodSection />
      <CtaSection />
    </div>
  );
}
