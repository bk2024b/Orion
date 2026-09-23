import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import DivisionsGrid from "@/components/sections/DivisionsGrid";
import CareSection from "@/components/sections/CareSection";
import MethodSection from "@/components/sections/MethodSection";
import WorkCases from "@/components/sections/WorkCases";
import AboutPreview from "@/components/sections/AboutPreview";
import CtaSection from "@/components/sections/CtaSection";

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
      <ProblemSection />
      <DivisionsGrid />
      <MethodSection />
      <WorkCases />
      <CareSection />
      <AboutPreview />
      <CtaSection />
    </div>
  );
}
