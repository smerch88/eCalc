import { UnifiedStoreState } from "@/types/common";
import { create } from "zustand";

export const useUnifiedStore = create<UnifiedStoreState>((set) => ({
  location: "",
  tariffType: "day",
  setLocation: (location) => set({ location }),
  setTariffType: (type) => set({ tariffType: type }),
  boiler: null,
  setBoiler: (boiler) => set({ boiler }),
}));
