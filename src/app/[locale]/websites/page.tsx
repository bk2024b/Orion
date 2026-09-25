import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import OpenChatButton from "@/components/chat/OpenChatButton";
import Reveal from "@/components/motion/Reveal";

interface CardItem {
  title: string;
  desc: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

interface ScoreItem {
  value: string;
  label: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface Tier {
  name: string;
  title: string;
  price: string;
  delay: string;
  features: string[];
  cta: string;
}

interface CarePlan {
  name: string;
  price: string;
  desc: string;
}

export default async function WebsitesOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("webOffer");

  const problemCards = t.raw("problem.cards") as CardItem[];
  const beforeItems = t.raw("transform.beforeItems") as string[];
  const afterItems = t.raw("transform.afterItems") as string[];
  const features = t.raw("features.items") as CardItem[];
  const oldScores = t.raw("showcase.oldScores") as ScoreItem[];
  const newScores = t.raw("showcase.newScores") as ScoreItem[];
  const steps = t.raw("process.steps") as StepItem[];
  const checks = t.raw("offer.checks") as string[];
  const launch = t.raw("pricing.tiers.launch") as Tier;
  const grow = t.raw("pricing.tiers.grow") as Tier;
  const system = t.raw("pricing.tiers.system") as Tier;
  const essential = t.raw("care.essential") as CarePlan;
  const growth = t.raw("care.growth") as CarePlan;
  const scale = t.raw("care.scale") as CarePlan;
  const faqItems = t.raw("faq.items") as FaqItem[];

