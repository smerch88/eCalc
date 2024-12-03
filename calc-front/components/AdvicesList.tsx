"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/ui/dropdown";
import { useUnifiedStore } from "@/stores/stores";
import { advices as mockAdvices } from "@/lib/advice";

const AdvicesList = () => {
  const { advices, setAdvices, isCalculationDone } = useUnifiedStore();

  useEffect(() => {
    if (isCalculationDone && advices.length === 0) {
      setAdvices(mockAdvices);
    }
  }, [isCalculationDone, advices, setAdvices]);

  // Розділяємо масив на два: для непарних та парних елементів
  const oddAdvices = advices.filter((_, index) => index % 2 === 0); // Непарні індекси (0, 2, 4, ...)
  const evenAdvices = advices.filter((_, index) => index % 2 !== 0); // Парні індекси (1, 3, 5, ...)

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
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
        {/* Выводим непарные элементы */}
        {oddAdvices.map((advice, index) => (
          <AdviceDropdown
            key={index}
            label={advice.label}
            option={advice.options}
            isOpen={openIndex === index}
            toggleDropdown={() => toggleDropdown(index)}
          />
        ))}
      </div>
      <div className="space-y-4">
        {/* Выводим парные элементы */}
        {evenAdvices.map((advice, index) => (
          <AdviceDropdown
            key={oddAdvices.length + index}
            label={advice.label}
            option={advice.options}
            isOpen={openIndex === oddAdvices.length + index}
            toggleDropdown={() => toggleDropdown(oddAdvices.length + index)}
          />
        ))}
      </div>
    </div>
  );
};

const AdviceDropdown: React.FC<{
  label: string;
  option: string;
  isOpen: boolean;
  toggleDropdown: () => void;
}> = ({ label, option, isOpen, toggleDropdown }) => {
  return (
    <div className="relative">
      <Dropdown
        label={label}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        option={option}
      />
    </div>
  );
};

export default AdvicesList;
