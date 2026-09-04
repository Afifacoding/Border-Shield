'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Screening } from '@/lib/data'
import type { ScreeningResult } from '@/lib/result'

type DecisionType = 'clear' | 'secondary' | 'escalate' | null

export function OfficerDecision({ screening, result, isDemoMode }: { screening: Screening; result: ScreeningResult; isDemoMode?: boolean }) {
  const [selectedDecision, setSelectedDecision] = useState<DecisionType>(null)
  const [remarks, setRemarks] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleDecision = (decision: DecisionType) => {
    setSelectedDecision(decision)
    // In a real app, this would save to a database
    // For now, we'll just save to localStorage for demo purposes
    if (decision) {
      const decisionData = {
        screeningId: screening.id,
        decision,
        remarks,
        timestamp: new Date().toISOString(),
        isDemoMode: isDemoMode ?? false,
      }
      localStorage.setItem(`decision_${screening.id}`, JSON.stringify(decisionData))
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  const decisionLabels = {
    clear: 'Clear Traveler',
    secondary: 'Refer for Secondary Inspection',
    escalate: 'Escalate to Supervisor',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Officer Decision</h2>
        <p className="text-muted-foreground">
          Based on the forensic analysis, make a decision on whether to clear the traveler or refer for further inspection.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Clear Decision */}
        <button
          onClick={() => handleDecision('clear')}
          disabled={result.level !== 'verified'}
          className={cn(
            'rounded-lg border-2 p-6 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
            selectedDecision === 'clear'
              ? 'border-success bg-success/5'
              : result.level === 'verified'
                ? 'border-border hover:border-success/40 hover:bg-success/5'
                : 'border-border/40 bg-card/30 opacity-50 cursor-not-allowed',
          )}
        >
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle2 className="size-6 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Clear Traveler</h3>
              <p className="text-xs text-muted-foreground mt-1">Document verified, traveler cleared for entry</p>
            </div>
          </div>
          {result.level !== 'verified' && (
            <p className="text-xs text-muted-foreground ml-9">Only available for verified documents</p>
          )}
        </button>

        {/* Secondary Inspection */}
        <button
          onClick={() => handleDecision('secondary')}
          className={cn(
            'rounded-lg border-2 p-6 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
            selectedDecision === 'secondary'
              ? 'border-warning bg-warning/5'
              : 'border-border hover:border-warning/40 hover:bg-warning/5',
          )}
        >
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="size-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Secondary Inspection</h3>
              <p className="text-xs text-muted-foreground mt-1">Refer to secondary inspection desk for manual review</p>
            </div>
          </div>
        </button>

        {/* Escalate */}
        <button
          onClick={() => handleDecision('escalate')}
          className={cn(
            'rounded-lg border-2 p-6 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
            selectedDecision === 'escalate'
              ? 'border-destructive bg-destructive/5'
              : 'border-border hover:border-destructive/40 hover:bg-destructive/5',
          )}
        >
          <div className="flex items-start gap-3 mb-3">
            <RefreshCw className="size-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Escalate</h3>
              <p className="text-xs text-muted-foreground mt-1">Escalate to supervisor for immediate review</p>
            </div>
          </div>
        </button>
      </div>

      {/* Officer Remarks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Officer Remarks</CardTitle>
          <CardDescription>Add notes for the case file (optional)</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter any additional observations, concerns, or context for this screening..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/* Submit Area */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        <div>
          {submitted && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="size-4" />
                Decision recorded successfully
              </div>
              {isDemoMode && (
                <div className="text-xs text-primary mt-1">— Controlled prototype record</div>
              )}
            </div>
          )}
        </div>
        <Button
          size="lg"
          disabled={!selectedDecision}
          onClick={() => handleDecision(selectedDecision)}
          className={cn(
            selectedDecision === 'clear' && 'bg-success hover:bg-success/90',
            selectedDecision === 'secondary' && 'bg-warning hover:bg-warning/90',
            selectedDecision === 'escalate' && 'bg-destructive hover:bg-destructive/90',
          )}
        >
          {selectedDecision ? `Confirm: ${decisionLabels[selectedDecision]}` : 'Select a Decision'}
        </Button>
      </div>
    </div>
  )
}
