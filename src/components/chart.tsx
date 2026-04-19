import { useEffect, useRef } from 'react'
import { createChart, ColorType, type IChartApi } from 'lightweight-charts'
import type { PricePoint } from '../lib/types'

interface Props {
  data: PricePoint[]
  color?: string
  height?: number
}

export function Chart({ data, color = '#f5f5f5', height = 320 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(245,245,245,0.55)',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.06)' },
        horzLines: { color: 'rgba(255,255,255,0.06)' },
      },
      width: containerRef.current.clientWidth,
      height,
      crosshair: { mode: 0 },
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.08)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.08)' },
    })

    const series = chart.addAreaSeries({
      lineColor: color,
      topColor: 'rgba(245,245,245,0.18)',
      bottomColor: 'rgba(245,245,245,0)',
      lineWidth: 2,
    })

    series.setData(data)
    chart.timeScale().fitContent()
    chartRef.current = chart

    const onResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth })
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      chart.remove()
    }
  }, [data, color, height])

  return <div ref={containerRef} />
}
