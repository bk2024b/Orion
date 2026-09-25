import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";
import Reveal from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-line pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28">
      {/* Decorative ring, mirrors the prototype's hero:before/after */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[650px] w-[650px] rounded-full border border-[#181818] sm:block"
        style={{ boxShadow: "0 0 0 90px #0a0a0a, 0 0 0 91px #151515" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[22%] top-[28%] hidden h-1 w-1 rounded-full bg-lime sm:block"
        style={{ boxShadow: "0 0 35px 8px rgba(200,255,69,0.12)" }}
      />

      <div className="relative z-10 mx-auto w-[calc(100%-40px)] max-w-content">
        <Reveal delay={0}>
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="max-w-[980px] text-[clamp(40px,8.2vw,106px)] font-[760] leading-[0.95] tracking-[-0.05em] sm:tracking-[-0.075em] sm:leading-[0.9]">
            {t("title")}
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="my-7 max-w-[660px] text-base text-muted sm:text-lg">
            {t("copy")}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-2.5">
            <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-lime bg-lime px-[18px] py-[13px] text-[13px] font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
              <span>{t("ctaPrimary")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </OpenChatButton>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#333] bg-surface px-[18px] py-[13px] text-[13px] font-bold transition-all hover:-translate-y-0.5 hover:border-[#666]"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-4 text-[11px] text-muted-2">{t("micro")}</div>
        </Reveal>
      </div>
    </section>
  );
}

