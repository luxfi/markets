interface Props {
  label: string
  value: string
  sub?: string
}

export function StatCard({ label, value, sub }: Props) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {sub ? <div className="sub">{sub}</div> : null}
    </div>
  )
}
