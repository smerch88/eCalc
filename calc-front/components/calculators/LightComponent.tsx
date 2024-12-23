'use client';

import { TariffChange, icons, options } from '@/components/TariffChange';
import { CalcInput } from '@/components/ui/calcInput';
import { Input } from '@/components/ui/input';
import { calculateLightingConsumption } from '@/lib/calculators';
import { lightContent } from '@/lib/techContent';
import { getDaysInCurrentMonth } from '@/lib/utils';
import { useUnifiedStore } from '@/stores/stores';
import cn from 'classnames';
import { MouseEvent, useState } from 'react';
import { Button } from '../ui/button';
import { SelectInput } from '../ui/selectInput';
import TooltipBtn from '../ui/tooltipBtn';
import { Loader } from 'react-feather';
import { scroller } from 'react-scroll';
import { useSpring, animated } from '@react-spring/web';

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

const AnimatedNumber = ({ value }: { value: number }) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: value,
        config: { duration: 1000 },
    });

    return <animated.span>{number.to(n => n.toFixed(2))}</animated.span>;
};

const LightComponent = () => {
    const [selectedCostPerKWh, setSelectedCostPerKWh] = useState<string>('single-zone');
    const [formData, setFormData] = useState<FormData>({
        wattage: 100,
        hoursPerDay: 6,
        numberOfBulbs: 12,
        costPerKWh: '4.32',
        daysPerMonth: getDaysInCurrentMonth(),
        nightRateFactor: 1,
        nightRateUsagePercentage: 0,
        icon: icons.day,
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const setCalculationDone = useUnifiedStore(state => state.setCalculationDone);
    const setCalculationType = useUnifiedStore(state => state.setCalculationType);

    const isInputDisabled = selectedCostPerKWh !== 'three-zone';

    const calculateAndSetResult = (updatedInputs: FormData): void => {
        const tariffForCalculation = getCalculationValue();

        const result = calculateLightingConsumption({
            wattage: updatedInputs.wattage,
            hoursPerDay: updatedInputs.hoursPerDay,
            numberOfBulbs: updatedInputs.numberOfBulbs,
            electricityCostPerKWh: tariffForCalculation * 100,
            daysPerMonth: updatedInputs.daysPerMonth,
            nightRateFactor: updatedInputs.nightRateFactor,
            nightRateUsagePercentage: updatedInputs.nightRateUsagePercentage,
        });

        setResult(result);
        console.log(result);
    };

    const { handleTariffChange, handleInputChange, getCalculationValue } = TariffChange({
        selectedCostPerKWh,
        setSelectedCostPerKWh,
        formData,
        setFormData,
        setIsValid,
        setErrorMessage,
        calculateAndSetResult,
    });

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

        setIsLoading(true);
        setTimeout(() => {
            calculateAndSetResult(formData);
            setCalculationDone(true);
            setCalculationType('light');

            setIsLoading(false);
        }, 500);

        const isMobile = window.matchMedia('(max-width: 1280px)').matches;
        const offset = isMobile ? -30 : 250;

        scroller.scrollTo(isMobile ? 'mob-calc-result' : 'calculator-section', {
            smooth: true,
            offset: offset,
            duration: 1500,
        });
    };

    return (
        <form className="flex flex-col xl:flex-row gap-4 xl:gap-16 xl:text-lg h-full">
            <div className="w-full bg-white rounded-b-xmd px-4 pb-4 xl:px-0 xl:pb-0 xl:w-[660px] flex-shrink-0 flex flex-col gap-4 xl:gap-8">
                <div className="relative">
                    <TooltipBtn
                        title={lightContent.wattage.title}
                        text={lightContent.wattage.text}
                        buttonText="Зрозуміло"
                    />
                    <label className="text-shadow" htmlFor="wattage">
                        Потужність лампочки:
                    </label>
                    <div className="mt-4 xl:mt-3">
                        <CalcInput
                            id="wattage"
                            type="number"
                            value={formData.wattage}
                            onChange={handleInputChange}
                            unit="W"
                        />
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={lightContent.tariffElectricity.title}
                        text={lightContent.tariffElectricity.text}
                        buttonText="Зрозуміло"
                    />
                    <span className="block pr-6 xl:pr-0 text-shadow">Тариф на електроенергію:</span>
                    <div className="flex flex-col items-center xl:flex-row mt-4 xl:mt-3 relative">
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
                                className={`px-4 xl:px-6 w-full mt-4 xl:mt-0 rounded-2xl  ${
                                    isInputDisabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                } ${!isValid ? 'border-2 border-red-500' : ''}`}
                            />
                            <span className="absolute mt-2 xl:mt-0 right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm">
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
                        <div className="relative">
                            <TooltipBtn
                                title={lightContent.nightRateUsagePercentage.title}
                                text={lightContent.nightRateUsagePercentage.text}
                                buttonText="Зрозуміло"
                            />
                            <label htmlFor="nightRateUsagePercentage">
                                Як часто ввімкнуто світло вночі?
                            </label>

                            <div className="flex items-start mt-4 xl:mt-6">
                                <Input
                                    id="nightRateUsagePercentage"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.nightRateUsagePercentage}
                                    onChange={handleInputChange}
                                    className="mr-6 border-b-[1px] rounded-none border-t-0 border-x-0 border-black border-solid shadow-none"
                                />
                                <span className="text-base font-normal xl:text-lg">
                                    {formData.nightRateUsagePercentage}&#37;
                                </span>
                            </div>
                        </div>
                    </>
                )}

                <div className="relative">
                    <TooltipBtn
                        title={lightContent.wattage.title}
                        text={lightContent.wattage.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="hoursPerDay" className="text-shadow block pr-6 xl:pr-0">
                        Кількість годин роботи освітлення:
                    </label>
                    <div className="mt-4 xl:mt-3">
                        <CalcInput
                            id="hoursPerDay"
                            type="number"
                            value={formData.hoursPerDay}
                            onChange={handleInputChange}
                            unit="год/день"
                        />
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={lightContent.wattage.title}
                        text={lightContent.wattage.text}
                        buttonText="Зрозуміло"
                    />
                    <label className="text-shadow" htmlFor="numberOfBulbs">
                        Кількість лампочок:
                    </label>
                    <div className="mt-4 xl:mt-3">
                        <CalcInput
                            id="numberOfBulbs"
                            type="number"
                            value={formData.numberOfBulbs}
                            onChange={handleInputChange}
                            unit="шт"
                        />
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={lightContent.wattage.title}
                        text={lightContent.wattage.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="daysPerMonth" className="text-shadow block pr-6 xl:pr-0">
                        Кількість днів у поточному місяці:
                    </label>
                    <div className="mt-4 xl:mt-3">
                        <CalcInput
                            id="daysPerMonth"
                            type="number"
                            value={formData.daysPerMonth}
                            onChange={handleInputChange}
                            unit="днів"
                        />
                    </div>
                </div>

                <Button onClick={handleSubmit} size="xl" className="py-4 xl:hidden text-lg w-full">
                    {isLoading ? <Loader className="animate-spin" /> : 'Розрахувати'}
                </Button>
            </div>

            <div className="bg-white rounded-xmd p-4 xl:p-0 flex flex-col justify-between">
                <div id="mob-calc-result" className="flex flex-col gap-6 xl:gap-12">
                    <div>
                        <p className="mb-4">Освітлення</p>
                        <p className="mb-4">Місячне споживання</p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.monthly.energyConsumption.toFixed(2) || 0} кВт·год/міс
                        </p>
                        <p className={cn('text-2xl xl:text-4xl font-semibold')}>
                            <AnimatedNumber value={result?.monthly.energyCost || 0} /> грн/міс
                        </p>
                    </div>
                    <div className="border-t-[1px] pt-6 border-black xl:border-none xl:pt-0">
                        <p className="mb-4">Річне споживання</p>
                        <p className="text-lg xl:text-xl text-gray-600">
                            {result?.yearly.energyConsumption.toFixed(2) || 0} кВт·год/рік
                        </p>
                        <p className={cn('text-2xl xl:text-4xl font-semibold')}>
                            <AnimatedNumber value={result?.yearly.energyCost || 0} /> грн/рік
                        </p>
                    </div>
                </div>

                <Button
                    size="xl"
                    className="hidden xl:flex xl:text-2xl w-full"
                    onClick={handleSubmit}
                >
                    {isLoading ? <Loader className="animate-spin" /> : 'Розрахувати'}
                </Button>
            </div>
        </form>
    );
};

export default LightComponent;
