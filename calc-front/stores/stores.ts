import { UnifiedStoreState } from '@/types/common';
import { create } from 'zustand';

export const useUnifiedStore = create<UnifiedStoreState>(set => ({
    location: localStorage.getItem('location') || 'Київ', // Початкове значення
    setLocation: location => {
        localStorage.setItem('location', location); // Зберігаємо в localStorage
        set({ location });
    },
    tariffType: 'day',
    setTariffType: type => set({ tariffType: type }),
    boiler: null,
    setBoiler: boiler => set({ boiler }),
    advices: { boiler: [], light: [], wm: [], mw: [] },
    setAdvices: (type, newAdvices) =>
        set(state => {
            if (state.advices[type] === newAdvices) {
                return state;
            }
            return {
                advices: { ...state.advices, [type]: newAdvices },
            };
        }),
    isCalculationDone: false,
    setCalculationDone: (done: boolean) => set({ isCalculationDone: done }),
    calculationType: 'boiler',
    setCalculationType: type => set({ calculationType: type }),
    activeTab: 'boiler',
    setActiveTab: tab => set({ activeTab: tab }),
}));
