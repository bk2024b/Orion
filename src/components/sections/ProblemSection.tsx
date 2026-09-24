import { useTranslations } from "next-intl";

export default function ProblemSection() {
  const t = useTranslations("problem");
  const oldWayItems = t.raw("oldWayItems") as string[];
  const newWayItems = t.raw("newWayItems") as string[];

  return (
    <section className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <div className="mb-10 max-w-[820px] md:mb-[52px]">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-surface p-7 md:p-[43px]">
            <h3 className="mb-6 text-xl font-semibold">{t("oldWayTitle")}</h3>
            <ul className="grid gap-4 text-sm text-[#999]">
              {oldWayItems.map((item, idx) => (
                <li key={idx}>
                  <span className="mr-3 text-[#777]">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#10160a] to-[#0a0a0a] p-7 md:p-[43px]">
            <h3 className="mb-6 text-xl font-semibold">{t("newWayTitle")}</h3>
            <ul className="grid gap-4 text-sm text-[#999]">
              {newWayItems.map((item, idx) => (
                <li key={idx}>
                  <span className="mr-3 text-lime">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-base text-[#aaa] sm:text-lg">
          {t("statementLead")} <strong className="text-white">{t("statementStrong")}</strong>
        </p>
      </div>
    </section>
  );
}
