import React from 'react'
import { useFeatureFlags } from '@/store/featureFlags'
import { Outlet } from 'react-router-dom'
import type { FeatureFlagState } from '@/store/featureFlags'

interface GatedRouteProps {
    gate: keyof Omit<FeatureFlagState, 'toggleLabs'>
}

const GatedRoute: React.FC<GatedRouteProps> = ({ gate }) => {
    const isEnabled = useFeatureFlags((state) => state[gate])

    // If the feature gate is enabled, render the nested child routes.
    // Otherwise, we can render null or redirect to a 404 page.
    if (!isEnabled) {
        return null
    }

    return React.createElement(Outlet)
}

export default GatedRoute
