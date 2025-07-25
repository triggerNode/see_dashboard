import { COLORS } from '@/constants/chart.constant'
import type { ApexOptions } from 'apexcharts'

export const apexLineChartDefaultOption: ApexOptions = {
    chart: {
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: [...COLORS],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 2.5,
        curve: 'smooth',
        lineCap: 'round',
    },
    legend: {
        itemMargin: {
            vertical: 10,
        },
        tooltipHoverFormatter: function (val, opts) {
            return (
                val +
                ' - ' +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ''
            )
        },
    },
    xaxis: {
        categories: [],
    },
}

export const apexAreaChartDefaultOption = {
    ...apexLineChartDefaultOption,
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.6,
            stops: [0, 70, 100],
        },
    },
}

export const apexBarChartDefaultOption: ApexOptions = {
    chart: {
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '35px',
            borderRadius: 4,
            borderRadiusApplication: 'end',
        },
    },
    colors: [...COLORS],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 1,
        curve: 'smooth',
        colors: ['transparent'],
    },
    legend: {
        itemMargin: {
            vertical: 10,
        },
        tooltipHoverFormatter: function (val, opts) {
            return (
                val +
                ' - ' +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ''
            )
        },
    },
    xaxis: {
        categories: [],
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: (val) => `${val}`,
        },
    },
}

export const apexDonutChartDefaultOption: ApexOptions = {
    colors: [...COLORS],
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: '',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce(
                                (a: string, b: string) => {
                                    return a + b
                                },
                                0,
                            )
                        },
                    },
                },
                size: '85%',
            },
        },
    },
    stroke: {
        colors: ['transparent'],
    },
    labels: [],
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
}

export const apexSparklineChartDefultOption: ApexOptions = {
    chart: {
        type: 'line',
        sparkline: {
            enabled: true,
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return ''
                },
            },
        },
        marker: {
            show: false,
        },
    },
}

export const apexRadarChartDefultOption: ApexOptions = {
    chart: {
        type: 'radar',
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: [...COLORS],
}

export const apexWaterfallChartDefaultOption: ApexOptions = {
    chart: {
        type: 'bar',
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4,
            borderRadiusApplication: 'end',
        },
    },
    colors: ['#10B981', '#EF4444', '#10B981'], // Emerald for positive, Red for negative, Emerald for final
    dataLabels: {
        enabled: true,
        formatter: function (val: number) {
            return `${(val / 1000).toFixed(1)}k`
        },
    },
    xaxis: {
        categories: [],
    },
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return `${(val / 1000).toFixed(0)}k R$`
            },
        },
    },
    grid: {
        show: false,
    },
    legend: {
        show: false,
    },
}
