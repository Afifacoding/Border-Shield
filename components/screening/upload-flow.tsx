'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Camera, FolderOpen, Check, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { demoDocuments, isDemoDatasetImage } from '@/lib/demo-data'

export function UploadFlow({ initialDemo }: { initialDemo?: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<string | null>(initialDemo && isDemoDatasetImage(initialDemo) ? initialDemo : null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const ready = Boolean(fileName || selected)

  function start() {
    if (fileName) {
      if (isDemoDatasetImage(fileName)) {
        router.push(`/screening/face?demo=${fileName}`)
      } else {
        setError('Document not recognized. Please select one of the four controlled documents.')
      }
    } else {
      router.push(selected ? `/screening/face?demo=${selected}` : '/screening/new')
    }
  }

  function onFiles(files: FileList | null) {
    const f = files?.[0]
    if (!f) return
    setFileName(f.name)
    setSelected(null)
    setError(isDemoDatasetImage(f.name) ? '' : 'Document not recognized. Please select one of the four controlled documents.')
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Upload card */}
      <section
        aria-labelledby="upload-title"
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          onFiles(e.dataTransfer.files)
        }}
        className={cn(
          'mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-dashed bg-card px-6 py-14 text-center transition-colors md:py-16',
          dragging ? 'border-primary bg-primary/5' : 'border-border',
          fileName && 'border-solid border-success/40',
        )}
      >
        <span className={cn('flex size-14 items-center justify-center rounded-xl bg-secondary text-muted-foreground', fileName && 'bg-success/12 text-success')}>
          {fileName ? <Check className="size-6" /> : <FileText className="size-6" />}
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 id="upload-title" className="text-lg font-medium tracking-tight">
            {fileName ? 'Document ready' : 'Upload identity document'}
          </h2>
          <p className="text-sm text-muted-foreground">{fileName ? <span className="font-mono">{fileName}</span> : 'Drag and drop your document here'}</p>
          <p className="text-xs text-muted-foreground/70">Supported: JPG, PNG, PDF</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="lg" onClick={() => inputRef.current?.click()}>
            <FolderOpen data-icon="inline-start" />
            Choose File
          </Button>
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Camera className="size-4" />Local demo files only</span>
        </div>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only" onChange={(e) => onFiles(e.target.files)} aria-label="Choose a document file" />
        {error && <p role="alert" className="max-w-md text-sm text-destructive">{error}</p>}
      </section>

      {/* Demo cases */}
      <section aria-labelledby="demo-title" className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="demo-title" className="text-lg font-medium tracking-tight">
            Try a demonstration
          </h2>
          <p className="text-sm text-muted-foreground">Synthetic documents for training and evaluation. Selecting a case does not start the analysis.</p>
        </div>
        <div role="radiogroup" aria-label="Controlled demonstration documents" className="grid gap-4 sm:grid-cols-2">
          {demoDocuments.map((document) => {
            const active = selected === document.filename
            return (
              <button
                key={document.filename}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setSelected(document.filename)
                  setFileName(null)
                }}
                className={cn(
                  'flex flex-col gap-1.5 rounded-xl border bg-card p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active ? 'border-primary bg-primary/5' : 'border-border hover:border-foreground/20',
                )}
              >
                <Image src={`/dataset/${document.filename}`} alt="" width={240} height={150} className="h-32 w-full rounded-lg object-cover" />
                <span className="flex items-center justify-between gap-2 text-sm font-medium">
                  {document.label}
                  <span className={cn('flex size-4 items-center justify-center rounded-full border', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
                    {active ? <Check className="size-3" /> : null}
                  </span>
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">{document.type} · {document.classification}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Action */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {ready ? (fileName ? 'Document attached.' : `${demoDocuments.find((document) => document.filename === selected)?.label} selected.`) : 'Attach a document or choose a controlled demonstration document to continue.'}
        </p>
        <Button size="lg" disabled={!ready || Boolean(error)} onClick={start}>
          Start Screening
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
