import { useEffect, useState } from 'react'

const FALLBACK_RATE = 0.0035

export function useDevexRate() {
    const [rate, setRate] = useState<number>(FALLBACK_RATE)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        let ignore = false
        async function fetchRate() {
            setLoading(true)
            try {
                const resp = await fetch('/api/devex/latest')
                if (!resp.ok) throw new Error('Request failed')
                const json: { rate: number } = await resp.json()
                if (!ignore && json.rate) {
                    setRate(json.rate)
                }
            } catch (err) {
                if (!ignore) {
                    setError(err)
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }
        fetchRate()
        return () => {
            ignore = true
        }
    }, [])

    return { rate, loading, error }
}
