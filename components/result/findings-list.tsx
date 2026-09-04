'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Finding } from '@/lib/data'

export function FindingsList({
  findings,
  selectedFinding,
  onSelectFinding,
}: {
  findings: Finding[]
  selectedFinding: string | null
  onSelectFinding: (id: string | null) => void
}) {
  if (findings.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card/50 p-8 text-center">
        <p className="text-sm text-muted-foreground">No findings detected. Document appears authentic.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {findings.map((finding) => {
        const isExpanded = selectedFinding === finding.id
        const severityColor =
          finding.severity === 'high'
            ? 'text-destructive border-destructive/20 bg-destructive/5'
            : 'text-warning border-warning/20 bg-warning/5'

        return (
          <button
            key={finding.id}
            onClick={() => onSelectFinding(isExpanded ? null : finding.id)}
            className={cn(
              'w-full text-left rounded-lg border bg-card p-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isExpanded ? severityColor + ' border-solid' : 'border-border hover:border-border/60',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium tracking-tight flex items-center gap-2">
                  {finding.title}
                  <span className="text-xs font-semibold opacity-70">
                    {finding.confidence}%
                  </span>
                </h3>
                {isExpanded && (
                  <div className="mt-3 flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">{finding.summary}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase">Evidence</p>
                      <ul className="text-sm space-y-1">
                        {finding.evidence.map((e, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-muted-foreground/60">•</span>
                            <span className="text-muted-foreground">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <ChevronDown
                className={cn('size-5 shrink-0 text-muted-foreground transition-transform mt-0.5', isExpanded && 'rotate-180')}
                aria-hidden
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
