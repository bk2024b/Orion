import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TrendingUp, CheckCircle, ArrowRight, Activity, Cpu, GraduationCap } from "lucide-react";

export default function WorkCases() {
  const t = useTranslations("work");

  const cases = [
    {
      category: t("case1Category"),
      title: t("case1Title"),
      problem: t("case1Problem"),
      solution: t("case1Solution"),
      result: t("case1Result"),
      icon: Activity,
      tagColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    },
    {
      category: t("case2Category"),
      title: t("case2Title"),
      problem: t("case2Problem"),
      solution: t("case2Solution"),
      result: t("case2Result"),
      icon: Cpu,
      tagColor: "text-violet-400 border-violet-500/20 bg-violet-500/10",
    },
    {
      category: t("case3Category"),
      title: t("case3Title"),
      problem: t("case3Problem"),
      solution: t("case3Solution"),
      result: t("case3Result"),
      icon: GraduationCap,
      tagColor: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    },
  ];

  return (
    <section id="work" className="py-24 md:py-32 bg-obsidian-200/30 border-t border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-glow px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/20 mb-4 inline-block">
              {t("badge")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {t("title")}
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${c.tagColor}`}>
                      {c.category}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-white mb-6">
                    {c.title}
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm mb-8">
                    <div className="p-3.5 rounded-xl bg-obsidian-surface border border-obsidian-border/50">
                      <span className="text-[11px] uppercase font-bold text-rose-400 block mb-1">
                        Problème
                      </span>
                      <p className="text-slate-300">{c.problem}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-obsidian-surface border border-obsidian-border/50">
                      <span className="text-[11px] uppercase font-bold text-violet-glow block mb-1">
                        Solution ORION
                      </span>
                      <p className="text-slate-300">{c.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-obsidian-border/60">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span>{c.result}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
