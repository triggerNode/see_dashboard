import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

const SOURCE_URL =
    'https://en.help.roblox.com/hc/en-us/articles/203314410-Exchange-Robux-For-Real-Money-DevEx'
const FALLBACK_RATE = 0.0035

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Extract the USD value from the Roblox DevEx FAQ HTML and convert it to a
 * Robux-to-USD rate (USD per 1 Robux).
 */
export function parseRateFromHtml(html: string): number | null {
    // We look for the well-known sentence that contains the DevEx cash-out amount
    // e.g. "100,000 Robux = $350.00 USD" (Roblox changes this occasionally).
    const match = /100,000\s+Robux[\s\S]*?\$(\d{2,4}\.\d{2})/i.exec(html)
    if (!match) return null
    const usd = Number(match[1])
    if (Number.isNaN(usd) || usd <= 0) return null
    // 100 000 Robux … => divide by 100 000 to get USD per Robux.
    return +(usd / 100_000).toFixed(6)
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    // Prefer service-role key when available so the function can write.
    const supabaseKey =
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
        Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false,
        },
    })

    let rate = FALLBACK_RATE

    try {
        console.log('Fetching DevEx FAQ from:', SOURCE_URL)
        const response = await fetch(SOURCE_URL, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (compatible; SupabaseEdgeFunction/1.0; +https://supabase.com)',
            },
        })

        if (response.ok) {
            const html = await response.text()
            console.log('HTML fetched, parsing rate...')
            const parsed = parseRateFromHtml(html)
            if (parsed) {
                rate = parsed
                console.log('Successfully parsed rate:', rate)
            } else {
                console.log('Failed to parse rate from HTML, using fallback:', FALLBACK_RATE)
            }
        } else {
            console.error(
                'Failed to fetch DevEx FAQ',
                response.status,
                response.statusText,
            )
        }
    } catch (err) {
        console.error('Error fetching DevEx FAQ', err)
    }

    try {
        // Fetch the last stored rate (if any)
        const { data: last, error: lastError } = await supabase
            .from('devex_rates')
            .select('rate')
            .order('fetched_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (lastError) console.error('Error querying previous rate', lastError)

        // Insert the (possibly fallback) rate for today.
        const { error: insertError } = await supabase
            .from('devex_rates')
            .insert({
                rate,
                source_url: SOURCE_URL,
            })
        
        if (insertError) {
            console.error('Error inserting devex rate', insertError)
        } else {
            console.log('Successfully inserted new rate:', rate)
        }

        // Compare to previous and alert when changed
        if (last && last.rate !== rate) {
            console.warn(`DevEx rate changed from ${last.rate} -> ${rate}`)
            // Optional webhook notification – you can provide a URL via env var.
            const webhookUrl = Deno.env.get('DEVEX_RATE_WEBHOOK_URL')
            if (webhookUrl) {
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        previous: last.rate,
                        current: rate,
                    }),
                }).catch((e) => console.error('Webhook call failed', e))
            }
        }
    } catch (err) {
        console.error('Error storing devex rate', err)
    }

    return new Response(JSON.stringify({ success: true, rate, source_url: SOURCE_URL }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
})