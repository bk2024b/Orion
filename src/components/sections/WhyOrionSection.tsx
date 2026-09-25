import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";

interface DiffItem {
  title: string;
  desc: string;
}

export default function WhyOrionSection() {
  const t = useTranslations("why");
  const diffs = t.raw("diffs") as DiffItem[];

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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {diffs.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div>
                <span className="text-[10px] font-extrabold tracking-[0.15em] text-lime">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="my-[15px] text-lg">{item.title}</h3>
                <p className="text-[13px] text-[#888]">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

