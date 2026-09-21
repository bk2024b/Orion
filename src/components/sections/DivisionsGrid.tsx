import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Globe,
  FileCode2,
  Database,
  Bot,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function DivisionsGrid() {
  const t = useTranslations("divisions");

  const divisions = [
    {
      id: "web",
      tag: t("web.tag"),
      name: t("web.name"),
      tagline: t("web.tagline"),
      desc: t("web.desc"),
      icon: Globe,
      features: [
        t("web.features.0"),
        t("web.features.1"),
        t("web.features.2"),
        t("web.features.3"),
      ],
      glowColor: "from-violet-600/20 to-purple-600/5",
    },
    {
      id: "business",
      tag: t("business.tag"),
      name: t("business.name"),
      tagline: t("business.tagline"),
      desc: t("business.desc"),
      icon: FileCode2,
      features: [
        t("business.features.0"),
        t("business.features.1"),
        t("business.features.2"),
        t("business.features.3"),
      ],
      glowColor: "from-blue-600/20 to-indigo-600/5",
    },
    {
      id: "systems",
      tag: t("systems.tag"),
      name: t("systems.name"),
      tagline: t("systems.tagline"),
      desc: t("systems.desc"),
      icon: Database,
      features: [
        t("systems.features.0"),
        t("systems.features.1"),
        t("systems.features.2"),
        t("systems.features.3"),
      ],
      glowColor: "from-emerald-600/20 to-teal-600/5",
    },
    {
      id: "ai",
      tag: t("ai.tag"),
      name: t("ai.name"),
      tagline: t("ai.tagline"),
      desc: t("ai.desc"),
      icon: Bot,
      features: [
        t("ai.features.0"),
        t("ai.features.1"),
        t("ai.features.2"),
        t("ai.features.3"),
      ],
      glowColor: "from-fuchsia-600/20 to-violet-600/5",
    },
  ];

  return (
    <section id="divisions" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-soft border border-violet-electric/30 text-xs font-semibold text-violet-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-glow" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                id={div.id}
                className="group relative p-8 sm:p-10 rounded-3xl bg-obsidian-card border border-obsidian-border hover:border-violet-electric/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Background Ambient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${div.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-glow px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/20">
                      {div.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-obsidian-surface border border-obsidian-border flex items-center justify-center text-white group-hover:text-violet-glow group-hover:border-violet-glow/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">
                    {div.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    {div.tagline}
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                    {div.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {div.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-violet-glow shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-obsidian-border/60 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-violet-glow hover:text-violet-300 transition-colors"
                  >
                    <span>Lancer un projet {div.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
