import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-electric/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-soft border border-violet-electric/30 text-xs sm:text-sm text-violet-300 font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-violet-glow" />
            <span>{t("badge")}</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6">
            {t("titleLine1")}{" "}
            <span className="text-gradient-purple">{t("titleGradient")}</span>{" "}
            {t("titleLine2")}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <OpenChatButton className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-base font-semibold transition-all shadow-violet-lg hover:scale-105">
              <span>{t("ctaPrimary")}</span>
              <ArrowRight className="w-4 h-4" />
            </OpenChatButton>

            <a
              href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-obsidian-card hover:bg-obsidian-surface border border-obsidian-border text-slate-200 text-base font-medium transition-all hover:border-slate-600"
            >
              <span>{t("ctaSecondary")}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-obsidian-border/60 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-obsidian-card/40 border border-obsidian-border/50">
              <div className="font-heading font-bold text-3xl text-white text-gradient-purple mb-1">
                {t("stat1Value")}
              </div>
              <div className="text-xs text-slate-400">{t("stat1Label")}</div>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-card/40 border border-obsidian-border/50">
              <div className="font-heading font-bold text-3xl text-white text-gradient-purple mb-1">
                {t("stat2Value")}
              </div>
              <div className="text-xs text-slate-400">{t("stat2Label")}</div>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-card/40 border border-obsidian-border/50">
              <div className="font-heading font-bold text-3xl text-white text-gradient-purple mb-1">
                {t("stat3Value")}
              </div>
              <div className="text-xs text-slate-400">{t("stat3Label")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
