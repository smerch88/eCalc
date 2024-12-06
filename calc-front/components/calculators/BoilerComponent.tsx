"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown";
import { CalcInput } from "@/components/ui/calcInput";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { calculateBoilerEnergyConsumption } from "@/lib/calculators";
import { useUnifiedStore } from "@/stores/stores";

import cn from "classnames";

interface Option {
  value: string;
  label: string;
  tariff: string;
}

interface FormData {
  waterVolume: string;
  initialTemp: number;
  targetTemp: number;
  efficiency: number;
  costPerKWh: string;
  hotWaterCostPerCubicMeter: string;
  coldWaterCostPerCubicMeter: string;
  subscriptionFee: string;
  nightRateFactor: number;
  city: string;
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
    city: "",
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const options: Option[] = [
    { value: "single-zone", label: "Однозонний", tariff: "4.32" },
    { value: "two-zone", label: "Двозонний", tariff: "2.16" },
    { value: "three-zone", label: "Тризонний", tariff: "" },
  ];

  const isInputDisabled = selectedCostPerKWh !== "three-zone";

  const boiler = useUnifiedStore((state) => state.boiler);

  const setCalculationDone = useUnifiedStore(
    (state) => state.setCalculationDone
  );

  const setCalculationType = useUnifiedStore(
    (state) => state.setCalculationType
  );

  useEffect(() => {
    if (boiler?.efficiency) {
      setFormData((prev) => ({
        ...prev,
        efficiency: boiler.efficiency,
      }));
    }
  }, [boiler]);

