'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Search, ShieldAlert, ShieldCheck } from 'lucide-react'
import { demoDocuments, getDemoResult } from '@/lib/demo-data'
import { PageHeader } from '@/components/page-header'
import { RiskBadge } from '@/components/risk-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type TravelRecord = {
  filename: string
  name: string
  nationality: string
  passport: string
  direction: 'Entering India' | 'Leaving India'
  origin: string
  destination: string
  flight: string
  travelDate: string
  status: string
  risk: 'verified' | 'high'
  reason: string
}

const travelRecords: TravelRecord[] = [
  { filename: 'realpassport.png', name: 'Aarav Mehta', nationality: 'India', passport: 'DEMO-IN-P48201', direction: 'Entering India', origin: 'Dubai', destination: 'Hyderabad', flight: 'AI 984', travelDate: '04 Sep 2026', status: 'Cleared', risk: 'verified', reason: 'No active indicators' },
  { filename: 'fakepassport.png', name: 'Riya Kapoor', nationality: 'India', passport: 'DEMO-IN-P48202', direction: 'Entering India', origin: 'Dubai', destination: 'Delhi', flight: 'EK 516', travelDate: '04 Sep 2026', status: 'Secondary inspection', risk: 'high', reason: 'Portrait and MRZ inconsistencies' },
  { filename: 'realvisa.png', name: 'Maya Srinivasan', nationality: 'India', passport: 'DEMO-IN-V48203', direction: 'Leaving India', origin: 'Mumbai', destination: 'Dubai', flight: '6E 1453', travelDate: '05 Sep 2026', status: 'Cleared', risk: 'verified', reason: 'No active indicators' },
  { filename: 'fakevisa.png', name: 'Kabir Rao', nationality: 'India', passport: 'DEMO-IN-V48204', direction: 'Leaving India', origin: 'Delhi', destination: 'London', flight: 'AI 111', travelDate: '05 Sep 2026', status: 'High risk review', risk: 'high', reason: 'Visual and field inconsistencies' },
]

function ControlledLabel() {
  return <p className="text-xs font-medium uppercase tracking-[.16em] text-primary">Controlled screening records</p>
}

export function TravelWatchlistPage() {
  const [query, setQuery] = useState('')
  const filtered = travelRecords.filter((record) => `${record.name} ${record.nationality} ${record.passport} ${record.origin} ${record.destination} ${record.flight} ${record.reason}`.toLowerCase().includes(query.toLowerCase()))

  return <><PageHeader title="Watchlist" description="Border and travel screening records for movements into and out of India." /><ControlledLabel /><Card><CardContent className="space-y-4 p-5"><div className="relative max-w-xl"><Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search traveller, route, passport, or flight" className="pl-9" /></div><p className="text-xs text-muted-foreground">All names, passport numbers, routes, and statuses are synthetic records.</p></CardContent></Card><div className="grid gap-4">{filtered.map((record) => <TravelWatchlistCard key={record.filename} record={record} />)}</div></>
}

function TravelWatchlistCard({ record }: { record: TravelRecord }) {
  const result = getDemoResult(record.filename)
  return <Card><CardContent className="p-5"><div className="flex flex-col gap-5 xl:flex-row xl:items-start"><div className="flex min-w-0 flex-1 gap-4"><Image src={`/dataset/${record.filename}`} alt="" width={96} height={72} className="h-18 w-24 shrink-0 rounded-lg border border-border object-cover" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-medium">{record.name}</h2><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">Demo Dataset</span></div><p className="mt-1 text-sm text-muted-foreground">{record.nationality} · <span className="font-mono">{record.passport}</span></p><p className="mt-2 flex items-center gap-2 text-sm font-medium"><span>{record.origin}</span><ArrowRight className="size-3.5 text-muted-foreground" /><span>{record.destination}</span><span className="text-muted-foreground">· {record.direction}</span></p></div></div><div className="grid gap-3 text-sm sm:grid-cols-2 xl:min-w-[360px] xl:grid-cols-3"><Info label="Flight" value={record.flight} /><Info label="Travel date" value={record.travelDate} /><Info label="Status" value={record.status} /><Info label="Risk" value={<RiskBadge level={record.risk} />} /><Info label="Reason" value={record.reason} /><Info label="Document" value={result?.screening.documentType ?? 'Document'} /></div></div></CardContent></Card>
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return <div><p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p><div className="mt-1 text-sm">{value}</div></div>
}

