"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { SelectInput } from "../ui/selectInput";
import { CalcInput } from "@/components/ui/calcInput";
import { MouseEvent, useState } from "react";
import TooltipBtn from "../ui/tooltipBtn";
import { calculateLightingConsumption } from "@/lib/calculators";
import { getDaysInCurrentMonth } from "@/lib/utils";
import { useUnifiedStore } from "@/stores/stores";
import { TariffChange, options, icons } from "@/components/TariffChange";
import cn from "classnames";

export interface FormData {
  wattage: number;
  hoursPerDay: number;
  numberOfBulbs: number;
  daysPerMonth: number;
  costPerKWh: string;
  nightRateFactor: number;
  nightRateUsagePercentage: number;
  icon?: JSX.Element | JSX.Element[];
  [key: string]: unknown;
}

interface CalculationResult {
  yearly: {
    energyConsumption: number;
    energyCost: number;
  };
  monthly: {
    energyConsumption: number;
    energyCost: number;
  };
}

const LightComponent = () => {
  const [selectedCostPerKWh, setSelectedCostPerKWh] =
    useState<string>("single-zone");
  const [formData, setFormData] = useState<FormData>({
    wattage: 100,
    hoursPerDay: 6,
    numberOfBulbs: 12,
    costPerKWh: "4.32",
    daysPerMonth: getDaysInCurrentMonth(),
    nightRateFactor: 1,
    nightRateUsagePercentage: 0,
    icon: icons.day,
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isInputDisabled = selectedCostPerKWh !== "three-zone";

  const setCalculationDone = useUnifiedStore(
    (state) => state.setCalculationDone
  );

  const setCalculationType = useUnifiedStore(
    (state) => state.setCalculationType
  );

  const { handleTariffChange, handleInputChange, getCalculationValue } =
    TariffChange({
      selectedCostPerKWh,
      setSelectedCostPerKWh,
      formData,
      setFormData,
      setIsValid,
      setErrorMessage,
    });

  const calculateAndSetResult = (updatedInputs: FormData): void => {
    const tariffForCalculation = getCalculationValue();

    const result = calculateLightingConsumption({
      wattage: updatedInputs.wattage,
      hoursPerDay: updatedInputs.hoursPerDay,
      numberOfBulbs: updatedInputs.numberOfBulbs,
      electricityCostPerKWh: tariffForCalculation * 100,
      daysPerMonth: updatedInputs.daysPerMonth,
      nightRateFactor: updatedInputs.nightRateFactor,
      nightRateUsagePercentage: updatedInputs.nightRateUsagePercentage / 100,
    });

    setResult(result);
    console.log(result);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (selectedCostPerKWh === "three-zone") {
      const isNumberValid = /^(?!$)(\d+(\.\d{0,2})?)$/.test(
        formData.costPerKWh
      );
      if (!isNumberValid) {
        setIsValid(false);
        setErrorMessage("Введіть число до двох знаків після коми.");
        return;
      }
    }

    calculateAndSetResult(formData);
    setCalculationDone(true);
    setCalculationType("mw");
  };

  return (
    <form className="flex flex-col xl:flex-row gap-4 xl:gap-16 text-lg xl:text-2xl h-full">
      <div className="w-full bg-white rounded-b-[30px] px-4 pb-4 xl:px-0 xl:pb-0 xl:w-7/12 flex-shrink-0 flex flex-col justify-between">
        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="wattage">Потужність лампочки:</label>
          <div className="mt-4 xl:mt-6">
            <CalcInput
              id="wattage"
              type="number"
              value={formData.wattage}
              onChange={handleInputChange}
              unit="W"
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
            />
          </div>
        </div>

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <span>Тариф на електроенергію:</span>
          <div className="flex flex-col items-center xl:flex-row mt-4 xl:mt-6 text-base xl:text-lg relative">
            <div>
              <SelectInput
                options={options.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                selectedValue={selectedCostPerKWh}
                onChange={handleTariffChange}
                isOpen={isSelectOpen}
                setIsOpen={setIsSelectOpen}
              />
            </div>

            <span className="hidden xl:block xl:mx-4">-</span>

            <div className="relative">
              <Input
                id="costPerKWhInput"
                type="text"
                value={formData.costPerKWh}
                onChange={handleInputChange}
                disabled={isInputDisabled}
                className={`px-4 py-4 w-full mt-4 xl:mt-0 xl:px-6 xl:py-6 rounded-2xl text-base xl:text-lg ${
                  isInputDisabled ? "bg-gray-200 cursor-not-allowed" : ""
                } ${!isValid ? "border-2 border-red-500" : ""}`}
              />
              <span className="absolute mt-2 xl:mt-0 right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base xl:text-lg">
                грн/кВт
              </span>
              {formData.icon && Array.isArray(formData.icon) ? (
                <span className="absolute flex flex-row-reverse gap-12 xl:gap-16 items-center mt-2 xl:mt-0 left-[60px] xl:left-[72px] top-1/2 transform -translate-y-1/2">
                  {formData.icon.map((iconElement, index) => (
                    <span key={index}>{iconElement}</span>
                  ))}
                </span>
              ) : (
                <span className="absolute flex flex-row-reverse gap-12 xl:gap-16 items-center mt-2 xl:mt-0 left-[60px] xl:left-[72px] top-1/2 transform -translate-y-1/2">
                  {formData.icon}
                </span>
              )}
              {!isValid && (
                <div className="text-red-500 absolute text-sm mt-1">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedCostPerKWh === "two-zone" && (
          <>
            <div className="relative mt-6 xl:mt-0">
              <TooltipBtn
                title="Пояснення показників"
                text="Вкажіть обсяг води, що використовується за місяць."
                buttonText="Зрозуміло"
              />
              <label htmlFor="nightRateUsagePercentage">
                Як часто вімкнуто світло вночі?
              </label>

              <div className="relative mt-4 xl:mt-6">
                <Input
                  id="nightRateUsagePercentage"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.nightRateUsagePercentage}
                  onChange={handleInputChange}
                  className="w-[90%] px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base xl:text-lg">
                  {formData.nightRateUsagePercentage}%
                </span>
              </div>
            </div>
          </>
        )}

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="hoursPerDay">
            Кількість годин роботи освітлення на день:
          </label>
          <div className="mt-4 xl:mt-6">
            <CalcInput
              id="hoursPerDay"
              type="number"
              value={formData.hoursPerDay}
              onChange={handleInputChange}
              unit="хв"
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
            />
          </div>
        </div>

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="numberOfBulbs">Кількість лампочок:</label>
          <div className="mt-4 xl:mt-6">
            <CalcInput
              id="numberOfBulbs"
              type="number"
              value={formData.numberOfBulbs}
              onChange={handleInputChange}
              unit="разів"
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
            />
          </div>
        </div>

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="daysPerMonth">
            Кількість днів у поточному місяці:
          </label>
          <div className="mt-4 xl:mt-6">
            <CalcInput
              id="daysPerMonth"
              type="number"
              value={formData.daysPerMonth}
              onChange={handleInputChange}
              unit="днів"
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          size="xl"
          className="mt-6 py-4 xl:hidden text-lg"
        >
          Розрахувати
        </Button>
      </div>

      <div className="bg-white rounded-[30px] p-4 xl:p-0 flex flex-col justify-between">
        <div className="flex flex-col gap-6 xl:gap-12">
          <div>
            <p className="mb-4">Освітлення</p>
            <p className="mb-4 mt-10">Місячне споживання</p>
            <p className="text-lg xl:text-xl text-gray-600">
              {result?.monthly.energyConsumption.toFixed(2) || 0} кВт·год/міс
            </p>
            <p
              className={cn("text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4")}
            >
              {result?.monthly.energyCost.toFixed(2) || 0} грн/міс
            </p>
          </div>
          <div className="border-t-2 pt-6 border-black xl:border-none xl:pt-0">
            <p className="mb-4">Річне споживання</p>
            <p className="text-lg xl:text-xl text-gray-600">
              {result?.yearly.energyConsumption.toFixed(2) || 0} кВт·год/рік
            </p>
            <p
              className={cn("text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4")}
            >
              {result?.yearly.energyCost.toFixed(2) || 0} грн/рік
            </p>
          </div>
        </div>

        <div>
          <Button
            size="xl"
            className="hidden xl:flex xl:text-2xl w-full"
            onClick={handleSubmit}
          >
            Розрахувати
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LightComponent;
