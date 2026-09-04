'use client'

import { use } from 'react'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ScreeningWorkstation } from '@/components/result/screening-workstation'
import { OcrSummary } from '@/components/result/ocr-summary'
import { MrzSummary } from '@/components/result/mrz-summary'
import { FaceVerificationSummary } from '@/components/result/face-verification-summary'
import { EvidenceSummary } from '@/components/result/evidence-summary'
import { OfficerDecision } from '@/components/result/officer-decision'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getScreening } from '@/lib/data'
import { buildResult } from '@/lib/result'
import { getDemoResult, isDemoDatasetImage } from '@/lib/demo-data'

export default function ScreeningResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const decodedId = decodeURIComponent(id)
  
  // Check if this is a demo dataset result
  let screening
  let result
  let isDemoMode = false
  let demoImageFile = ''

  if (decodedId.startsWith('demo:')) {
    const filename = decodedId.substring(5)
    if (isDemoDatasetImage(filename)) {
      const demoResult = getDemoResult(filename)
      if (demoResult) {
        screening = demoResult.screening
        result = demoResult.result
        isDemoMode = true
        demoImageFile = filename
      } else {
        // Fallback
        screening = getScreening('SCR-24871')
        result = buildResult(screening)
      }
    } else {
      screening = getScreening('SCR-24871')
      result = buildResult(screening)
    }
  } else {
    screening = getScreening(decodedId)
    result = buildResult(screening)
  }

  return (
    <>
      {isDemoMode && <p className="text-[11px] font-medium uppercase tracking-[.16em] text-primary">Controlled dataset</p>}

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="size-3.5" />
          Dashboard
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">Screening Result</span>
      </nav>

      <ScreeningWorkstation screening={screening} result={result} demoImageFile={demoImageFile || 'realpassport.png'} />

      {/* 4. Summary Sections (OCR, MRZ, Face Verification, Evidence) */}
      <section className="mt-10">
        <div className="space-y-6">
          {/* OCR Summary */}
          <OcrSummary ocr={result.ocr} />

          {/* MRZ Summary */}
          <MrzSummary mrzConsistent={result.mrzConsistent} />

          {/* Face Verification Summary */}
          <FaceVerificationSummary faceScore={result.faceScore} />

          <Card>
            <CardHeader><CardTitle className="text-lg">Metadata Analysis</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{result.metadataFlags ? 'Suspicious editing indicators detected' : 'No suspicious anomalies'}</p>
                <p className="mt-1 text-sm text-muted-foreground">{result.metadataFlags ? 'File history and compression patterns require manual review.' : 'File metadata is consistent with a clean document capture.'}</p>
              </div>
              <span className={result.metadataFlags ? 'rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning' : 'rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success'}>{result.metadataFlags ? 'Review' : 'Clear'}</span>
            </CardContent>
          </Card>

          {/* Evidence Summary */}
          <EvidenceSummary screeningId={screening.id} isDemoMode={isDemoMode} />
        </div>
      </section>

      <section className="mt-20 pt-12 border-t border-border" data-section="decision">
        <OfficerDecision screening={screening} result={result} isDemoMode={isDemoMode} />
      </section>
    </>
  )
}
