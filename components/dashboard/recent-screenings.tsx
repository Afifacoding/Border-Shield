import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { SectionTitle } from '@/components/page-header'
import { RiskBadge } from '@/components/risk-badge'
import { screenings } from '@/lib/data'

export function RecentScreenings() {
  const latest = screenings.slice(0, 5)
  return (
    <section aria-labelledby="recent-screenings" className="flex flex-col gap-4">
      <SectionTitle
        title="Recent Screenings"
        action={
          <LinkButton variant="ghost" size="sm" href="/screening/history">
            View All
            <ArrowRight data-icon="inline-end" />
          </LinkButton>
        }
      />
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {latest.map((s) => (
          <li key={s.id}>
            <Link
              href={`/screening/${s.id}`}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:outline-none"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium">{s.traveler}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {s.documentType} · <span className="font-mono">{s.id}</span> · {s.checkpoint}
                </span>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">{s.time}</span>
              <RiskBadge level={s.risk} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
