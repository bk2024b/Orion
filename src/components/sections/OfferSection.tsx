import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";
import Reveal from "@/components/motion/Reveal";

export default function OfferSection() {
  const t = useTranslations("offer");
  const checks = t.raw("checks") as string[];

  return (
    <section className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <Reveal>
          <div className="mb-10 max-w-[820px] md:mb-[52px]">
            <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
              {t("eyebrow")}
            </div>
            <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 overflow-hidden rounded-orion border border-line bg-surface lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 md:p-12">
              <h3 className="mb-3.5 text-[28px] tracking-[-0.04em] md:text-[34px]">
                {t("name")}
              </h3>
              <p className="max-w-[580px] text-[#999]">{t("intro")}</p>
              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {checks.map((item, idx) => (
                  <div key={idx} className="text-[13px] text-[#aaa]">
                    <span className="mr-2 text-lime">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-line bg-[#0a0a0a] p-7 md:border-l md:border-t-0 md:p-12">
              <div className="text-[10px] font-extrabold tracking-[0.15em] text-lime">
                {t("deliveryLabel")}
              </div>
              <div className="my-1 text-[48px] font-[760] leading-none tracking-[-0.06em] md:text-[61px]">
                {t("deliveryValue")}
              </div>
              <div className="text-[11px] text-[#666]">{t("deliveryNote")}</div>

              <div className="mt-7 text-[32px] font-[750] tracking-[-0.04em] md:text-[38px]">
                {t("price")}
              </div>
              <div className="text-[11px] text-[#666]">{t("priceNote")}</div>

              <OpenChatButton className="mt-[27px] inline-flex items-center justify-center gap-2 rounded-[9px] border border-lime bg-lime px-[18px] py-[13px] text-[13px] font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
                {t("cta")} →
              </OpenChatButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

