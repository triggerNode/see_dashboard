import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

const FALLBACK_RATE = 0.0035

export function useDevexRate() {
    const [rate, setRate] = useState<number>(FALLBACK_RATE)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false
        async function fetchRate() {
            setLoading(true)
            try {
                // Fetch the latest DevEx rate from Supabase
                const { data, error: supabaseError } = await supabase
                    .from('devex_rates')
                    .select('*')
                    .order('fetched_at', { ascending: false })
                    .limit(1)
                    .maybeSingle()

                if (supabaseError) {
                    throw new Error(supabaseError.message)
                }

                if (!ignore) {
                    if (data) {
                        setRate(data.rate)
                        setLastUpdated(data.fetched_at)
                    } else {
                        // No data found, trigger the scrape function
                        console.log('No DevEx rate data found, invoking scrape function...')
                        const { error: invokeError } = await supabase.functions.invoke('scrapeDevexRate')
                        
                        if (invokeError) {
                            console.error('Error invoking scrape function:', invokeError)
                        }
                        
                        // Use fallback rate
                        setRate(FALLBACK_RATE)
                        setLastUpdated(new Date().toISOString())
                    }
                }
            } catch (err) {
                if (!ignore) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch DevEx rate')
                    setRate(FALLBACK_RATE)
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

    return { rate, loading, error, lastUpdated }
}
