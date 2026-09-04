'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { metadata, mrz, watchlist } from '@/lib/data'
import type { ScreeningResult } from '@/lib/result'

export function AdvancedAnalysis({ result }: { result: ScreeningResult }) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    const newOpen = new Set(openSections)
    if (newOpen.has(sectionId)) {
      newOpen.delete(sectionId)
    } else {
      newOpen.add(sectionId)
    }
    setOpenSections(newOpen)
  }

  const isOpen = (sectionId: string) => openSections.has(sectionId)

  return (
    <div className="space-y-4">
      {/* MRZ Analysis */}
      <Collapsible open={isOpen('mrz')} onOpenChange={() => toggleSection('mrz')}>
        <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border border-border bg-card p-5 hover:bg-card/80 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="flex items-center gap-3">
              <h3 className="font-medium tracking-tight">MRZ Analysis</h3>
              <p className="text-xs text-muted-foreground">Machine Readable Zone validation</p>
            </div>
            <ChevronDown className={cn('size-5 text-muted-foreground transition-transform', isOpen('mrz') && 'rotate-180')} aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-4">
          {/* MRZ Lines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">MRZ Lines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs bg-muted/30 p-3 rounded">
              {mrz.lines.map((line, i) => (
                <div key={i} className="text-foreground/70 break-all">
                  {line}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Parsed Values */}
          <div>
            <p className="text-sm font-medium mb-3">Parsed Values</p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60">
                    <TableHead className="font-medium text-foreground">Field</TableHead>
                    <TableHead className="font-medium text-foreground">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mrz.parsed.map((item, i) => (
                    <TableRow key={i} className="border-border/40">
                      <TableCell className="font-medium text-sm">{item.label}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Check Digits */}
          <div>
            <p className="text-sm font-medium mb-3">Check Digits</p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60">
                    <TableHead className="font-medium text-foreground">Field</TableHead>
                    <TableHead className="text-center font-medium text-foreground">Expected</TableHead>
                    <TableHead className="text-center font-medium text-foreground">Read</TableHead>
                    <TableHead className="text-right font-medium text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mrz.checkDigits.map((item, i) => (
                    <TableRow key={i} className={cn('border-border/40', !item.ok && 'bg-destructive/5')}>
                      <TableCell className="font-medium text-sm">{item.label}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{item.expected}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{item.read}</TableCell>
                      <TableCell className="text-right">
                        <span className={cn('text-sm font-medium', item.ok ? 'text-success' : 'text-destructive')}>
                          {item.ok ? '✓' : '✗'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Face Verification */}
      <Collapsible open={isOpen('face')} onOpenChange={() => toggleSection('face')}>
        <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border border-border bg-card p-5 hover:bg-card/80 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="flex items-center gap-3">
              <h3 className="font-medium tracking-tight">Face Verification</h3>
              <p className="text-xs text-muted-foreground">Biometric match analysis</p>
            </div>
            <ChevronDown className={cn('size-5 text-muted-foreground transition-transform', isOpen('face') && 'rotate-180')} aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Match Score</CardTitle>
              <CardDescription>Document photo vs live capture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Face Match Score</span>
                <span className={cn('font-mono text-2xl font-semibold', result.faceScore >= 85 ? 'text-success' : 'text-destructive')}>
                  {result.faceScore}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-700',
                    result.faceScore >= 85 ? 'bg-success' : 'bg-destructive',
                  )}
                  style={{ width: `${result.faceScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {result.faceScore >= 85
                  ? 'Faces match with high confidence. Biometric identity verified.'
                  : 'Significant mismatch detected. Possible identity impersonation.'}
              </p>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Metadata Forensics */}
      <Collapsible open={isOpen('metadata')} onOpenChange={() => toggleSection('metadata')}>
        <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border border-border bg-card p-5 hover:bg-card/80 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="flex items-center gap-3">
              <h3 className="font-medium tracking-tight">Metadata Forensics</h3>
              <p className="text-xs text-muted-foreground">File metadata analysis</p>
            </div>
            <ChevronDown className={cn('size-5 text-muted-foreground transition-transform', isOpen('metadata') && 'rotate-180')} aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-2">
            {metadata.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg border border-border bg-card p-3 flex items-center justify-between',
                  item.flag && 'border-warning/30 bg-warning/5',
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.value}</p>
                </div>
                {item.flag && (
                  <div className="size-2 rounded-full bg-warning flex-shrink-0" title="Potential tampering indicator" />
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Watchlist Screening */}
      <Collapsible open={isOpen('watchlist')} onOpenChange={() => toggleSection('watchlist')}>
        <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border border-border bg-card p-5 hover:bg-card/80 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="flex items-center gap-3">
              <h3 className="font-medium tracking-tight">Watchlist Screening</h3>
              <p className="text-xs text-muted-foreground">Identity verification status</p>
            </div>
            <ChevronDown className={cn('size-5 text-muted-foreground transition-transform', isOpen('watchlist') && 'rotate-180')} aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-3">
            {watchlist.map((entry) => (
              <Card key={entry.id} className={cn(entry.category === 'blacklisted' && 'border-destructive/30 bg-destructive/5')}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm">{entry.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{entry.reason}</CardDescription>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium flex-shrink-0',
                        entry.category === 'blacklisted'
                          ? 'bg-destructive/20 text-destructive'
                          : entry.category === 'duplicate'
                            ? 'bg-warning/20 text-warning'
                            : entry.category === 'suspicious'
                              ? 'bg-warning/20 text-warning'
                              : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {entry.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Document Number</span>
                    <span className="font-mono text-foreground">{entry.documentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality</span>
                    <span className="text-foreground">{entry.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source</span>
                    <span className="text-foreground">{entry.source}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
