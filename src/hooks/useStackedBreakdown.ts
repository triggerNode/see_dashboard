import useSWR from 'swr'
import { supabase } from '@/lib/supabaseClient'

// Define the type for the data returned by our new SQL function
export interface StackedBreakdownData {
    net_robux_share: number
    fee_robux_share: number
}

const fetcher = async (key: string, startDate: string, endDate: string) => {
    const { data, error } = await supabase.rpc('get_stacked_profit_breakdown', {
        p_start_date: startDate,
        p_end_date: endDate,
    })

    if (error) {
        console.error('Error fetching stacked breakdown:', error)
        throw new Error(error.message)
    }
    // The RPC call for a function returning a single row returns an object, not an array
    return data[0] as StackedBreakdownData
}

export const useStackedBreakdown = (dateRange: { from: Date; to: Date }) => {
    const fromISO = dateRange.from.toISOString()
    const toISO = dateRange.to.toISOString()

    return useSWR(['stacked_breakdown', fromISO, toISO], () =>
        fetcher('stacked_breakdown', fromISO, toISO),
    )
}
