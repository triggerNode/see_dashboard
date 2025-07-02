import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
    const { data, error } = await supabase
        .from('devex_rates')
        .select('rate,fetched_at')
        .order('fetched_at', { ascending: false })
        .limit(1)
        .single()

    if (error || !data) return res.status(500).json({ error })

    res.setHeader('Cache-Control', 's-maxage=600')
    res.status(200).json(data)
}
