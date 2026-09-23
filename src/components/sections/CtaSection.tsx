import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CtaSection() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-obsidian-card to-obsidian-surface border border-violet-electric/40 shadow-violet-lg text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-electric/20 border border-violet-electric/40 text-xs font-semibold text-violet-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-glow" />
            <span>Passez à l'action</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
            {t("title")}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <OpenChatButton className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-base font-semibold transition-all shadow-violet hover:scale-105">
              <span>{t("formSubmit")}</span>
              <ArrowRight className="w-4 h-4" />
            </OpenChatButton>
          </div>
        </div>
      </div>
    </section>
  );
}
