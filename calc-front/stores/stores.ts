import { create } from "zustand";

type TarrifType = "day" | "night";

interface TarrifState {
  location: string;
  tarrifType: TarrifType;
  setLocation: (location: string) => void;
  setTarrifType: (type: TarrifType) => void;
}

export const useTarrigStore = create<TarrifState>((set) => ({
  location: "",
  tarrifType: "day",
  setLocation: (location) => set({ location }),
  setTarrifType: (type) => set({ tarrifType: type }),
}));
