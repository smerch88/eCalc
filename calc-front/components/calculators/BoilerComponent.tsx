"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { SelectInput } from "../ui/selectInput";
import { CalcInput } from "@/components/ui/calcInput";
import { MouseEvent, useState } from "react";
import TooltipBtn from "../ui/tooltipBtn";
import { calculateBoilerEnergyConsumption } from "@/lib/calculators";
import { useUnifiedStore } from "@/stores/stores";
import { TariffChange, options, icons } from "@/components/TariffChange";
import cn from "classnames";

export interface FormData {
  waterVolume: string;
  initialTemp: number;
  targetTemp: number;
  efficiency: number;
  costPerKWh: string;
  hotWaterCostPerCubicMeter: string;
  coldWaterCostPerCubicMeter: string;
  subscriptionFee: string;
  nightRateFactor: number;
  nightRateUsagePercentage: number;
  city: string;
  icon?: JSX.Element | JSX.Element[];
  [key: string]: unknown;
}

interface CalculationResult {
  totalCostInUAH: number;
  networkHotWaterCostInUAH: number;
}

const BoilerComponent = () => {
  const [selectedCostPerKWh, setSelectedCostPerKWh] =
    useState<string>("single-zone");
  // const [inputValue, setInputValue] = useState<string>("4.32");
  const [formData, setFormData] = useState<FormData>({
    waterVolume: "3000",
    initialTemp: 15,
    targetTemp: 60,
    efficiency: 90,
    costPerKWh: "4.32",
    hotWaterCostPerCubicMeter: "97.89",
    coldWaterCostPerCubicMeter: "13.45",
    subscriptionFee: "42.94",
    nightRateFactor: 1,
    nightRateUsagePercentage: 0,
    city: "",
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

    const result = calculateBoilerEnergyConsumption(
      parseFloat(updatedInputs.waterVolume) || 3000,
      updatedInputs.initialTemp || 15,
      updatedInputs.targetTemp || 60,
      updatedInputs.efficiency || 90,
      tariffForCalculation * 100 || 43200,
      parseFloat(updatedInputs.hotWaterCostPerCubicMeter) * 100 || 978900,
      parseFloat(updatedInputs.coldWaterCostPerCubicMeter) * 100 || 134500,
      parseFloat(updatedInputs.subscriptionFee) * 100 || 4294,
      updatedInputs.nightRateFactor,
      updatedInputs.nightRateUsagePercentage / 100
    );

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
    setCalculationType("boiler");
  };

  return (
    <form className="flex flex-col xl:flex-row gap-4 xl:gap-16 text-lg xl:text-2xl h-full">
      <div className="w-full bg-white rounded-b-[30px] px-4 pb-4 xl:px-0 xl:pb-0 xl:w-7/12 flex-shrink-0 flex flex-col justify-between">
        <div className="relative">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="city">Тарифи за воду з міста:</label>
          <div className="relative mt-4 xl:mt-6">
            <Input
              id="city"
              type="text"
              placeholder="Місто"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl text-base xl:text-lg"
            />
            <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </div>
        </div>

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="waterVolume">
            Споживання гарячої води на місяць:
          </label>
          <div className="relative mt-4 xl:mt-6">
            <Input
              id="waterVolume"
              type="text"
              placeholder="Літрів"
              value={formData.waterVolume}
              onChange={handleInputChange}
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl text-base xl:text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base xl:text-lg">
              літрів
            </span>
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
                Яку частину води грієте вночі?
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
          <span>Який тариф на водопостачання використовуєте?</span>
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-12 mt-4 xl:mt-6 text-base xl:text-lg">
            <div className="flex items-center xl:gap-6">
              <label
                className="w-[128px] xl:w-auto"
                htmlFor="coldWaterCostPerCubicMeter"
              >
                Холодна
              </label>
              <div className="relative">
                <Input
                  id="coldWaterCostPerCubicMeter"
                  type="text"
                  value={formData.coldWaterCostPerCubicMeter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap xl:text-lg">
                  грн/м³
                </span>
              </div>
            </div>
            <div className="flex items-center xl:gap-6">
              <label
                className="w-[128px] xl:w-auto"
                htmlFor="hotWaterCostPerCubicMeter"
              >
                Гаряча
              </label>
              <div className="relative">
                <Input
                  id="hotWaterCostPerCubicMeter"
                  type="text"
                  value={formData.hotWaterCostPerCubicMeter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap xl:text-lg">
                  грн/м³
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 xl:mt-0">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <label htmlFor="subscriptionFee">
            Абонплата за підключення гарячої води:
          </label>
          <div className="relative mt-4 xl:mt-6">
            <Input
              id="subscriptionFee"
              type="number"
              placeholder="42.94"
              value={formData.subscriptionFee}
              onChange={handleInputChange}
              className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base xl:text-lg">
              грн/міс
            </span>
          </div>
        </div>

        <div className="relative">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <div className="flex flex-col xl:flex-row xl:gap-12">
            <CalcInput
              id="initialTemp"
              type="number"
              label="Початкова температура"
              value={formData.initialTemp}
              onChange={handleInputChange}
              unit="&deg;C"
            />
            <CalcInput
              id="targetTemp"
              type="number"
              label="Цільова температура:"
              value={formData.targetTemp}
              onChange={handleInputChange}
              unit="&deg;C"
            />
          </div>
        </div>

        <div className="relative">
          <TooltipBtn
            title="Пояснення показників"
            text="Вкажіть обсяг води, що використовується за місяць."
            buttonText="Зрозуміло"
          />
          <div>
            <CalcInput
              id="efficiency"
              type="number"
              label="Який КПД бойлера?"
              value={formData.efficiency}
              onChange={handleInputChange}
              unit="&#37;"
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

      <div className=" bg-white rounded-[30px] p-4 xl:p-0 flex flex-col justify-between">
        <div className="flex flex-col gap-6 xl:gap-12">
          <div>
            <p className="mb-4">Бойлер</p>
            <p
              className={cn(
                (result?.totalCostInUAH ?? 0) <
                  (result?.networkHotWaterCostInUAH ?? 0)
                  ? "text-success"
                  : "text-failure",
                "text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4"
              )}
            >
              {result?.totalCostInUAH.toFixed(2) || 0} грн/міс
            </p>
            {result?.totalCostInUAH && result?.networkHotWaterCostInUAH && (
              <p className="xl:mb-4">
                на{" "}
                <span className="font-semibold">
                  {Math.abs(
                    result?.totalCostInUAH - result?.networkHotWaterCostInUAH
                  ).toFixed(2)}{" "}
                  грн
                </span>{" "}
                {result?.totalCostInUAH - result?.networkHotWaterCostInUAH < 0
                  ? "дешевше"
                  : "дорожче"}
              </p>
            )}
          </div>
          <span className="hidden xl:block text-center text-base">проти</span>
          <div className="border-t-2 pt-6 border-black xl:border-none xl:pt-0">
            <p className="mb-4">Централізована мережа</p>
            <p className="text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4">
              {result?.networkHotWaterCostInUAH.toFixed(2) || 0} грн/міс
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

export default BoilerComponent;
