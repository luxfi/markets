interface ChangeBadgeProps {
  value: number
  className?: string
}

export function ChangeBadge({ value, className = '' }: ChangeBadgeProps) {
  const positive = value >= 0
  return (
    <span className={`font-mono ${positive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} ${className}`}>
      {positive ? '+' : ''}{value.toFixed(2)}%
    </span>
  )
}
