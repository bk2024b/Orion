import { useTranslations } from "next-intl";
import { Compass, Layout, Code2, Rocket } from "lucide-react";

export default function MethodSection() {
  const t = useTranslations("method");

  const steps = [
    {
      num: t("step1Num"),
      title: t("step1Title"),
      desc: t("step1Desc"),
      icon: Compass,
    },
    {
      num: t("step2Num"),
      title: t("step2Title"),
      desc: t("step2Desc"),
      icon: Layout,
    },
    {
      num: t("step3Num"),
      title: t("step3Title"),
      desc: t("step3Desc"),
      icon: Code2,
    },
    {
      num: t("step4Num"),
      title: t("step4Title"),
      desc: t("step4Desc"),
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-glow px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/20 mb-4 inline-block">
            {t("badge")}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading font-extrabold text-4xl text-slate-700 group-hover:text-violet-glow transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-obsidian-surface border border-obsidian-border flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-violet-glow/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
