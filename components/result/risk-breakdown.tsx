import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ScreeningResult } from '@/lib/result'

function scoreTone(v: number) {
  if (v >= 85) return 'text-success'
  if (v >= 60) return 'text-warning'
  return 'text-destructive'
}

function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
    >
      <div className={cn('h-full rounded-full transition-[width] duration-700', className)} style={{ width: `${value}%` }} />
    </div>
  )
}

export function RiskBreakdown({ result }: { result: ScreeningResult }) {
  const watchTone =
    result.watchlist === 'Clear' ? 'text-success' : result.watchlist === 'Match' ? 'text-destructive' : 'text-warning'
  const watchBar =
    result.watchlist === 'Clear' ? 'bg-success' : result.watchlist === 'Match' ? 'bg-destructive' : 'bg-warning'

  const cards = [
    {
      title: 'Document Authenticity',
      description: 'Visual forensics, MRZ, security features',
      value: `${result.authenticity}%`,
      meter: result.authenticity,
      tone: scoreTone(result.authenticity),
      bar: result.authenticity >= 85 ? 'bg-success' : result.authenticity >= 60 ? 'bg-warning' : 'bg-destructive',
    },
    {
      title: 'Identity Match',
      description: 'Face verification against live capture',
      value: `${result.identityMatch}%`,
      meter: result.identityMatch,
      tone: scoreTone(result.identityMatch),
      bar: result.identityMatch >= 85 ? 'bg-success' : result.identityMatch >= 60 ? 'bg-warning' : 'bg-destructive',
    },
    {
      title: 'Watchlist Status',
      description: 'Screened against 4 connected lists',
      value: result.watchlist,
      meter: result.watchlist === 'Clear' ? 100 : result.watchlist === 'Match' ? 100 : 60,
      tone: watchTone,
      bar: watchBar,
    },
  ]

  return (
    <section id="risk-breakdown" aria-labelledby="risk-breakdown-title" className="flex flex-col gap-4 scroll-mt-24">
      <h2 id="risk-breakdown-title" className="text-lg font-medium tracking-tight">
        Risk Breakdown
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className={cn('text-3xl font-semibold tracking-tight tabular-nums', c.tone)}>{c.value}</p>
              <Meter value={c.meter} className={c.bar} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
