import useSWR from 'swr'
import { supabase } from '@/lib/supabaseClient'
import type { LeaderboardRow } from '@/types/api'

// Mock data for testing until database function is available
const mockLeaderboardData: LeaderboardRow[] = [
    {
        roblox_item_id: 1001,
        item_name: 'Premium Sword',
        net_usd_profit: 5.25,
        units_sold: 3,
    },
    {
        roblox_item_id: 1004,
        item_name: 'Legendary Armor',
        net_usd_profit: 2.8,
        units_sold: 1,
    },
    {
        roblox_item_id: 1002,
        item_name: 'Magic Shield',
        net_usd_profit: 2.45,
        units_sold: 2,
    },
    {
        roblox_item_id: 1005,
        item_name: 'Speed Boots',
        net_usd_profit: 0.875,
        units_sold: 1,
    },
    {
        roblox_item_id: 1003,
        item_name: 'Power Potion',
        net_usd_profit: 1.05,
        units_sold: 2,
    },
    {
        roblox_item_id: 1006,
        item_name: 'Health Elixir',
        net_usd_profit: 0.35,
        units_sold: 1,
    },
]

const fetcher = async (
    key: string, // 'profit_leaderboard'
    startDate: string,
    endDate: string,
) => {
    // Try to call the real function first
    try {
        const { data, error } = await supabase.rpc('get_profit_leaderboard', {
            start_date: startDate,
            end_date: endDate,
        })

        if (error) {
            console.warn(
                'Database function not available, using mock data:',
                error.message,
            )
            // Return mock data if function doesn't exist
            return mockLeaderboardData.sort(
                (a, b) => b.net_usd_profit - a.net_usd_profit,
            )
        }
        return data as LeaderboardRow[]
    } catch (error) {
        console.warn('Database function not available, using mock data:', error)
        // Return mock data if function doesn't exist
        return mockLeaderboardData.sort(
            (a, b) => b.net_usd_profit - a.net_usd_profit,
        )
    }
}

export const useProfitLeaderboard = (dateRange: { from: Date; to: Date }) => {
    const fromISO = dateRange.from.toISOString()
    const toISO = dateRange.to.toISOString()

    return useSWR(['profit_leaderboard', fromISO, toISO], () =>
        fetcher('profit_leaderboard', fromISO, toISO),
    )
}
