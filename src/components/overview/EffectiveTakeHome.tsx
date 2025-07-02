import { useDevexRate } from '@/hooks/useDevexRate'

export default function EffectiveTakeHome() {
    const { rate, loading } = useDevexRate()
    return <span>{loading ? '—' : `${(rate * 100).toFixed(2)}%`}</span>
}
