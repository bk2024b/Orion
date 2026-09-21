import { setRequestLocale } from "next-intl/server";
import AboutPreview from "@/components/sections/AboutPreview";
import MethodSection from "@/components/sections/MethodSection";
import CtaSection from "@/components/sections/CtaSection";
import { Building, ShieldCheck, Award, MapPin } from "lucide-react";

export default async function AboutPage({
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
          Studio & Vision
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6">
          Bâtir au-delà des standards établis
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
          ORION est le studio d'ingénierie et de transformation digitale fondé par BK Global Technologies.
        </p>
      </div>

      <AboutPreview />
      <MethodSection />

      {/* Trust & Location Banner */}
      <section className="py-16 bg-obsidian-200/40 border-y border-obsidian-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
              <MapPin className="w-8 h-8 text-violet-glow mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-white mb-1">Hub Régional & Mondial</h3>
              <p className="text-xs text-slate-400">Siège à Cotonou (Bénin) et déploiements à l'international (Afrique, Europe, Amérique du Nord).</p>
            </div>
            <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-white mb-1">Sécurité & Fiabilité</h3>
              <p className="text-xs text-slate-400">Architecture PostgreSQL chiffrée, RLS stricte et déploiement serverless redondant.</p>
            </div>
            <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-white mb-1">Culture de l'Excellence</h3>
              <p className="text-xs text-slate-400">Zéro dette technique inutile, code documenté et performances de chargement sous la seconde.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
