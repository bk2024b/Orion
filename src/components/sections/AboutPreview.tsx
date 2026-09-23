import { useTranslations } from "next-intl";
import { Shield, Target, Zap } from "lucide-react";

export default function AboutPreview() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Shield,
      title: t("value1Title"),
      desc: t("value1Desc"),
    },
    {
      icon: Target,
      title: t("value2Title"),
      desc: t("value2Desc"),
    },
    {
      icon: Zap,
      title: t("value3Title"),
      desc: t("value3Desc"),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-glow px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/20 mb-4 inline-block">
              {t("badge")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
              {t("storyP1")}
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t("storyP2")}
            </p>
          </div>

          <div className="space-y-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-obsidian-card border border-obsidian-border flex items-start gap-5 hover:border-slate-700 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-soft border border-violet-electric/30 flex items-center justify-center text-violet-glow shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
