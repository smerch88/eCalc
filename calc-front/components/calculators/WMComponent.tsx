'use client';

import { MouseEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { CalcInput } from '@/components/ui/calcInput';
import { calculateWMConsumption } from '@/lib/calculators';
import { useUnifiedStore } from '@/stores/stores';
import {
    TariffChange,
    options,
    efficiencyOptions,
    loadSizeOptions,
    icons,
} from '@/components/TariffChange';
import { Button } from '../ui/button';
import { SelectInput } from '../ui/selectInput';
import TooltipBtn from '../ui/tooltipBtn';
import cn from 'classnames';
import { wmContent } from '@/lib/techContent';

export interface FormData {
    efficiencyClass: string;
    weeklyLoads: number;
    loadSize: string;
    costPerKWh: string;
    waterCostPerCubicMeter: string;
    ageInYears: number;
    nightRateFactor: number;
    nightRateUsagePercentage: number;
    city: string;
    icon?: JSX.Element | JSX.Element[];
    [key: string]: unknown;
}

interface CalculationResult {
    yearly: {
        totalEnergyConsumption: number;
        energyCost: number;
        totalWaterUsageLiters: number;
        waterCost: number;
        totalYearlyCost: number;
    };
    monthly: {
        loads: number;
        energyConsumption: number;
        energyCost: number;
        waterUsageLiters: number;
        waterCost: number;
        totalMonthlyCost: number;
    };
}

const WMComponent = () => {
    const [selectedCostPerKWh, setSelectedCostPerKWh] = useState<string>('single-zone');
    const [selectedEfficiencyClass, setSelectedEfficiencyClass] = useState<string>('A++');
    const [selectedLoadSize, setSelectedLoadSize] = useState<string>('medium');
    const [formData, setFormData] = useState<FormData>({
        efficiencyClass: 'A++',
        weeklyLoads: 1,
        loadSize: 'medium',
        costPerKWh: '4.32',
        waterCostPerCubicMeter: '13.45',
        ageInYears: 2,
        nightRateFactor: 1,
        nightRateUsagePercentage: 0,
        city: '',
        icon: icons.day,
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [isEfficiencySelectOpen, setIsEfficiencySelectOpen] = useState<boolean>(false);
    const [isLoadSizeSelectOpen, setIsLoadSizeSelectOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isInputDisabled = selectedCostPerKWh !== 'three-zone';

    const setCalculationDone = useUnifiedStore(state => state.setCalculationDone);
    const setCalculationType = useUnifiedStore(state => state.setCalculationType);

    const {
        handleTariffChange,
        handleInputChange,
        handleEfficiencyChange,
        handleLoadSizeChange,
        getCalculationValue,
    } = TariffChange({
        selectedCostPerKWh,
        setSelectedCostPerKWh,
        setSelectedEfficiencyClass,
        setSelectedLoadSize,
        formData,
        setFormData,
        setIsValid,
        setErrorMessage,
    });

    const calculateAndSetResult = (updatedInputs: FormData): void => {
        const tariffForCalculation = getCalculationValue();

        const result = calculateWMConsumption({
            efficiencyClass: updatedInputs.efficiencyClass,
            weeklyLoads: updatedInputs.weeklyLoads,
            loadSize: updatedInputs.loadSize,
            electricityCostPerKWh: tariffForCalculation * 100,
            waterCostPerCubicMeter: parseFloat(updatedInputs.waterCostPerCubicMeter) * 100,
            ageInYears: updatedInputs.ageInYears,
            nightRateFactor: updatedInputs.nightRateFactor,
            nightRateUsagePercentage: updatedInputs.nightRateUsagePercentage / 100,
        });

        setResult(result);
        console.log(result);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        if (selectedCostPerKWh === 'three-zone') {
            const isNumberValid = /^(?!$)(\d+(\.\d{0,2})?)$/.test(formData.costPerKWh);
            if (!isNumberValid) {
                setIsValid(false);
                setErrorMessage('Введіть число до двох знаків після коми.');
                return;
            }
        }

        calculateAndSetResult(formData);
        setCalculationDone(true);
        setCalculationType('wm');
    };

    return (
        <form className="flex flex-col xl:flex-row gap-4 xl:gap-16 text-lg xl:text-2xl h-full">
            <div className="w-full bg-white rounded-b-xmd px-4 pb-4 xl:px-0 xl:pb-0 xl:w-7/12 flex-shrink-0 flex flex-col justify-between">
                <div className="relative mt-6 xl:mt-0">
                    <TooltipBtn
                        title={wmContent.efficiencyClass.title}
                        text={wmContent.efficiencyClass.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="efficiencyClass" className="block pr-6 xl:pr-0">
                        Клас енергоефективності пральної машини:
                    </label>
                    <div className="mt-4 xl:mt-6 text-base xl:text-lg text-primary">
                        <SelectInput
                            id="efficiencyClass"
                            options={efficiencyOptions.map(option => ({
                                label: option.label,
                                value: option.value,
                            }))}
                            selectedValue={selectedEfficiencyClass}
                            onChange={handleEfficiencyChange}
                            isOpen={isEfficiencySelectOpen}
                            setIsOpen={setIsEfficiencySelectOpen}
                        />
                    </div>
                </div>

                <div className="relative mt-6 xl:mt-0">
                    <TooltipBtn
                        title={wmContent.tariffElectricity.title}
                        text={wmContent.tariffElectricity.text}
                        buttonText="Зрозуміло"
                    />
                    <span>Тариф на електроенергію:</span>
                    <div className="flex flex-col items-center xl:flex-row mt-4 xl:mt-6 text-base xl:text-lg">
                        <div>
                            <SelectInput
                                options={options.map(option => ({
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
                                    isInputDisabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                } ${!isValid ? 'border-2 border-red-500' : ''}`}
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
                {selectedCostPerKWh === 'two-zone' && (
                    <>
                        <div className="relative mt-6 xl:mt-0">
                            {/* <TooltipBtn
                                title="Пояснення показників"
                                text="Вкажіть обсяг води, що використовується за місяць."
                                buttonText="Зрозуміло"
                            /> */}
                            <label
                                htmlFor="nightRateUsagePercentage"
                                className="block pr-6 xl:pr-0"
                            >
                                Як часто використовуєте пральну машину вночі?
                            </label>
                            <div className="mt-4 xl:mt-6">
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
                        title={wmContent.tariffWater.title}
                        text={wmContent.tariffWater.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="waterCostPerCubicMeter" className="block pr-6 xl:pr-0">
                        Який тариф на водопостачання використовуєте?
                    </label>
                    <div className="mt-4 xl:mt-6">
                        <CalcInput
                            id="waterCostPerCubicMeter"
                            type="number"
                            value={formData.waterCostPerCubicMeter}
                            onChange={handleInputChange}
                            unit="грн/м³"
                            className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                        />
                    </div>
                </div>

                <div className="relative mt-6 xl:mt-0">
                    <TooltipBtn
                        title={wmContent.loadSize.title}
                        text={wmContent.loadSize.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="loadSize">Об&apos;єм завантажених речей</label>
                    <div className="mt-4 xl:mt-6 text-base xl:text-lg text-primary">
                        <SelectInput
                            id="loadSize"
                            options={loadSizeOptions.map(option => ({
                                label: option.label,
                                value: option.value,
                            }))}
                            selectedValue={selectedLoadSize}
                            onChange={handleLoadSizeChange}
                            isOpen={isLoadSizeSelectOpen}
                            setIsOpen={setIsLoadSizeSelectOpen}
                        />
                    </div>
                </div>

                <div className="relative mt-6 xl:mt-0">
                    <TooltipBtn
                        title={wmContent.weeklyLoads.title}
                        text={wmContent.weeklyLoads.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="weeklyLoads" className="block pr-6 xl:pr-0">
                        Кількість використань пральної машини на тиждень:
                    </label>
                    <div className="mt-4 xl:mt-6">
                        <CalcInput
                            id="weeklyLoads"
                            type="number"
                            value={formData.weeklyLoads}
                            onChange={handleInputChange}
                            unit="разів"
                            className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                        />
                    </div>
                </div>

                <div className="relative mt-6 xl:mt-0">
                    <TooltipBtn
                        title={wmContent.wmAge.title}
                        text={wmContent.wmAge.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="ageInYears" className="block pr-6 xl:pr-0">
                        Вік пральної машини в роках:
                    </label>
                    <div className="mt-4 xl:mt-6">
                        <CalcInput
                            id="ageInYears"
                            type="number"
                            value={formData.ageInYears}
                            onChange={handleInputChange}
                            unit="років"
                            className="w-full px-4 py-4 xl:px-6 xl:py-6 rounded-2xl xl:text-lg"
                        />
                    </div>
                </div>

                <Button onClick={handleSubmit} size="xl" className="mt-6 py-4 xl:hidden text-lg">
                    Розрахувати
                </Button>
            </div>

            <div className="bg-white rounded-xmd p-4 xl:p-0 flex flex-col justify-between">
                <div className="flex flex-col gap-6 xl:gap-12">
                    <div>
                        <p className="mb-4">Пральна машина</p>
                        <p className="mb-4 mt-10">Місячне споживання</p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.totalMonthlyCost.toFixed(2) || 0} грн/міс
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.waterCost.toFixed(2) || 0} грн/міс
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.waterUsageLiters.toFixed(2) || 0} літри/міс
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.energyConsumption.toFixed(2) || 0} кВт·год/міс
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.loads.toFixed(2) || 0} завантажень/міс
                        </p>
                        <p className={cn('text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4')}>
                            {result?.monthly.energyCost.toFixed(2) || 0} грн/міс
                        </p>
                    </div>

                    <div className="border-t-2 pt-6 border-black xl:border-none xl:pt-0">
                        <p className="mb-4">Річне споживання</p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.yearly.totalYearlyCost.toFixed(2) || 0} грн/рік
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.yearly.waterCost.toFixed(2) || 0} грн/рік
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.yearly.totalWaterUsageLiters.toFixed(2) || 0} літри/рік
                        </p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.yearly.totalEnergyConsumption.toFixed(2) || 0} кВт·год/рік
                        </p>
                        <p className={cn('text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4')}>
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

export default WMComponent;
