import { useTranslations } from "next-intl";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export default function ServicesGrid() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <div className="mb-10 max-w-[820px] md:mb-[52px]">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[680px] text-base text-muted sm:text-[17px]">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div key={idx} className="min-h-[220px] bg-surface p-6 md:min-h-[245px] md:p-[30px]">
              <span className="text-[10px] font-extrabold tracking-[0.15em] text-lime">
                {item.num}
              </span>
              <h3 className="mb-3 mt-8 text-lg leading-[1.15] md:mt-[42px] md:text-xl">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#888]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
