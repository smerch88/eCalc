'use client';

import { Input } from '@/components/ui/input';
// import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { SelectInput } from '../ui/selectInput';
import { CalcInput } from '@/components/ui/calcInput';
import { MouseEvent, useState } from 'react';
import TooltipBtn from '../ui/tooltipBtn';
import { calculateBoilerEnergyConsumption } from '@/lib/calculators';
import { useUnifiedStore } from '@/stores/stores';
import { TariffChange, options, icons } from '@/components/TariffChange';
import cn from 'classnames';
import { boilerContent } from '@/lib/techContent';
import { scroller } from 'react-scroll';
import { Loader } from 'react-feather';
import { useSpring, animated } from '@react-spring/web';

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

const AnimatedNumber = ({ value }: { value: number }) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: value,
        config: { duration: 1000 },
    });

    return <animated.span>{number.to(n => n.toFixed(2))}</animated.span>;
};

const BoilerComponent = () => {
    const [selectedCostPerKWh, setSelectedCostPerKWh] = useState<string>('single-zone');
    // const [inputValue, setInputValue] = useState<string>("4.32");
    const [formData, setFormData] = useState<FormData>({
        waterVolume: '3000',
        initialTemp: 15,
        targetTemp: 60,
        efficiency: 90,
        costPerKWh: '4.32',
        hotWaterCostPerCubicMeter: '97.89',
        coldWaterCostPerCubicMeter: '13.45',
        subscriptionFee: '42.94',
        nightRateFactor: 1,
        nightRateUsagePercentage: 0,
        city: '',
        icon: icons.day,
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const setCalculationDone = useUnifiedStore(state => state.setCalculationDone);
    const location = useUnifiedStore(state => state.location); // Поточне місто
    const setCalculationType = useUnifiedStore(state => state.setCalculationType);

    const isInputDisabled = selectedCostPerKWh !== 'three-zone';

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
            updatedInputs.nightRateUsagePercentage
        );

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
            setCalculationType('boiler');

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
                        title={boilerContent.city.title}
                        text={boilerContent.city.text}
                        buttonText="Зрозуміло"
                    />
                    <label className="text-shadow" htmlFor="city">
                        Тарифи за воду з міста:
                    </label>
                    <div className="relative mt-4 xl:mt-3">
                        <Input
                            id="city"
                            type="text"
                            placeholder="Місто"
                            // value={formData.city}
                            value={location}
                            readOnly
                            onChange={handleInputChange}
                            className="p-4 xl:p-6 rounded-2xl"
                        />
                        {/* <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" /> */}
                        <svg
                            className="absolute w-6 h-6 right-4 top-1/2 transform -translate-y-1/2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 3.5C8.68629 3.5 6 6.18629 6 9.5C6 10.914 6.80153 12.4465 7.94257 13.8838C9.06683 15.2998 10.4317 16.513 11.3684 17.2729C11.743 17.5768 12.257 17.5768 12.6316 17.2729C13.5683 16.513 14.9332 15.2998 16.0574 13.8838C17.1985 12.4465 18 10.914 18 9.5C18 6.18629 15.3137 3.5 12 3.5ZM4.5 9.5C4.5 5.35786 7.85786 2 12 2C16.1421 2 19.5 5.35786 19.5 9.5C19.5 11.4319 18.4356 13.3007 17.2322 14.8164C16.012 16.3533 14.554 17.6449 13.5766 18.4378C12.6513 19.1885 11.3487 19.1885 10.4234 18.4378C9.44602 17.6449 7.98797 16.3533 6.76779 14.8164C5.56439 13.3007 4.5 11.4319 4.5 9.5ZM12 8C11.1716 8 10.5 8.67157 10.5 9.5C10.5 10.3284 11.1716 11 12 11C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8ZM9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5ZM17.6816 15.8464C17.3183 16.2786 16.942 16.6883 16.5683 17.0702C16.9239 17.1697 17.2552 17.28 17.5587 17.3996C18.2537 17.6733 18.7652 17.9807 19.0905 18.2836C19.4147 18.5856 19.5 18.8282 19.5 18.9999C19.5 19.1715 19.4147 19.4141 19.0905 19.7161C18.7652 20.019 18.2537 20.3264 17.5587 20.6001C16.1734 21.1459 14.2084 21.4999 12 21.4999C9.79163 21.4999 7.8266 21.1459 6.44126 20.6001C5.74635 20.3264 5.23477 20.019 4.90949 19.7161C4.5853 19.4141 4.5 19.1715 4.5 18.9999C4.5 18.8282 4.5853 18.5856 4.90949 18.2836C5.23477 17.9807 5.74635 17.6733 6.44126 17.3996C6.74476 17.28 7.07607 17.1697 7.43168 17.0702C7.05802 16.6883 6.68168 16.2786 6.31839 15.8464C6.17207 15.897 6.02969 15.9495 5.89148 16.004C5.09344 16.3183 4.39682 16.7113 3.88716 17.186C3.3764 17.6617 3 18.2741 3 18.9999C3 19.7256 3.3764 20.338 3.88716 20.8137C4.39682 21.2884 5.09344 21.6814 5.89148 21.9958C7.49205 22.6263 9.65202 22.9999 12 22.9999C14.348 22.9999 16.508 22.6263 18.1085 21.9958C18.9066 21.6814 19.6032 21.2884 20.1128 20.8137C20.6236 20.338 21 19.7256 21 18.9999C21 18.2741 20.6236 17.6617 20.1128 17.186C19.6032 16.7113 18.9066 16.3183 18.1085 16.004C17.9703 15.9495 17.8279 15.897 17.6816 15.8464Z"
                                fill="#191919"
                            />
                        </svg>
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={boilerContent.waterVolume.title}
                        text={boilerContent.waterVolume.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="waterVolume" className="block pr-6 xl:pr-0 text-shadow">
                        Споживання гарячої води на місяць:
                    </label>
                    <div className="relative mt-4 xl:mt-3">
                        <Input
                            id="waterVolume"
                            type="text"
                            placeholder="Літрів"
                            value={formData.waterVolume}
                            onChange={handleInputChange}
                            className="w-full px-4 xl:px-6 rounded-2xl"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm">
                            літрів
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={boilerContent.tariffElectricity.title}
                        text={boilerContent.tariffElectricity.text}
                        buttonText="Зрозуміло"
                    />
                    <span className="block pr-6 xl:pr-0 text-shadow">Тариф на електроенергію:</span>
                    <div className="flex flex-col items-center xl:flex-row mt-4 xl:mt-3 text-base xl:text-lg relative">
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
                                className={`px-4 w-full mt-4 xl:mt-0 xl:px-6 rounded-2xl ${
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
                                title={boilerContent.nightRateUsagePercentage.title}
                                text={boilerContent.nightRateUsagePercentage.text}
                                buttonText="Зрозуміло"
                            />
                            <label
                                htmlFor="nightRateUsagePercentage"
                                className="block pr-6 xl:pr-0 text-shadow"
                            >
                                Яку частину води грієте вночі?
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
                        title={boilerContent.tariffWater.title}
                        text={boilerContent.tariffWater.text}
                        buttonText="Зрозуміло"
                    />
                    <span className="block pr-6 xl:pr-0 text-shadow">
                        Який тариф на водопостачання використовуєте?
                    </span>
                    <div className="flex flex-col xl:flex-row gap-4 xl:gap-12 mt-4 xl:mt-3">
                        <div className="flex items-center xl:gap-6">
                            <label
                                className="w-[128px] xl:w-auto text-base"
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
                                    className="w-full px-4 xl:px-6 rounded-2xl"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm">
                                    грн/м³
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center xl:gap-6">
                            <label
                                className="w-[128px] xl:w-auto text-base"
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
                                    className="w-full px-4 xl:px-6 rounded-2xl"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm">
                                    грн/м³
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={boilerContent.tariffWaterConnection.title}
                        text={boilerContent.tariffWaterConnection.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="subscriptionFee" className="block pr-6 xl:pr-0 text-shadow">
                        Абонплата за підключення гарячої води:
                    </label>
                    <div className="relative mt-4 xl:mt-3">
                        <Input
                            id="subscriptionFee"
                            type="number"
                            placeholder="42.94"
                            value={formData.subscriptionFee}
                            onChange={handleInputChange}
                            className="w-full px-4 xl:px-6 rounded-2xl"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm">
                            грн/міс
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={boilerContent.waterTemperatures.title}
                        text={boilerContent.waterTemperatures.text}
                        buttonText="Зрозуміло"
                    />
                    <div className="flex flex-col xl:flex-row gap-4 xl:gap-12">
                        <div>
                            <label htmlFor="initialTemp" className="block xl:mb-3 text-shadow">
                                Початкова температура:
                            </label>
                            <CalcInput
                                id="initialTemp"
                                type="number"
                                value={formData.initialTemp}
                                onChange={handleInputChange}
                                unit="&deg;C"
                            />
                        </div>

                        <div>
                            <label htmlFor="targetTemp" className="block xl:mb-3 text-shadow">
                                Цільова температура:
                            </label>
                            <CalcInput
                                id="targetTemp"
                                type="number"
                                value={formData.targetTemp}
                                onChange={handleInputChange}
                                unit="&deg;C"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <TooltipBtn
                        title={boilerContent.coefficientOfEfficiency.title}
                        text={boilerContent.coefficientOfEfficiency.text}
                        buttonText="Зрозуміло"
                    />
                    <label htmlFor="efficiency" className="block xl:mb-3 text-shadow">
                        Який ККД бойлера?
                    </label>
                    <div>
                        <CalcInput
                            id="efficiency"
                            type="number"
                            value={formData.efficiency}
                            onChange={handleInputChange}
                            unit="&#37;"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleSubmit}
                    id="btn-boiler-calc"
                    size="xl"
                    className="py-4 xl:hidden text-lg w-full"
                >
                    {isLoading ? <Loader className="animate-spin" /> : 'Розрахувати'}
                </Button>
            </div>

            <div className="bg-white rounded-xmd p-4 xl:p-0 flex flex-col justify-between">
                <div id="mob-calc-result" className="flex flex-col gap-6 xl:gap-12">
                    <div>
                        <p className="mb-4">Бойлер</p>
                        <p
                            className={cn(
                                result?.totalCostInUAH && result?.networkHotWaterCostInUAH
                                    ? result?.totalCostInUAH < result?.networkHotWaterCostInUAH
                                        ? 'text-success'
                                        : 'text-failure'
                                    : 'text-black',
                                'text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4'
                            )}
                        >
                            {result?.totalCostInUAH !== undefined ? (
                                <>
                                    <AnimatedNumber value={result.totalCostInUAH} /> грн/міс
                                </>
                            ) : (
                                '0 грн/міс'
                            )}
                        </p>
                        {result?.totalCostInUAH !== undefined &&
                            result?.networkHotWaterCostInUAH !== undefined && (
                                <p className="xl:mb-4">
                                    на{' '}
                                    <span className="font-semibold">
                                        <AnimatedNumber
                                            value={Math.abs(
                                                result.totalCostInUAH -
                                                    result.networkHotWaterCostInUAH
                                            )}
                                        />{' '}
                                        грн
                                    </span>{' '}
                                    {result.totalCostInUAH - result.networkHotWaterCostInUAH < 0
                                        ? 'дешевше'
                                        : 'дорожче'}
                                </p>
                            )}
                    </div>
                    <span className="hidden xl:block text-center text-base ">проти</span>
                    <div className="border-t-[1px] pt-6 border-black xl:border-none xl:pt-0">
                        <p className="mb-4">Централізована мережа</p>
                        <p
                            className={cn(
                                result?.totalCostInUAH && result?.networkHotWaterCostInUAH
                                    ? result?.networkHotWaterCostInUAH < result?.totalCostInUAH
                                        ? 'text-success'
                                        : 'text-failure'
                                    : 'text-black',
                                'text-2xl xl:text-4xl font-semibold mb-2 xl:mb-4'
                            )}
                        >
                            {result?.networkHotWaterCostInUAH !== undefined ? (
                                <>
                                    <AnimatedNumber value={result.networkHotWaterCostInUAH} />{' '}
                                    грн/міс
                                </>
                            ) : (
                                '0 грн/міс'
                            )}
                        </p>
                    </div>
                </div>

                <Button
                    size="xl"
                    id="btn-boiler-calc"
                    className="hidden xl:flex xl:text-xl w-full"
                    onClick={handleSubmit}
                >
                    {isLoading ? <Loader className="animate-spin" /> : 'Розрахувати'}
                </Button>
            </div>
        </form>
    );
};

export default BoilerComponent;
