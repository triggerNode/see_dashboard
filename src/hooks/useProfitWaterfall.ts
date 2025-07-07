import useSWR from 'swr'
import { supabase } from '@/lib/supabaseClient' // Using the correct client path

const fetcher = async (key: string, startDate: string, endDate: string) => {
    const { data, error } = await supabase.rpc('get_profit_waterfall', {
        p_start_date: startDate,
        p_end_date: endDate,
    })

    if (error) {
        console.error('Error fetching profit waterfall:', error)
        throw new Error(error.message)
    }
    return data
}

export const useProfitWaterfall = (dateRange: { from: Date; to: Date }) => {
    const fromISO = dateRange.from.toISOString()
    const toISO = dateRange.to.toISOString()

    return useSWR(['profit_waterfall', fromISO, toISO], () =>
        fetcher('profit_waterfall', fromISO, toISO),
    )
}
