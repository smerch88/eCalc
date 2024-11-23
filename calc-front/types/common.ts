import { StaticImageData } from "next/image";

export type TariffType = "day" | "night";

export type Boiler = {
  name: string;
  price: number;
  link: string;
  image: StaticImageData;
  efficiency: number;
  volume: number;
};

export interface UnifiedStoreState {
  location: string;
  tariffType: TariffType;
  setLocation: (location: string) => void;
  setTariffType: (type: TariffType) => void;
  boiler: Boiler | null;
  setBoiler: (boiler: Boiler) => void;
}
