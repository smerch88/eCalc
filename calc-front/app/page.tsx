import { AdviceSection } from "@/page-sections/AdviceSection";
import { CalculatorSection } from "@/page-sections/CalculatorSection";
import { HeroSection } from "@/page-sections/HeroSection";
import { PartnersSection } from "@/page-sections/PartnersSection";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow items-center justify-between">
      <HeroSection />
      <CalculatorSection />
      <PartnersSection />
      <AdviceSection />
    </main>
  );
}
