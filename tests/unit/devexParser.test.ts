// @ts-nocheck

import assert from 'node:assert/strict'

// Simple local copy of the parser logic to avoid importing Deno edge deps
function parseRateFromHtml(html: string): number | null {
    const match = /100,000\s+Robux[\s\S]*?\$(\d{2,4}\.\d{2})/i.exec(html)
    if (!match) return null
    const usd = Number(match[1])
    if (Number.isNaN(usd) || usd <= 0) return null
    return +(usd / 100_000).toFixed(6)
}

const snippet =
    'Earn real money! 100,000 Robux equals $350.00 you can cash out via DevEx.'

const rate = parseRateFromHtml(snippet)

assert.ok(rate && Math.abs(rate - 0.0035) < 1e-6)
