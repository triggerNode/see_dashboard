// @ts-nocheck

import { IncomingMessage, ServerResponse } from 'http'
import { createClient } from '@supabase/supabase-js'

const FALLBACK_RATE = 0.0035

interface CachedRate {
    rate: number
    fetched_at: string
    expires: number
}

let cache: CachedRate | null = null

export default async function handler(
    _req: IncomingMessage,
    res: ServerResponse & {
        json?: (body: any) => void
        status?: (code: number) => any
    },
) {
    const now = Date.now()
    if (cache && cache.expires > now) {
        return res
            .status(200)
            .json({ rate: cache.rate, fetched_at: cache.fetched_at })
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL as string
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY as string

    if (!supabaseUrl || !supabaseAnonKey) {
        // Fallback to constant if env vars are not set
        return res
            .status(200)
            .json({ rate: FALLBACK_RATE, fetched_at: new Date().toISOString() })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
        },
    })

    try {
        const { data, error } = await supabase
            .from('devex_rates')
            .select('rate, fetched_at')
            .order('fetched_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error || !data) {
            throw error || new Error('No data')
        }

        cache = {
            rate: data.rate,
            fetched_at: data.fetched_at,
            expires: now + 10 * 60 * 1000, // 10 minutes
        }

        return res
            .status(200)
            .json({ rate: data.rate, fetched_at: data.fetched_at })
    } catch (err) {
        console.error('Error retrieving latest DevEx rate', err)
        return res
            .status(200)
            .json({ rate: FALLBACK_RATE, fetched_at: new Date().toISOString() })
    }
}
