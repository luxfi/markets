'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType, type IChartApi } from 'lightweight-charts'

interface ChartProps {
  data: { time: string; value: number }[]
  color?: string
  height?: number
}

export function Chart({ data, color = '#ffffff', height = 300 }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#888',
      },
      grid: {
        vertLines: { color: '#222' },
        horzLines: { color: '#222' },
      },
      width: containerRef.current.clientWidth,
      height,
      crosshair: { mode: 0 },
      rightPriceScale: { borderColor: '#222' },
      timeScale: { borderColor: '#222' },
    })

    const series = chart.addAreaSeries({
      lineColor: color,
      topColor: `${color}33`,
      bottomColor: 'transparent',
      lineWidth: 2,
    })

    series.setData(data)
    chart.timeScale().fitContent()
    chartRef.current = chart

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth })
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, color, height])

  return <div ref={containerRef} />
}
