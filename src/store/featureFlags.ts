import { create } from 'zustand'

export interface FeatureFlagState {
    showLabs: boolean
    toggleLabs: () => void
}

export const useFeatureFlags = create<FeatureFlagState>((set) => ({
    showLabs: false, // Default to false, hiding the extra pages
    toggleLabs: () => set((state) => ({ showLabs: !state.showLabs })),
}))
