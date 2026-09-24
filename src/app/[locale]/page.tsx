import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProofBar from "@/components/sections/ProofBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import OfferSection from "@/components/sections/OfferSection";
import WhyOrionSection from "@/components/sections/WhyOrionSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalSection from "@/components/sections/FinalSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      <ProofBar />
      <ProblemSection />
      <ServicesGrid />
      <BenefitsSection />
      <ProcessSection />
      <OfferSection />
      <WhyOrionSection />
      <PricingSection />
      <FAQSection />
      <FinalSection />
    </div>
  );
}
