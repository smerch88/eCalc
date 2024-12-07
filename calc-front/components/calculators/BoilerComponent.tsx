"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
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
  const [inputValue, setInputValue] = useState<string>("4.32");
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
  ];

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
    setInputValue(tariffValue);
    setFormData((prev) => ({ ...prev, costPerKWh: tariffValue }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
    <form className="flex flex-row gap-16 text-2xl h-full">
      <div className="w-7/12 flex-shrink-0 flex flex-col justify-between">
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
          <label htmlFor="waterVolume">
            Споживання гарячої води на місяць:
          </label>
          <div className="relative mt-6">
            <Input
              id="waterVolume"
              type="text"
              placeholder="Місто"
              value={formData.waterVolume}
              onChange={handleInputChange}
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
              літрів
            </span>
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
                <option value="custom">Ввести власний</option>
              </select>
            </div>
            <div className="relative">
              <Input
                id="costPerKWhInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="px-6 py-6 rounded-2xl text-lg"
                disabled={ inputValue === "4.32" || inputValue ==="2.16"}
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
        <div>
          <label htmlFor="subscriptionFee">
            Абонплата за підключення гарячої води:
          </label>
          <div className="relative mt-6">
            <Input
              id="subscriptionFee"
              type="text"
              placeholder="Місто"
              value={formData.subscriptionFee}
              onChange={handleInputChange}
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
              грн/міс
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-12">
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
            label="Цільова температура"
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
