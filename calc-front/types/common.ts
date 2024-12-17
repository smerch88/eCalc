import { StaticImageData } from 'next/image';

export type TariffType = 'day' | 'night';

export type CalculationType = 'boiler' | 'light' | 'wm' | 'mw';

export type Boiler = {
    name: string;
    price: number;
    link: string;
    image: StaticImageData;
    efficiency: number;
    volume: number;
};

export type Advice = {
    label: string;
    options: string;
};

export interface UnifiedStoreState {
    location: string;
    tariffType: TariffType;
    setLocation: (location: string) => void;
    setTariffType: (type: TariffType) => void;
    boiler: Boiler | null;
    setBoiler: (boiler: Boiler) => void;
    advices: { [key in CalculationType]: Advice[] };
    setAdvices: (type: CalculationType, newAdvices: Advice[]) => void;
    isCalculationDone: boolean;
    setCalculationDone: (done: boolean) => void;
    calculationType: CalculationType;
    setCalculationType: (type: CalculationType) => void;
    activeTab: CalculationType;
    setActiveTab: (tab: CalculationType) => void;
}
