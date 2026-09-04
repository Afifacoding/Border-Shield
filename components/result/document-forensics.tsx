'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Finding } from '@/lib/data'

export function DocumentForensics({
  findings,
  selectedFinding,
  onSelectFinding,
  demoImageFile,
}: {
  findings: Finding[]
  selectedFinding: string | null
  onSelectFinding: (id: string | null) => void
  demoImageFile?: string
}) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const selectedFindingData = findings.find((f) => f.id === selectedFinding)
  const imageSource = demoImageFile ? `/dataset/${demoImageFile}` : '/images/passport-sample.png'

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Document Image with Overlay */}
      <div className="lg:col-span-2">
        <figure className="relative overflow-hidden rounded-xl border border-border bg-card aspect-[8.5/10] flex items-center justify-center">
          <Image
            src={imageSource}
            alt="Document for forensic analysis"
            width={1200}
            height={840}
            priority
            className="h-full w-auto object-cover"
          />

          {/* Overlay SVG for regions */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            style={{ pointerEvents: 'auto' }}
          >
            {findings
              .filter((f) => f.region.w > 0 && f.region.h > 0) // Only show regions with valid dimensions
              .map((finding) => {
                const isSelected = selectedFinding === finding.id
                const isHovered = hoveredRegion === finding.id
                const severityOpacity = finding.severity === 'high' ? 0.15 : 0.1
                const borderOpacity = finding.severity === 'high' ? 0.6 : 0.4
                const color = finding.severity === 'high' ? '#ef4444' : '#eab308'

                return (
                  <g key={finding.id}>
                    {/* Background rect for clickability */}
                    <rect
                      x={finding.region.x}
                      y={finding.region.y}
                      width={finding.region.w}
                      height={finding.region.h}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredRegion(finding.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => onSelectFinding(isSelected ? null : finding.id)}
                    />
                    {/* Highlight rect */}
                    <rect
                      x={finding.region.x}
                      y={finding.region.y}
                      width={finding.region.w}
                      height={finding.region.h}
                      fill={color}
                      fillOpacity={isSelected || isHovered ? severityOpacity + 0.1 : severityOpacity}
                      stroke={color}
                      strokeWidth={0.5}
                      strokeOpacity={isSelected || isHovered ? borderOpacity + 0.2 : borderOpacity}
                      style={{ transition: 'all 200ms' }}
                    />
                  </g>
                )
              })}
          </svg>

          <figcaption className="sr-only">Document preview with forensic highlights</figcaption>
        </figure>
      </div>

      {/* Finding Detail Panel */}
      <div className="lg:col-span-1">
        {selectedFindingData ? (
          <Card className="sticky top-24 border-border/60">
            <CardHeader>
              <CardTitle className="text-base">{selectedFindingData.title}</CardTitle>
              <CardDescription>Forensic Finding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Severity Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Severity</span>
                <span
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    selectedFindingData.severity === 'high'
                      ? 'bg-destructive/12 text-destructive'
                      : 'bg-warning/12 text-warning',
                  )}
                >
                  {selectedFindingData.severity === 'high' ? 'High' : 'Suspicious'}
                </span>
              </div>

              {/* Confidence */}
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">Confidence</span>
                <span className="font-mono text-lg font-semibold">{selectedFindingData.confidence}%</span>
              </div>

              {/* Summary */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Summary</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{selectedFindingData.summary}</p>
              </div>

              {/* Evidence List */}
              {selectedFindingData.evidence.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Evidence</p>
                  <ul className="space-y-1">
                    {selectedFindingData.evidence.map((e, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-muted-foreground/40 flex-shrink-0">•</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border-border/40 bg-card/40">
            <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-80">
              <p className="text-sm text-muted-foreground text-pretty">
                Click on highlighted regions in the document to view forensic findings.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
