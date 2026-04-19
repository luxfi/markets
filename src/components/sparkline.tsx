interface Props {
  data: number[]
  width?: number
  height?: number
  positive?: boolean
}

export function Sparkline({ data, width = 100, height = 32, positive = true }: Props) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={positive ? 'var(--positive)' : 'var(--negative)'}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  )
}
