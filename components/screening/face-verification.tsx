'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera, Check, RotateCcw, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getDemoCase } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FaceVerification({ demoFile }: { demoFile: string }) {
  const router = useRouter()
  const demoCase = getDemoCase(demoFile)
  const [captured, setCaptured] = useState(false)
  if (!demoCase) return null

  return <div className="mx-auto flex w-full max-w-4xl flex-col gap-8"><div><p className="text-xs font-medium uppercase tracking-[.18em] text-primary">Step 2 of 4 · Simulated Face Verification</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Capture Traveller Photo</h1><p className="mt-2 text-sm text-muted-foreground">This is a simulated capture. No real person is identified.</p></div><Card><CardHeader><CardTitle className="flex items-center gap-2"><Camera className="size-5 text-primary" />Face Verification</CardTitle></CardHeader><CardContent className="grid gap-8 md:grid-cols-[1fr_.8fr] md:items-center"><div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-primary/40 bg-sidebar"><div className="absolute inset-8 rounded-lg border border-primary/40" /><div className="absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/10 text-primary"><ShieldCheck className="size-14" /></div>{captured && <div className="absolute inset-0 flex items-end bg-success/10 p-4"><span className="flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-sm font-medium text-success"><Check className="size-4" />Photo captured</span></div>}</div><div className="space-y-4"><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Capture status</p><p className="mt-1 text-lg font-medium">{captured ? 'Photo captured' : 'Camera ready'}</p><p className="mt-1 text-sm text-muted-foreground">Capture placeholder · {demoCase.screening.documentType}</p></div><div className="flex flex-col gap-2"><Button variant="outline" onClick={() => setCaptured(true)}><Camera data-icon="inline-start" />Capture Photo</Button><Button variant="ghost" disabled={!captured} onClick={() => setCaptured(false)}><RotateCcw data-icon="inline-start" />Retake</Button><Button disabled={!captured} onClick={() => router.push(`/screening/analyze?demo=${demoFile}`)}>Continue to Analysis</Button></div></div></CardContent></Card><div className="flex items-center gap-3 text-xs text-muted-foreground"><Image src={demoCase.image} alt="Selected document" width={56} height={40} className="h-10 w-14 rounded object-cover" />Selected: {demoCase.screening.traveler}</div></div>
}
