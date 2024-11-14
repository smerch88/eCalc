"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { calculateBoilerEnergyConsumption } from "@/lib/calculators";

import cn from "classnames";

// Define types for options
interface Option {
  value: string;
  label: string;
  tariff: string;
}

// Define types for form data
interface FormData {
  waterVolume: string;
  initialTemp: string;
  targetTemp: string;
  efficiency: string;
  costPerKWh: string;
  hotWaterCostPerCubicMeter: string;
  coldWaterCostPerCubicMeter: string;
  subscriptionFee: string;
  nightRateFactor: number;
  city: string;
}

// Define types for calculation result
interface CalculationResult {
  totalCostInUAH: number;
  networkHotWaterCostInUAH: number;
}

const BoilerComponent = () => {
  const [selectedCostPerKWh, setSelectedCostPerKWh] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    waterVolume: "3000",
    initialTemp: "15",
    targetTemp: "60",
    efficiency: "98",
    costPerKWh: "4.32",
    hotWaterCostPerCubicMeter: "97.89",
    coldWaterCostPerCubicMeter: "13.45",
    subscriptionFee: "42.94",
    nightRateFactor: 1,
    city: "",
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const options: Option[] = [
    { value: "single-zone", label: "Однозонний", tariff: "4.08" },
    { value: "two-zone", label: "Двозонний", tariff: "2.04" },
  ];

  const handleTariffChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    const tariffValue = selectedOption?.tariff || "";
    setSelectedCostPerKWh(event.target.value);
    setInputValue(tariffValue);
    setFormData((prev) => ({ ...prev, costPerKWh: tariffValue }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id, value } = event.target;

    setFormData((prev) => {
      if (id === "costPerKWhInput") {
        return { ...prev, costPerKWh: value };
      }
      return { ...prev, [id]: value };
    });

    setInputValue(value);
  };

  const calculateAndSetResult = (updatedInputs: FormData): void => {
    const result = calculateBoilerEnergyConsumption(
      parseFloat(updatedInputs.waterVolume) || 3000,
      parseFloat(updatedInputs.initialTemp) || 15,
      parseFloat(updatedInputs.targetTemp) || 60,
      parseFloat(updatedInputs.efficiency) || 90,
      parseFloat(updatedInputs.costPerKWh) * 100 || 43200,
      parseFloat(updatedInputs.hotWaterCostPerCubicMeter) * 100 || 978900,
      parseFloat(updatedInputs.coldWaterCostPerCubicMeter) * 100 || 134500,
      parseFloat(updatedInputs.subscriptionFee) * 100 || 4294,
      updatedInputs.nightRateFactor
    );

    setResult(result);
    console.log(result);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    calculateAndSetResult(formData);
  };

  return (
    <form className="flex flex-row gap-16 text-2xl">
      <div className="w-7/12 flex-shrink-0 flex flex-col gap-12">
        <div>
          <label htmlFor="city">Тарифи за воду з міста:</label>
          <div className="relative mt-6">
            <Input
              id="city"
              type="text"
              placeholder="Місто"
              value={formData.city}
              onChange={handleInputChange}
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </div>
        </div>
        <div>
          <span>Тариф на електроенергію:</span>
          <div className="flex flex-row gap-12 text-lg mt-6">
            <div className="relative">
              <select
                id="costPerKWh"
                value={selectedCostPerKWh}
                onChange={handleTariffChange}
                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Оберіть варіант</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Input
                id="costPerKWhInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="px-6 py-6 rounded-2xl text-lg"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                грн/кВт
              </span>
            </div>
          </div>
        </div>
        <div>
          <span>Який тариф на водопостачання використовуєте?</span>
          <div className="flex flex-row gap-12 text-lg mt-6">
            <div className="flex flex-row gap-6 items-center">
              <label htmlFor="coldWaterCostPerCubicMeter">Холодна</label>
              <div className="relative">
                <Input
                  id="coldWaterCostPerCubicMeter"
                  type="text"
                  value={formData.coldWaterCostPerCubicMeter}
                  onChange={handleInputChange}
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                  грн/м³
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
              <label htmlFor="hotWaterCostPerCubicMeter">Гаряча</label>
              <div className="relative">
                <Input
                  id="hotWaterCostPerCubicMeter"
                  type="text"
                  value={formData.hotWaterCostPerCubicMeter}
                  onChange={handleInputChange}
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                  грн/м³
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-12">
          <div>
            <label htmlFor="initialTemp">Початкова температура</label>
            <div className="relative">
              <Input
                id="initialTemp"
                type="text"
                value={formData.initialTemp}
                onChange={handleInputChange}
                className="px-6 py-6 rounded-2xl"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                °C
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="targetTemp">Цільова температура</label>
            <div className="relative">
              <Input
                id="targetTemp"
                type="text"
                value={formData.targetTemp}
                onChange={handleInputChange}
                className="px-6 py-6 rounded-2xl text-lg"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                °C
              </span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="efficiency">Який ККД бойлера?</label>
          <div className="relative mt-6">
            <Input
              id="efficiency"
              type="text"
              value={formData.efficiency}
              onChange={handleInputChange}
              placeholder="98"
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
              %
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-12">
          <div>
            <p className="mb-4">Бойлер</p>
            <p
              className={cn(
                (result?.totalCostInUAH ?? 0) <
                  (result?.networkHotWaterCostInUAH ?? 0)
                  ? "text-success"
                  : "text-failure",
                "text-4xl font-semibold mb-4"
              )}
            >
              {result?.totalCostInUAH.toFixed(2) || 0} грн/міс
            </p>
            {result?.totalCostInUAH && result?.networkHotWaterCostInUAH && (
              <p className="mb-4">
                на{" "}
                <span className="font-semibold">
                  {Math.abs(
                    result?.totalCostInUAH - result?.networkHotWaterCostInUAH
                  ).toFixed(2)}{" "}
                  грн
                </span>{" "}
                {result?.totalCostInUAH &&
                result?.networkHotWaterCostInUAH &&
                result?.totalCostInUAH - result?.networkHotWaterCostInUAH > 0
                  ? "більше"
                  : "менше"}
              </p>
            )}
          </div>
          <span className="text-center text-base">проти</span>
          <div>
            <p className="mb-4">Центральне водопостачання</p>
            <p className="text-4xl font-semibold">
              {result?.networkHotWaterCostInUAH.toFixed(2) || 0} грн/міс
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} className="rounded-2xl py-6 text-2xl">
          Розрахувати
        </Button>
      </div>
    </form>
  );
};

export default BoilerComponent;
