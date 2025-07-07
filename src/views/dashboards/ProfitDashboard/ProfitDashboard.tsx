import React, { useState, useRef, useEffect } from 'react'
import Card from '@/components/ui/Card/Card'
import Select from '@/components/ui/Select'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import Chart from '@/components/shared/Chart'
import {
    TbCoin,
    TbShoppingBagCheck,
    TbScissors,
    TbSpeakerphone,
    TbAward,
} from 'react-icons/tb'
import { useTrueProfit } from '@/hooks/useTrueProfit'
import { NumericFormat } from 'react-number-format'
import DataTable from '@/components/shared/DataTable'
import Progress from '@/components/ui/Progress/Progress'
import type { CellContext } from '@tanstack/react-table'
import Input from '@/components/ui/Input/Input'
import Spinner from '@/components/ui/Spinner/Spinner'
import { useProfitLeaderboard } from '@/hooks/useProfitLeaderboard'
import type { LeaderboardRow } from '@/types/api'

const periodOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Annually', value: 'annually' },
]

interface OverviewData {
    totalProfit: {
        value: number
        growShrink: number
        comparePeriod: string
        chartData: {
            series: { data: number[] }[]
            date: string[]
        }
    }
    totalOrder: {
        value: number
        growShrink: number
        comparePeriod: string
        chartData: {
            series: { data: number[] }[]
            date: string[]
        }
    }
}

type LeaderboardRowWithPercent = LeaderboardRow & { percent: number }

