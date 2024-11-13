import { AdviceSection } from "@/components/AdviceSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow items-center justify-between">
      <HeroSection />
      <CalculatorSection />
      <AdviceSection />
      <PartnersSection />
    </main>
  );
}
