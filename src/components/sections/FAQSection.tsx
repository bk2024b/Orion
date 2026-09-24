import { useTranslations } from "next-intl";

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <div className="mb-10 max-w-[820px] md:mb-[52px]">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
            {t("title")}
          </h2>
        </div>

        <div className="max-w-[900px]">
          {items.map((item, idx) => (
            <details key={idx} className="border-t border-line py-5 last:border-b last:border-line">
              <summary className="text-base font-semibold">{item.q}</summary>
              <p className="mt-3 max-w-[760px] text-[13px] text-[#888]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
