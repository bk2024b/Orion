import { useTranslations } from "next-intl";
import OpenChatButton from "@/components/chat/OpenChatButton";

interface Tier {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
}

interface CarePlan {
  name: string;
  price: string;
  desc: string;
}

export default function PricingSection() {
  const t = useTranslations("pricing");
  const launch = t.raw("tiers.launch") as Tier;
  const grow = t.raw("tiers.grow") as Tier;
  const system = t.raw("tiers.system") as Tier;
  const essential = t.raw("care.essential") as CarePlan;
  const growth = t.raw("care.growth") as CarePlan;
  const scale = t.raw("care.scale") as CarePlan;

  return (
    <section id="pricing" className="border-b border-line py-20 md:py-[105px]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-content">
        <div className="mb-10 max-w-[820px] md:mb-[52px]">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("eyebrow")}
          </div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-[760] leading-[1.02] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.055em]">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {/* LAUNCH */}
          <article className="flex min-h-[520px] flex-col rounded-2xl border border-line bg-surface p-8">
            <h3 className="text-2xl">{launch.name}</h3>
            <div className="my-5 text-[40px] font-[760] tracking-[-0.05em] md:text-[45px]">
              {launch.price}
            </div>
            <p className="min-h-[58px] text-[13px] text-[#888]">{launch.desc}</p>
            <ul className="my-6 grid flex-1 gap-2.5 text-[13px] text-[#aaa]">
              {launch.features.map((f, i) => (
                <li key={i}>
                  <span className="mr-2 text-lime">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#333] bg-[#0b0b0b] px-[18px] py-[13px] text-[13px] font-bold transition-transform hover:-translate-y-0.5 hover:border-[#666]">
              {launch.cta} →
            </OpenChatButton>
          </article>

          {/* GROW — featured */}
          <article className="relative flex min-h-[520px] flex-col rounded-2xl border border-[#718f35] bg-surface p-8 shadow-[inset_0_1px_0_#9ac43b] md:min-h-[555px]">
            <span className="absolute right-[18px] top-[18px] rounded-[5px] bg-lime px-2 py-1.5 text-[9px] font-black text-[#080808]">
              MOST POPULAR
            </span>
            <h3 className="text-2xl">{grow.name}</h3>
            <div className="my-5 text-[40px] font-[760] tracking-[-0.05em] md:text-[45px]">
              {grow.price}
            </div>
            <p className="min-h-[58px] text-[13px] text-[#888]">{grow.desc}</p>
            <ul className="my-6 grid flex-1 gap-2.5 text-[13px] text-[#aaa]">
              {grow.features.map((f, i) => (
                <li key={i}>
                  <span className="mr-2 text-lime">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-lime bg-lime px-[18px] py-[13px] text-[13px] font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
              {grow.cta} →
            </OpenChatButton>
          </article>

          {/* SYSTEM */}
          <article className="flex min-h-[520px] flex-col rounded-2xl border border-line bg-surface p-8">
            <h3 className="text-2xl">{system.name}</h3>
            <div className="my-5 text-[40px] font-[760] tracking-[-0.05em] md:text-[45px]">
              {system.price}
            </div>
            <p className="min-h-[58px] text-[13px] text-[#888]">{system.desc}</p>
            <ul className="my-6 grid flex-1 gap-2.5 text-[13px] text-[#aaa]">
              {system.features.map((f, i) => (
                <li key={i}>
                  <span className="mr-2 text-lime">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#333] bg-[#0b0b0b] px-[18px] py-[13px] text-[13px] font-bold transition-transform hover:-translate-y-0.5 hover:border-[#666]">
              {system.cta} →
            </OpenChatButton>
          </article>
        </div>

        {/* After-launch Care plans */}
        <div className="mt-4 rounded-2xl border border-line bg-[#080808] p-6 md:p-10">
          <div className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-lime">
            {t("care.eyebrow")}
          </div>
          <h2 className="text-[28px] tracking-[-0.045em] md:text-[43px]">
            {t("care.title")}
          </h2>
          <p className="max-w-[650px] text-[#888]">{t("care.subtitle")}</p>

          <div className="mt-7 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {[essential, growth, scale].map((plan, idx) => (
              <div key={idx} className="bg-surface p-6">
                <h3 className="text-[15px]">{plan.name}</h3>
                <div className="my-3 text-[26px] font-[750] md:text-[27px]">{plan.price}</div>
                <p className="text-xs text-[#888]">{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
