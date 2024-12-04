"use client";
import { useEffect, useState } from "react";
import { useUnifiedStore } from "@/stores/stores";
import { advices as mockAdvices } from "@/lib/advice";
import Dropdown from "@/components/ui/dropdown";

const AdvicesList = () => {
  const { advices, setAdvices, isCalculationDone, calculationType } =
    useUnifiedStore();

  const advicesForSelectedType = advices[calculationType];

  useEffect(() => {
    if (isCalculationDone && advicesForSelectedType.length === 0) {
      setAdvices(calculationType, mockAdvices[calculationType]);
    }
  }, [isCalculationDone, advicesForSelectedType, calculationType, setAdvices]);

  // Розділяємо масив на два: для непарних та парних елементів
  const oddAdvices = advicesForSelectedType.filter(
    (_, index) => index % 2 === 0
  ); // Непарні індекси (0, 2, 4, ...)
  const evenAdvices = advicesForSelectedType.filter(
    (_, index) => index % 2 !== 0
  ); // Парні індекси (1, 3, 5, ...)

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isCalculationDone) {
    return (
      <p className="text-xl text-center text-gray-300">
        Будь ласка, натисніть{" "}
        <a href="#calculator-section" className="text-black">
          &#34;Розрахувати&#34;
        </a>
        , щоб отримати поради.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
      <div className="space-y-4">
        {/* Выводим нечётные элементы */}
        {oddAdvices.map((advice, index) => (
          <Dropdown
            key={index}
            isOpen={openIndex === index}
            onToggle={() => toggleDropdown(index)}
            label={advice.label}
            content={advice.options}
          />
        ))}
      </div>
      <div className="space-y-4">
        {/* Выводим чётные элементы */}
        {evenAdvices.map((advice, index) => (
          <Dropdown
            key={oddAdvices.length + index}
            isOpen={openIndex === oddAdvices.length + index}
            onToggle={() => toggleDropdown(oddAdvices.length + index)}
            label={advice.label}
            content={advice.options}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvicesList;