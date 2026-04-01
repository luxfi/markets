interface StatCardProps {
  label: string
  value: string
  sub?: string
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
      <div className="text-sm text-[var(--muted)] mb-1">{label}</div>
      <div className="text-2xl font-bold font-mono">{value}</div>
      {sub && <div className="text-sm text-[var(--muted)]">{sub}</div>}
    </div>
  )
}
