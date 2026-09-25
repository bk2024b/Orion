import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";
import Reveal from "@/components/motion/Reveal";

export default function FinalSection() {
  const t = useTranslations("final");

  return (
    <section id="contact" className="py-[90px] text-center md:py-[125px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <Reveal>
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto max-w-[850px] text-[clamp(34px,6vw,75px)] font-[760] leading-[1] tracking-[-0.04em] sm:leading-[0.95] sm:tracking-[-0.065em]">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto my-6 max-w-[570px] text-[#888]">{t("subtitle")}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-lime bg-lime px-[18px] py-[13px] text-[13px] font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
            {t("cta")} →
          </OpenChatButton>
          <div className="mt-[17px] text-[11px] text-[#666]">{t("micro")}</div>
        </Reveal>
      </div>
    </section>
  );
}

