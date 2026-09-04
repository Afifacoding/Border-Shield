import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import type { ScreeningResult } from '@/lib/result'

function MetricCard({ label, value, status }: { label: string; value: string | number; status?: 'success' | 'warning' | 'destructive' }) {
  const statusColor = {
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  }[status ?? 'success']

  return (
    <Card className="gap-0">
      <CardContent className="flex flex-col gap-2 p-5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
        <span className={cn('font-mono text-2xl font-semibold tracking-tight tabular-nums', statusColor)}>{value}</span>
      </CardContent>
    </Card>
  )
}

export function SummaryMetrics({ result }: { result: ScreeningResult }) {
  const watchStatus = result.watchlist === 'Clear' ? 'success' : result.watchlist === 'Match' ? 'destructive' : 'warning'
  const authStatus = result.authenticity >= 85 ? 'success' : result.authenticity >= 60 ? 'warning' : 'destructive'
  const idStatus = result.identityMatch >= 85 ? 'success' : result.identityMatch >= 60 ? 'warning' : 'destructive'
  const mrzStatus = result.mrzConsistent ? 'success' : 'destructive'

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard label="Document Authenticity" value={`${result.authenticity}%`} status={authStatus} />
      <MetricCard label="Identity Match" value={`${result.identityMatch}%`} status={idStatus} />
      <MetricCard label="MRZ Status" value={result.mrzConsistent ? 'Valid' : 'Failed'} status={mrzStatus} />
      <MetricCard label="Watchlist Status" value={result.watchlist} status={watchStatus} />
    </div>
  )
}
