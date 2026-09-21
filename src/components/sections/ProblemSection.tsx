import { useTranslations } from "next-intl";
import { AlertCircle, Clock, Cpu, TrendingDown } from "lucide-react";

export default function ProblemSection() {
  const t = useTranslations("problem");

  const painPoints = [
    {
      icon: TrendingDown,
      title: t("card1Title"),
      desc: t("card1Desc"),
    },
    {
      icon: Clock,
      title: t("card2Title"),
      desc: t("card2Desc"),
    },
    {
      icon: Cpu,
      title: t("card3Title"),
      desc: t("card3Desc"),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-obsidian-200/50 border-y border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-obsidian-card border border-obsidian-border hover:border-slate-700 transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