  const handleTariffChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    const tariffValue = selectedOption?.tariff || "";
    setSelectedCostPerKWh(event.target.value);
    // setInputValue(tariffValue);
    setFormData((prev) => ({ ...prev, costPerKWh: tariffValue }));
  };

  const simulateChangeEvent = (
    value: string
  ): ChangeEvent<HTMLSelectElement> => {
    return {
      target: { value },
    } as ChangeEvent<HTMLSelectElement>;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;

    setFormData((prev) => {
      if (id === "costPerKWhInput") {
        return { ...prev, costPerKWh: value };
      }
      return { ...prev, [id]: value };
    });

    // setInputValue(value);
  };

  const calculateAndSetResult = (updatedInputs: FormData): void => {
    const result = calculateBoilerEnergyConsumption(
      parseFloat(updatedInputs.waterVolume) || 3000,
      updatedInputs.initialTemp || 50,
      updatedInputs.targetTemp || 60,
      updatedInputs.efficiency || 90,
      parseFloat(updatedInputs.costPerKWh) * 100 || 43200,
      parseFloat(updatedInputs.hotWaterCostPerCubicMeter) * 100 || 978900,
      parseFloat(updatedInputs.coldWaterCostPerCubicMeter) * 100 || 134500,
      parseFloat(updatedInputs.subscriptionFee) * 100 || 4294,
      updatedInputs.nightRateFactor
    );

    setResult(result);
    console.log(result);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    calculateAndSetResult(formData);
    setCalculationDone(true);
    setCalculationType("boiler");
  };

  return (
    <form className="flex flex-col md:flex-row gap-4 md:gap-16 text-lg md:text-2xl h-full">
      <div className="w-full bg-white rounded-b-[30px] px-4 pb-4 md:px-0 md:pb-0 md:w-7/12 flex-shrink-0 flex flex-col justify-between">
        <div>
          <label htmlFor="city">Тарифи за воду з міста:</label>
          <div className="relative mt-4 md:mt-6">
            <Input
              id="city"
              type="text"
              placeholder="Місто"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-4 md:px-6 md:py-6 rounded-2xl text-base md:text-lg"
            />
            <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <label htmlFor="waterVolume">
            Споживання гарячої води на місяць:
          </label>
          <div className="relative mt-4 md:mt-6">
            <Input
              id="waterVolume"
              type="text"
              placeholder="Літрів"
              value={formData.waterVolume}
              onChange={handleInputChange}
              className="w-full px-4 py-4 md:px-6 md:py-6 rounded-2xl text-base md:text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base md:text-lg">
              літрів
            </span>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <span>Тариф на електроенергію:</span>
          <div className="flex flex-col items-center md:flex-row mt-4 md:mt-6 text-base md:text-lg relative">
            <div>
              <Dropdown
                label={
                  selectedCostPerKWh
                    ? options.find(
                        (option) => option.value === selectedCostPerKWh
                      )?.label || "Оберіть варіант"
                    : "Оберіть варіант"
                }
                content={
                  <ul className="left-0 z-10 flex flex-col gap-4">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        onClick={(e) => {
                          handleTariffChange(simulateChangeEvent(option.value));
                          // Закриваємо дропдаун через ref
                          const details =
                            (e.currentTarget.closest(
                              "details"
                            ) as HTMLDetailsElement) || null;
                          if (details) details.removeAttribute("open");
                        }}
                        className="cursor-pointer hover:bg-gray-200 rounded-md"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                }
                className="w-full"
                summaryClassName="absolute top-0 w-full h-auto md:max-w-[307px] bg-gray-100 bg-opacity-100 z-10 p-0"
              />
            </div>

            <span className="hidden md:block md:mx-4">-</span>

            <div className="relative">
              <Input
                id="costPerKWhInput"
                type="text"
                value={formData.costPerKWh}
                onChange={handleInputChange}
                disabled={isInputDisabled}
                className={`px-4 py-4 w-full mt-[72px] md:mt-0 md:px-6 md:py-6 rounded-2xl text-base md:text-lg ${
                  isInputDisabled ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
              <span className="absolute mt-[36px] md:mt-0 right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base md:text-lg">
                грн/кВт
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <span>Який тариф на водопостачання використовуєте?</span>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-4 md:mt-6 text-base md:text-lg">
            <div className="flex items-center md:gap-6">
              <label
                className="w-[128px] md:w-auto"
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
                  className="w-full px-4 py-4 md:px-6 md:py-6 rounded-2xl md:text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap md:text-lg">
                  грн/м³
                </span>
              </div>
            </div>
            <div className="flex items-center md:gap-6">
              <label
                className="w-[128px] md:w-auto"
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
                  className="w-full px-4 py-4 md:px-6 md:py-6 rounded-2xl md:text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap md:text-lg">
                  грн/м³
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <label htmlFor="subscriptionFee">
            Абонплата за підключення гарячої води:
          </label>
          <div className="relative mt-4 md:mt-6">
            <Input
              id="subscriptionFee"
              type="text"
              placeholder="Місто"
              value={formData.subscriptionFee}
              onChange={handleInputChange}
              className="w-full px-4 py-4 md:px-6 md:py-6 rounded-2xl md:text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-base md:text-lg">
              грн/міс
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-12">
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
        <Button
          onClick={handleSubmit}
          className="rounded-2xl h-14 mt-6 py-4 md:hidden text-lg"
        >
          Розрахувати
        </Button>
      </div>

      <div className=" bg-white rounded-[30px] p-4 md:p-0 flex flex-col justify-between">
        <div className="flex flex-col gap-6 md:gap-12">
          <div>
            <p className="mb-4">Бойлер</p>
            <p
              className={cn(
                (result?.totalCostInUAH ?? 0) <
                  (result?.networkHotWaterCostInUAH ?? 0)
                  ? "text-success"
                  : "text-failure",
                "text-2xl md:text-4xl font-semibold mb-2 md:mb-4"
              )}
            >
              {result?.totalCostInUAH.toFixed(2) || 0} грн/міс
            </p>
            {result?.totalCostInUAH && result?.networkHotWaterCostInUAH && (
              <p className="md:mb-4">
                на{" "}
                <span className="font-semibold">
                  {Math.abs(
                    result?.totalCostInUAH - result?.networkHotWaterCostInUAH
                  ).toFixed(2)}{" "}
                  грн
                </span>{" "}
                {result?.totalCostInUAH - result?.networkHotWaterCostInUAH > 0
                  ? "більше"
                  : "менше"}
              </p>
            )}
          </div>
          <span className="hidden md:block md:text-center md:text-lg">
            проти
          </span>
          <div className="border-t-2 pt-6 border-black md:border-none md:pt-0">
            <p className="mb-4">Центральне водопостачання</p>
            <p className="text-2xl md:text-4xl font-semibold">
              {result?.networkHotWaterCostInUAH.toFixed(2) || 0} грн/міс
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="hidden md:flex md:text-2xl"
          size="xl"
        >
          Розрахувати
        </Button>
      </div>
    </form>
  );
};

export default BoilerComponent;
