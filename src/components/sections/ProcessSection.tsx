import { useTranslations } from "next-intl";

interface StepItem {
  title: string;
  desc: string;
}

export default function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as StepItem[];

  return (
    <section id="process" className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <div className="mb-10 max-w-[820px] md:mb-[52px]">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-line md:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="border-b border-line py-7 last:border-b-0 md:border-b-0 md:border-r md:pr-6 md:mr-6 md:last:border-r-0 md:last:mr-0 md:last:pr-0"
            >
              <span className="text-[10px] font-extrabold tracking-[0.15em] text-lime">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="my-3 text-[22px]">{step.title}</h3>
              <p className="text-[13px] text-[#888]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
