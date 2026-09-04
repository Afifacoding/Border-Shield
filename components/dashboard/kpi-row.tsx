import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

const kpis = [
  { label: 'Documents Screened', value: '12,486', tone: 'text-foreground' },
  { label: 'Verified', value: '9,842', tone: 'text-success' },
  { label: 'Suspicious', value: '1,931', tone: 'text-warning' },
  { label: 'High Risk', value: '713', tone: 'text-destructive' },
]

export function KpiRow() {
  return (
    <section aria-label="Key metrics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="gap-0 py-0">
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{kpi.label}</span>
            <span className={cn('font-mono text-3xl font-semibold tracking-tight tabular-nums', kpi.tone)}>{kpi.value}</span>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
