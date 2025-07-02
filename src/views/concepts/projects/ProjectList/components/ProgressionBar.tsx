import { useMemo } from 'react'

type ProgressionBarProps = {
    progression: number
}

const ProgressionBar = ({ progression }: ProgressionBarProps) => {
    const profitMargin = useMemo(() => {
        // Convert progression to a profit margin percentage for display
        return Math.round(progression * 0.35) // Example: 80% progression = 28% profit margin
    }, [progression])

    const colorClass = useMemo(() => {
        if (profitMargin > 25) {
            return 'text-success'
        }

        if (profitMargin < 15) {
            return 'text-error'
        }

        return 'text-amber-600'
    }, [profitMargin])

    return (
        <div className={`text-sm font-semibold ${colorClass}`}>
            Profit Margin: {profitMargin}%
        </div>
    )
}

export default ProgressionBar