export function TravelIntelligencePage() {
  const [selectedFilename, setSelectedFilename] = useState('realpassport.png')
  const selected = travelRecords.find((record) => record.filename === selectedFilename) ?? travelRecords[0]
  const result = getDemoResult(selected.filename)
  const ocrConfidence = result?.result.ocr.length ? Math.round(result.result.ocr.reduce((sum, field) => sum + field.confidence, 0) / result.result.ocr.length) : 0

  return <><PageHeader title="Identity Intelligence" description="Review traveller context, document checks, and route history from the current screening set." /><ControlledLabel /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{travelRecords.map((record) => <button key={record.filename} type="button" onClick={() => setSelectedFilename(record.filename)} className={cn('rounded-xl border bg-card p-3 text-left transition-colors', selected.filename === record.filename ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent')}><div className="flex items-center gap-3"><Image src={`/dataset/${record.filename}`} alt="" width={48} height={40} className="h-10 w-12 rounded object-cover" /><div className="min-w-0"><p className="truncate text-sm font-medium">{record.name}</p><p className="text-xs text-muted-foreground">{record.direction}</p></div></div></button>)}</div>{result && <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><Card><CardHeader><CardTitle>Traveller Profile</CardTitle><CardDescription>{selected.name} · {selected.passport}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><Info label="Nationality" value={selected.nationality} /><Info label="Document type" value={result.screening.documentType} /><Info label="Verification status" value={<span className="flex items-center gap-1.5 text-success"><ShieldCheck className="size-4" />{result.result.headline}</span>} /><Info label="Risk score" value={<RiskBadge level={result.result.level} />} /><Info label="Face verification" value={<span className={result.result.faceScore >= 85 ? 'text-success' : 'text-warning'}>{result.result.faceScore}% match</span>} /><Info label="OCR confidence" value={`${ocrConfidence}% average`} /><Info label="MRZ validation" value={<span className={result.result.mrzConsistent ? 'text-success' : 'text-destructive'}>{result.result.mrzConsistent ? 'Passed' : 'Failed'}</span>} /><Info label="Previous screenings" value="3 related records" /></div><div className="rounded-lg border border-border/60 p-4"><p className="text-xs uppercase tracking-wide text-muted-foreground">Travel context</p><p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium">{selected.origin}<ArrowRight className="size-3.5 text-muted-foreground" />{selected.destination}<span className="text-muted-foreground">· {selected.direction}</span></p><p className="mt-1 text-sm text-muted-foreground">Flight {selected.flight} · {selected.travelDate}</p></div></CardContent></Card><Card><CardHeader><CardTitle>Risk Indicators</CardTitle><CardDescription>Current screening signals for this profile.</CardDescription></CardHeader><CardContent className="space-y-3">{(result.result.findings.length ? result.result.findings.slice(0, 4).map((finding) => finding.title) : ['OCR fields consistent', 'MRZ check digits valid', 'Document metadata clear', 'No duplicate indicator']).map((indicator) => <div key={indicator} className="flex items-start gap-2 rounded-lg border border-border/60 p-3 text-sm">{result.result.findings.length ? <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" /> : <Check className="mt-0.5 size-4 shrink-0 text-success" />}<span>{indicator}</span></div>)}<Button variant="outline" nativeButton={false} render={<Link href={`/screening/${encodeURIComponent(`demo:${selected.filename}`)}`} />}>Open Screening Result</Button></CardContent></Card></div>}</>
}
