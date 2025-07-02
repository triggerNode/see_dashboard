import React from 'react'
import { useDevexRate } from '@/hooks/useDevexRate'

/**
 * Simple read-only widget that shows the current Roblox DevEx rate pulled from
 * `/api/devex/latest`.
 */
const EffectiveTakeHome: React.FC = () => {
    const { rate, loading } = useDevexRate()

    if (loading) {
        return <span>—</span>
    }

    // Show as a percentage of Robux kept after DevEx. If rate is dollars per
    // Robux, then take-home percentage is `rate / 0.01`? For display purposes
    // we just render the raw rate value.
    return <span>{rate.toFixed(4)}</span>
}

export default EffectiveTakeHome
