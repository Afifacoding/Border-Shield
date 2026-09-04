'use client'

import { useEffect, useState } from 'react'
import { ShieldAlert, ShieldCheck, ShieldQuestion, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { ScreeningResult } from '@/lib/result'

const tone = {
  high: { text: 'text-destructive', ring: 'border-destructive/30', bg: 'bg-destructive/6', Icon: ShieldAlert },
  suspicious: { text: 'text-warning', ring: 'border-warning/30', bg: 'bg-warning/6', Icon: ShieldQuestion },
  verified: { text: 'text-success', ring: 'border-success/30', bg: 'bg-success/6', Icon: ShieldCheck },
}

export function ResultHeader({ result }: { result: ScreeningResult }) {
  const t = tone[result.level]
  const [score, setScore] = useState(0)

  // Count the risk score up once on mount.
  useEffect(() => {
    const target = result.screening.score
    const start = performance.now()
    const dur = 900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setScore(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [result.screening.score])

  function scrollToFindings() {
    document.querySelector('[data-section="findings"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function scrollToDecision() {
    document.querySelector('[data-section="decision"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section aria-labelledby="result-headline" className={cn('flex flex-col gap-8 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between md:p-10', t.ring, t.bg)}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <t.Icon className={cn('size-6', t.text)} aria-hidden />
          <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Screening <span className="font-mono">{result.screening.id}</span> · {result.screening.checkpoint}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h1 id="result-headline" className={cn('text-4xl font-semibold tracking-tight md:text-5xl', t.text)}>
            {result.headline}
          </h1>
          <p className="text-lg font-medium">
            Risk Score <span className="font-mono tabular-nums">{score}</span> <span className="text-muted-foreground">/ 100</span>
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{result.summary}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
        <Button size="lg" onClick={scrollToDecision}>
          {result.level === 'verified' ? 'Clear Traveler' : 'Refer for Secondary Inspection'}
        </Button>
        <Button size="lg" variant="outline" onClick={scrollToFindings}>
          View Findings
          <ArrowDown data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}
