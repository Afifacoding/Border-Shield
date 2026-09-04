const services = [
  { name: 'AI Engine', ok: true, latency: '42 ms' },
  { name: 'OCR', ok: true, latency: '118 ms' },
  { name: 'Face Verification', ok: true, latency: '210 ms' },
  { name: 'Evidence Ledger', ok: true, latency: 'block 184221' },
]

export function SystemStatus() {
  return (
    <section aria-label="System status" className="flex flex-col gap-3 rounded-xl border border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">System Status</span>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
        {services.map((s) => (
          <li key={s.name} className="flex items-center gap-2 text-sm">
            <span aria-hidden className={s.ok ? 'size-2 rounded-full bg-success' : 'size-2 rounded-full bg-destructive'} />
            <span>{s.name}</span>
            <span className="sr-only">{s.ok ? 'operational' : 'degraded'}</span>
            <span className="hidden font-mono text-xs text-muted-foreground md:inline">{s.latency}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
