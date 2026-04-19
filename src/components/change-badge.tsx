interface Props {
  value: number
  className?: string
}

export function ChangeBadge({ value, className = '' }: Props) {
  const positive = value >= 0
  return (
    <span className={`badge ${positive ? 'pos' : 'neg'} ${className}`.trim()}>
      {positive ? '+' : ''}{value.toFixed(2)}%
    </span>
  )
}
