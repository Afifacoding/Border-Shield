import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { SectionTitle } from '@/components/page-header'
import { RiskDot } from '@/components/risk-badge'
import { alerts } from '@/lib/data'

export function SecurityAlerts() {
  const latest = alerts.slice(0, 4)
  return (
    <section aria-labelledby="security-alerts" className="flex flex-col gap-4">
      <SectionTitle
        title="Security Alerts"
        action={
          <LinkButton variant="ghost" size="sm" href="/alerts">
            View All
            <ArrowRight data-icon="inline-end" />
          </LinkButton>
        }
      />
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {latest.map((a, i) => (
          <li key={a.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <Link
              href={`/screening/${a.screeningId}`}
              className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:outline-none"
            >
              <RiskDot level={a.severity} className="mt-1.5" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium">{a.reason}</span>
                <span className="truncate text-xs text-muted-foreground">
                  <span className="font-mono">{a.screeningId}</span> · {a.checkpoint}
                </span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