const Overview = ({ data }: { data: OverviewData }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly')
    const sideNavCollapse = false // not used here
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (!sideNavCollapse && isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (!isFirstRender.current) {
            window.dispatchEvent(new Event('resize'))
        }
    }, [sideNavCollapse])

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Net Profit (USD)</h4>
                <Select
                    className="w-[120px]"
                    size="sm"
                    placeholder="Select period"
                    value={periodOptions.find(
                        (option) => option.value === selectedPeriod,
                    )}
                    options={periodOptions}
                    isSearchable={false}
                    onChange={(option) =>
                        option?.value && setSelectedPeriod(option.value)
                    }
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-6 items-center">
                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-xl">
                            <TbCoin className="text-gray-800" />
                        </span>
                        <div>
                            <div className="font-medium text-gray-700">
                                Total Profit (USD)
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-1 mb-2">
                                <NumericFormat
                                    displayType="text"
                                    value={data.totalProfit.value}
                                    prefix={'$'}
                                    thousandSeparator={true}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-green-600 font-bold text-lg">
                                    <GrowShrinkValue
                                        className="font-bold text-lg"
                                        value={data.totalProfit.growShrink}
                                        suffix="%"
                                        positiveIcon="+"
                                        negativeIcon=""
                                    />
                                </span>
                                <span className="text-gray-400 text-sm mt-1">
                                    {data.totalProfit.comparePeriod}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-xl">
                            <TbShoppingBagCheck className="text-emerald-500" />
                        </span>
                        <div>
                            <div className="font-medium text-gray-700">
                                Total Order (Robux)
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-1 mb-2">
                                <NumericFormat
                                    displayType="text"
                                    value={data.totalOrder.value}
                                    thousandSeparator={true}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-red-500 font-bold text-lg">
                                    <GrowShrinkValue
                                        className="font-bold text-lg"
                                        value={data.totalOrder.growShrink}
                                        suffix="%"
                                        positiveIcon="+"
                                        negativeIcon=""
                                    />
                                </span>
                                <span className="text-gray-400 text-sm mt-1">
                                    {data.totalOrder.comparePeriod}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <Chart
                        type="line"
                        series={data.totalProfit.chartData.series}
                        xAxis={data.totalProfit.chartData.date}
                        height="260px"
                        customOptions={{
                            legend: { show: false },
                            colors: ['#14b8a6'], // match accent color from breakdown card
                            chart: { toolbar: { show: false } },
                            xaxis: {
                                labels: {
                                    rotate: -30,
                                    hideOverlappingLabels: true,
                                    style: { fontSize: '12px' },
                                },
                                tickAmount: 8,
                            },
                            grid: {
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </Card>
    )
}

const profitBreakdownItems = [
    {
        label: 'Gross Revenue (USD)',
        value: 100,
        color: 'bg-gray-800',
        icon: <TbCoin className="text-gray-800" />,
    },
    {
        label: 'Roblox Platform Cut',
        value: 30,
        color: 'bg-gray-400',
        icon: <TbScissors className="text-gray-500" />,
    },
    {
        label: 'Ad Spend',
        value: 25,
        color: 'bg-gray-400',
        icon: <TbSpeakerphone className="text-gray-500" />,
    },
    {
        label: 'True Net USD Profit',
        value: 60,
        color: 'bg-teal-400',
        icon: <TbAward className="text-teal-500" />,
    },
]

const ProfitDashboard = () => {
    // For now, use a fixed date range for demo
    const dateRange = {
        from: new Date('2024-01-01T00:00:00Z'),
        to: new Date('2024-01-31T23:59:59Z'),
    }
    // Simulate data for the Overview card (replace with real hooks as needed)
    const { data: profitSummary, isLoading: isProfitLoading } =
        useTrueProfit(dateRange)
    // Integrate leaderboard hook
    const { data: leaderboardRaw, isLoading: isLeaderboardLoading } =
        useProfitLeaderboard(dateRange)

    // Compose the data structure expected by Overview
    const overviewData = profitSummary
        ? {
              totalProfit: {
                  value: profitSummary.trueNetUSDProfit,
                  growShrink: profitSummary.vsPreviousPeriodChange,
                  comparePeriod: 'vs. Previous Period',
                  chartData: {
                      series: [
                          {
                              data:
                                  profitSummary.sparklineData?.map(
                                      (d) => d.profit,
                                  ) || [],
                          },
                      ],
                      date:
                          profitSummary.sparklineData?.map((d) => d.date) || [],
                  },
              },
              totalOrder: {
                  value: 0, // Placeholder, update with real value if available
                  growShrink: 0, // Placeholder
                  comparePeriod: 'vs. Previous Period',
                  chartData: {
                      series: [
                          {
                              data: [], // Placeholder
                          },
                      ],
                      date: [],
                  },
              },
          }
        : null

    // Calculate percent of total profit for each leaderboard row
    let leaderboardData: LeaderboardRowWithPercent[] = []
    if (leaderboardRaw && leaderboardRaw.length > 0) {
        const totalProfit = leaderboardRaw.reduce(
            (sum: number, row: LeaderboardRow) => sum + row.net_usd_profit,
            0,
        )
        leaderboardData = leaderboardRaw.map((row: LeaderboardRow) => ({
            ...row,
            percent:
                totalProfit > 0 ? (row.net_usd_profit / totalProfit) * 100 : 0,
        }))
    }

    // Refactored columns to match dynamic data
    const leaderboardColumns = [
        {
            header: 'Item',
            accessorKey: 'item_name',
            cell: (info: CellContext<LeaderboardRowWithPercent, unknown>) => (
                <div className="flex items-center gap-2">
                    <span className="inline-block w-6 h-6 rounded bg-gray-200" />
                    <span className="font-medium text-gray-800">
                        {info.getValue() as string}
                    </span>
                </div>
            ),
        },
        {
            header: 'True Net USD Profit',
            accessorKey: 'net_usd_profit',
            cell: (info: CellContext<LeaderboardRowWithPercent, unknown>) => (
                <div>
                    <span className="font-semibold text-emerald-600">
                        $
                        {Number(info.getValue()).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                    <Progress
                        percent={info.row.original.percent}
                        customColorClass="bg-emerald-400"
                        size="sm"
                        showInfo={false}
                    />
                </div>
            ),
            sortingFn: (
                a: { original: LeaderboardRowWithPercent },
                b: { original: LeaderboardRowWithPercent },
            ) => a.original.net_usd_profit - b.original.net_usd_profit,
        },
        {
            header: 'Units Sold',
            accessorKey: 'units_sold',
            cell: (info: CellContext<LeaderboardRowWithPercent, unknown>) => (
                <span className="font-medium text-gray-700">
                    {info.getValue() as number}
                </span>
            ),
            sortingFn: (
                a: { original: LeaderboardRowWithPercent },
                b: { original: LeaderboardRowWithPercent },
            ) => a.original.units_sold - b.original.units_sold,
        },
        {
            header: '% of Total',
            accessorKey: 'percent',
            cell: (info: CellContext<LeaderboardRowWithPercent, unknown>) => (
                <span className="inline-block px-2 py-1 rounded-full bg-blue-50 text-blue-500 text-xs font-semibold">
                    {(info.getValue() as number).toFixed(1)}%
                </span>
            ),
            sortingFn: (
                a: { original: LeaderboardRowWithPercent },
                b: { original: LeaderboardRowWithPercent },
            ) => a.original.percent - b.original.percent,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
                <p className="text-gray-500 mb-6">
                    Professional analytics for data-driven decisions
                </p>
            </div>
            {/* Main Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (spans 2 columns on large screens) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Overview Card (KPI) */}
                    {isProfitLoading || !overviewData ? (
                        <Card>
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                <Spinner size={40} />
                            </div>
                        </Card>
                    ) : (
                        <Overview data={overviewData} />
                    )}
                    {/* Leaderboard Card */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold">
                                Profitability Leaderboard
                            </h4>
                            <button className="px-3 py-1.5 rounded border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition">
                                Export CSV
                            </button>
                        </div>
                        {isLeaderboardLoading ? (
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                <Spinner size={40} />
                            </div>
                        ) : (
                            <DataTable
                                columns={leaderboardColumns}
                                data={leaderboardData}
                                compact
                                hoverable
                            />
                        )}
                    </Card>
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    {/* Profit Breakdown Card */}
                    <Card>
                        <h4 className="mb-4 text-lg font-semibold">
                            Profit Breakdown
                        </h4>
                        <div className="flex flex-col gap-4">
                            {profitBreakdownItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3"
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="w-48 font-medium">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                            {profitBreakdownItems.map((item) => (
                                <div
                                    key={item.label + '-bar'}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                        <div
                                            className={`${item.color} h-4 rounded-full`}
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    {/* Ad Spend ROI Card */}
                    <Card>
                        <h4 className="mb-4 text-lg font-semibold flex items-center gap-2">
                            <TbCoin className="text-blue-500" /> Ad Spend ROI
                        </h4>
                        <div className="mb-4">
                            <label
                                htmlFor="robux-ad-spend"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Enter Robux Ad Spend:
                            </label>
                            <Input
                                id="robux-ad-spend"
                                type="number"
                                placeholder="Enter amount"
                                className="w-full"
                                prefix={
                                    <span className="text-blue-500 font-bold">
                                        R$
                                    </span>
                                }
                            />
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="rounded-full flex items-center justify-center h-12 w-12 text-xl text-gray-900 bg-sky-200">
                                        <TbCoin />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="font-bold mb-1">
                                            $4,150.75
                                        </h6>
                                        <div className="text-xs">
                                            Net Profit
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="rounded-full flex items-center justify-center h-12 w-12 text-xl text-gray-900 bg-emerald-200">
                                        <TbCoin />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="font-bold mb-1">
                                            $350.10
                                        </h6>
                                        <div className="text-xs">
                                            Profit Uplift
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="rounded-full flex items-center justify-center h-12 w-12 text-xl text-gray-900 bg-orange-200">
                                        <TbCoin />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="font-bold mb-1">
                                            +200.1%
                                        </h6>
                                        <div className="text-xs">ROI</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProfitDashboard
