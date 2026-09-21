import { setRequestLocale } from "next-intl/server";
import WorkCases from "@/components/sections/WorkCases";
import CtaSection from "@/components/sections/CtaSection";

export default async function WorkPage({
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
          Portfolio & Résultats
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6">
          Nos Études de Cas & Réalisations
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
          Chaque projet est une équation résolue : un problème opérationnel transformé en opportunité de croissance mesurable.
        </p>
      </div>

      <WorkCases />
      <CtaSection />
    </div>
  );
}
