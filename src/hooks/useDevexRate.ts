import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useDevexRate() {
    const { data, error } = useSWR('/api/devex/latest', fetcher, {
        refreshInterval: 600000, // 10 min
    })

    return {
        rate: data?.rate ?? 0.0035,
        loading: !data && !error,
        fetchedAt: data?.fetched_at as string | undefined,
    }
}
