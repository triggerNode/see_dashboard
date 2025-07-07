import useSWR from 'swr'
import { supabase } from '@/lib/supabaseClient'
import type { TrueProfitSummary } from '@/types/api'

const fetcher = async (
    key: string, // 'true_profit'
    startDate: string,
    endDate: string,
) => {
    const { data, error } = await supabase.rpc('get_true_profit_summary', {
        start_date: startDate,
        end_date: endDate,
    })

    if (error) {
        console.error('Error fetching true profit summary:', error)
        throw new Error(error.message)
    }
    return data as TrueProfitSummary
}

export const useTrueProfit = (dateRange: { from: Date; to: Date }) => {
    const fromISO = dateRange.from.toISOString()
    const toISO = dateRange.to.toISOString()

    return useSWR(['true_profit', fromISO, toISO], () =>
        fetcher('true_profit', fromISO, toISO),
    )
}
