import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ShieldCheck, Zap, RefreshCw, Check, ArrowRight } from "lucide-react";

export default function CareSection() {
  const t = useTranslations("care");

  const plans = [
    {
      name: t("plan1Name"),
      badge: "Fondation",
      desc: t("plan1Desc"),
      highlights: [
        "Hébergement managé haute dispo",
        "Sauvegardes quotidiennes chiffrées",
        "Mises à jour de sécurité critiques",
        "Monitoring 99.9% uptime",
      ],
      popular: false,
    },
    {
      name: t("plan2Name"),
      badge: "Plus Populaire",
      desc: t("plan2Desc"),
      highlights: [
        "Tout du plan Essential",
        "Optimisation Core Web Vitals continue",
        "Audits SEO & performance mensuels",
        "Support technique prioritaire < 4h",
      ],
      popular: true,
    },
    {
      name: t("plan3Name"),
      badge: "Grand Compte",
      desc: t("plan3Desc"),
      highlights: [
        "Tout du plan Growth",
        "10h d'itérations produit incluses / mois",
        "Amélioration continue des bots IA",
        "Canal Slack / WhatsApp dédié",
      ],
      popular: false,
    },
  ];

  return (
    <section id="care" className="py-24 md:py-32 bg-obsidian-200/40 border-t border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? "bg-obsidian-card border-2 border-violet-electric shadow-violet"
                  : "bg-obsidian-card/80 border border-obsidian-border hover:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-violet-electric text-white text-xs font-bold tracking-wider uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {plan.name}
                  </h3>
                  {!plan.popular && (
                    <span className="text-xs text-slate-400 px-2.5 py-0.5 rounded bg-obsidian-surface border border-obsidian-border">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="space-y-3 mb-8">
                  {plan.highlights.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-violet-electric hover:bg-violet-hover text-white shadow-violet"
                    : "bg-obsidian-surface hover:bg-obsidian-muted border border-obsidian-border text-slate-200"
                }`}
              >
                {t("cta")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
