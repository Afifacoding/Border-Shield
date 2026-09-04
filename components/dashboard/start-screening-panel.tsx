'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PlayCircle, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/link-button'
import { demoDocuments } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export function StartScreeningPanel() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <section aria-labelledby="start-screening-title" className="flex flex-col gap-6 rounded-xl border border-primary/25 bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex max-w-xl flex-col gap-2">
          <h2 id="start-screening-title" className="text-xl font-medium tracking-tight">Start a New Screening</h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">Analyze a passport or visa for authenticity and identity inconsistencies.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <LinkButton size="lg" href="/screening/new"><Upload data-icon="inline-start" />Upload Document</LinkButton>
          <Button size="lg" variant="outline" onClick={() => setOpen(true)}><PlayCircle data-icon="inline-start" />Use Demo Document</Button>
        </div>
      </section>
      {open && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm"><div className="my-4 w-full max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-primary">Controlled samples</p><h2 className="mt-2 text-2xl font-semibold">Choose a document</h2><p className="mt-1 text-sm text-muted-foreground">Select one of the four local samples.</p></div><Button size="icon" variant="ghost" aria-label="Close document selector" onClick={() => setOpen(false)}><X /></Button></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{demoDocuments.map((document) => <button key={document.filename} type="button" onClick={() => setSelected(document.filename)} className={cn('rounded-xl border p-3 text-left transition-colors', selected === document.filename ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent')}><Image src={`/dataset/${document.filename}`} alt={document.label} width={280} height={190} className="h-32 w-full rounded-lg object-cover" /><p className="mt-3 text-sm font-medium">{document.label}</p><p className="mt-1 text-xs text-muted-foreground">{document.type} · {document.classification}</p></button>)}</div><div className="mt-6 flex justify-end"><Button disabled={!selected} onClick={() => selected && router.push(`/screening/face?demo=${selected}`)}>Start Screening</Button></div></div></div>}
    </>
  )
}
