"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Check, Loader2 } from "lucide-react"
import { analysisSteps } from "@/lib/data"
import { getDemoCase } from "@/lib/demo-data"

type AnalysisViewProps = {
  caseId?: string
  demoFile?: string
}

export function AnalysisView({ caseId, demoFile }: AnalysisViewProps) {
  const demoCase = demoFile ? getDemoCase(demoFile) : null

  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalSteps = analysisSteps.length

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval)
          return prev
        }

        return prev + 1
      })
    }, 900)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const value = Math.min(
      100,
      Math.round((currentStep / analysisSteps.length) * 100)
    )

    setProgress(value)
  }, [currentStep])

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      const timer = setTimeout(() => {
        const target = demoCase && demoFile
          ? encodeURIComponent(`demo:${demoFile}`)
          : caseId === 'verified' ? 'SCR-24870' : 'SCR-24871'

        window.location.href = `/screening/${target}`
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [currentStep, demoFile, caseId, demoCase])

  const imageSrc = demoCase?.image || "/images/passport-sample.png"

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-sm text-muted-foreground">
          Step 2 of 4
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Analyzing Document
        </h1>

        <p className="text-sm text-muted-foreground">
          BorderShield AI is performing automated document screening.
        </p>
      </div>

      {/* Document Preview */}
      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Document Analysis</h2>
              <p className="text-sm text-muted-foreground">
                {demoCase?.screening.traveler || "Uploaded document"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-muted/30 p-8">
          <figure className="relative w-full max-w-3xl overflow-hidden rounded-xl border bg-background shadow-sm">
            <Image
              src={imageSrc}
              alt="Document being analyzed"
              width={1000}
              height={700}
              className="h-auto w-full object-contain"
              priority
            />

            {/* Animated scanning line */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_18px_rgba(59,130,246,0.8)]"
              style={{
                top: `${Math.min(progress, 95)}%`,
                transition: "top 700ms ease",
              }}
            />

            <figcaption className="sr-only">
              Document preview
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Progress */}
      <section
        aria-labelledby="analysis-progress"
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="analysis-progress"
              className="font-semibold"
            >
              Screening Progress
            </h2>

            <p className="text-sm text-muted-foreground">
              Running forensic checks...
            </p>
          </div>

          <span className="text-2xl font-semibold">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border bg-card">
          <div className="divide-y">
            {analysisSteps.map((step, index) => {
              const completed = index < currentStep
              const active = index === currentStep

              return (
                <div
                  key={step}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                    {completed ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={
                        completed || active
                          ? "text-sm font-medium"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {step}
                    </p>
                  </div>

                  {completed && (
                    <span className="text-xs text-emerald-600">
                      Complete
                    </span>
                  )}

                  {active && (
                    <span className="text-xs text-primary">
                      Running
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}