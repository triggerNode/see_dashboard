// @ts-nocheck
import assert from 'node:assert/strict'

import handler from '../../pages/api/devex/latest'

// Simple mock for ServerResponse with fluent API
function createMockRes() {
    const res: any = {}
    res.statusCode = 200
    res.status = (code: number) => {
        res.statusCode = code
        return res
    }
    res.jsonData = null
    res.json = (data: any) => {
        res.jsonData = data
        return res
    }
    return res
}

await (async () => {
    const res = createMockRes()

    await handler({} as any, res)

    assert.equal(res.statusCode, 200)
    assert.ok(res.jsonData && typeof res.jsonData.rate === 'number')
    assert.ok('fetched_at' in res.jsonData)
})()