  const primaryBtn =
    "inline-flex items-center justify-center gap-2 rounded-[9px] border border-white bg-white px-[18px] py-[13px] text-[13px] font-bold text-[#080808] transition-transform hover:-translate-y-0.5";
  const ghostBtn =
    "inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#444] bg-transparent px-[18px] py-[13px] text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#777]";

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-line py-24 md:py-[125px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal delay={0}>
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
              {t("hero.eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="max-w-[950px] text-[clamp(40px,7vw,90px)] font-[760] leading-[0.96] tracking-[-0.06em]">
              {t("hero.titleLine1")}
              <br />
              <span className="text-muted-2">{t("hero.titleLine2")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-[700px] text-[19px] text-[#aaa]">{t("hero.lead")}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-[30px] flex flex-wrap items-center gap-2.5">
              <OpenChatButton className={primaryBtn}>
                {t("hero.ctaPrimary")} →
              </OpenChatButton>
              <a href="#offer" className={ghostBtn}>
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-4 text-xs text-muted-2">{t("hero.note")}</p>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("problem.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("problem.title")}
              </h2>
              <p className="text-lg text-[#999]">{t("problem.subtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {problemCards.map((card, idx) => (
              <Reveal key={idx} delay={idx * 0.06} className="h-full">
                <div className="h-full border border-line bg-surface-card p-[30px]">
                  <strong className="mb-3 block text-[21px] tracking-[-0.03em]">
                    {card.title}
                  </strong>
                  <p className="text-[#999]">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("transform.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("transform.title")}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_60px_1fr]">
              <div className="border border-line bg-surface-card p-[35px]">
                <h3 className="mt-0 text-[25px]">{t("transform.beforeTitle")}</h3>
                <ul className="grid gap-3.5 p-0">
                  {beforeItems.map((item, idx) => (
                    <li key={idx} className="flex list-none items-start gap-2.5 text-[#999]">
                      <span className="text-[#777]">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center rotate-90 text-[28px] text-[#777] md:rotate-0">
                →
              </div>

              <div className="border border-[#f4f4f4] bg-[#f4f4f4] p-[35px] text-[#050505]">
                <h3 className="mt-0 text-[25px]">{t("transform.afterTitle")}</h3>
                <ul className="grid gap-3.5 p-0">
                  {afterItems.map((item, idx) => (
                    <li key={idx} className="flex list-none items-start gap-2.5">
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("features.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("features.title")}
              </h2>
              <p className="text-lg text-[#999]">{t("features.subtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((f, idx) => (
              <Reveal key={idx} delay={idx * 0.05} className="h-full">
                <div className="h-full border border-line bg-surface-card p-[30px]">
                  <h3 className="mb-2.5 text-[21px] tracking-[-0.03em]">{f.title}</h3>
                  <p className="text-[#999]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOW, DON'T TELL */}
      <section className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("showcase.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("showcase.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Old mock */}
            <Reveal delay={0.05} className="h-full">
              <div className="h-full min-h-[350px] border border-line bg-surface-card">
                <div className="flex h-10 items-center gap-1.5 border-b border-line px-3.5">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                </div>
                <div className="p-[35px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                    {t("showcase.oldLabel")}
                  </div>
                  <div className="my-3.5 text-[38px] leading-none tracking-[-0.05em]">
                    {t("showcase.oldTitle")}
                  </div>
                  <div className="my-2.5 h-[7px] bg-[#292929]" />
                  <div className="my-2.5 h-[7px] bg-[#292929]" />
                  <div className="my-2.5 h-[7px] w-[55%] bg-[#292929]" />
                  <div className="mt-7 grid grid-cols-2 border-t border-line sm:grid-cols-4">
                    {oldScores.map((s, idx) => (
                      <div key={idx} className="border-r border-line px-2.5 py-4 last:border-r-0">
                        <b className="text-2xl">{s.value}</b>
                        <small className="block text-[#777]">{s.label}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Orion mock */}
            <Reveal delay={0.12} className="h-full">
              <div className="h-full min-h-[350px] border border-line bg-surface-card">
                <div className="flex h-10 items-center gap-1.5 border-b border-line px-3.5">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#555]" />
                </div>
                <div className="p-[35px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                    {t("showcase.newLabel")}
                  </div>
                  <div className="my-3.5 whitespace-pre-line text-[38px] leading-none tracking-[-0.05em]">
                    {t("showcase.newTitle")}
                  </div>
                  <div className="my-2.5 h-[7px] bg-[#292929]" />
                  <div className="my-2.5 h-[7px] w-[55%] bg-[#292929]" />
                  <span className="mt-4 inline-block rounded-[9px] border border-white bg-white px-[18px] py-[13px] text-[13px] font-bold text-[#080808]">
                    {t("showcase.newCtaLabel")}
                  </span>
                  <div className="mt-7 grid grid-cols-2 border-t border-line sm:grid-cols-4">
                    {newScores.map((s, idx) => (
                      <div key={idx} className="border-r border-line px-2.5 py-4 last:border-r-0">
                        <b className="text-2xl">{s.value}</b>
                        <small className="block text-[#777]">{s.label}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("process.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("process.title")}
              </h2>
              <p className="text-lg text-[#999]">{t("process.subtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.06} className="h-full">
                <div className="h-full border border-line bg-surface-card p-[30px]">
                  <span className="mb-4 block text-[11px] tracking-[0.15em] text-muted-2">
                    {step.num}
                  </span>
                  <h3 className="mb-2.5 text-[21px] tracking-[-0.03em]">{step.title}</h3>
                  <p className="text-[#999]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xs text-muted-2">
              {t("process.deliveryNote")}{" "}
              <b className="text-white">{t("process.deliveryValue")}</b>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MAIN OFFER */}
      <section id="offer" className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("offer.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("offer.name")}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-[#f4f4f4] bg-[#f4f4f4] p-7 text-[#050505] md:p-[42px]">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-[50px]">
                <div>
                  <h3 className="m-0 text-[28px] leading-[1.1] md:text-[34px]">
                    {t("offer.title")}
                  </h3>
                  <p className="text-[#555]">{t("offer.subtitle")}</p>
                  <div className="my-5 text-[42px] font-black leading-none tracking-[-0.07em] md:text-[55px]">
                    {t("offer.price")}
                  </div>
                  <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#050505] bg-[#050505] px-[18px] py-[13px] text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5">
                    {t("offer.cta")} →
                  </OpenChatButton>
                </div>
                <ul className="grid list-none gap-3.5 p-0">
                  {checks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("pricing.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("pricing.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { tier: launch, featured: true },
              { tier: grow, featured: false },
              { tier: system, featured: false },
            ].map(({ tier, featured }, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div
                  className={`flex h-full min-h-[430px] flex-col border p-[30px] transition-all hover:-translate-y-1.5 ${
                    featured ? "border-white" : "border-line bg-surface-card"
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                    {tier.name}
                  </div>
                  <h3 className="mt-1 text-[21px] tracking-[-0.03em]">{tier.title}</h3>
                  <div className="my-[17px] text-[40px] font-[850] leading-none tracking-[-0.06em]">
                    {tier.price}
                  </div>
                  <small className="text-muted-2">{tier.delay}</small>
                  <ul className="my-5 grid flex-1 list-none gap-2.5 p-0 text-[#aaa]">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-white">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <OpenChatButton className={featured ? `mt-auto ${primaryBtn}` : `mt-auto ${ghostBtn}`}>
                    {tier.cta} →
                  </OpenChatButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AFTER LAUNCH / CARE */}
      <section className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("care.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("care.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[essential, growth, scale].map((plan, idx) => (
              <Reveal key={idx} delay={idx * 0.06} className="h-full">
                <div className="h-full border border-line bg-surface-card p-[30px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                    {plan.name}
                  </div>
                  <h3 className="my-2.5 text-[21px] tracking-[-0.03em]">{plan.price}</h3>
                  <p className="text-[#999]">{plan.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-line py-20 md:py-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="mb-12 max-w-[760px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
                {t("faq.kicker")}
              </div>
              <h2 className="my-4 text-[clamp(38px,5vw,62px)] leading-none tracking-[-0.06em]">
                {t("faq.title")}
              </h2>
            </div>
          </Reveal>

          <div className="max-w-[900px]">
            {faqItems.map((item, idx) => (
              <Reveal key={idx} delay={Math.min(idx * 0.05, 0.3)} y={12}>
                <details className="border-t border-line py-[22px] last:border-b last:border-line">
                  <summary className="flex justify-between text-base font-bold">
                    {item.q}
                  </summary>
                  <p className="mt-3 max-w-[800px] text-[#999]">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-[90px] text-center md:py-[120px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-content">
          <Reveal>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777]">
              {t("final.kicker")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto text-[clamp(40px,6vw,70px)] leading-none tracking-[-0.06em]">
              {t("final.titleLine1")}
              <br />
              {t("final.titleLine2")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto my-6 max-w-[680px] text-[#999]">{t("final.subtitle")}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <OpenChatButton className={primaryBtn}>
                {t("final.ctaPrimary")} →
              </OpenChatButton>
              <OpenChatButton className={ghostBtn}>
                {t("final.ctaSecondary")} →
              </OpenChatButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
