import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { evidenceRecords } from '@/lib/data'

export function EvidenceSummary({ screeningId, isDemoMode }: { screeningId: string; isDemoMode?: boolean }) {
  const record = evidenceRecords.find((r) => r.screeningId === screeningId)

  if (isDemoMode) {
    // For demo mode, generate a demo evidence record
    const demoEvidence = {
      documentHash: 'demo-5f2a…e847',
      evidenceHash: 'demo-8c14…9d32',
      block: 'DEMO-001',
      txId: 'demo-0xf3c2…a891',
      status: 'DEMO RECORD' as const,
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evidence Tracking</CardTitle>
          <CardDescription>Demo Evidence Ledger Record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                <div className="text-xs font-medium text-muted-foreground uppercase">Document Hash</div>
                <div className="font-mono text-xs text-foreground mt-1 break-all">{demoEvidence.documentHash}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                <div className="text-xs font-medium text-muted-foreground uppercase">Evidence Hash</div>
                <div className="font-mono text-xs text-foreground mt-1 break-all">{demoEvidence.evidenceHash}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                <div className="text-xs font-medium text-muted-foreground uppercase">Block</div>
                <div className="font-mono text-sm text-foreground mt-1">{demoEvidence.block}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                <div className="text-xs font-medium text-muted-foreground uppercase">Status</div>
                <div className="text-sm font-medium mt-1 text-primary">{demoEvidence.status}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!record) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evidence Tracking</CardTitle>
        <CardDescription>Immutable record on Evidence Ledger</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/40 bg-card/50 p-3">
              <div className="text-xs font-medium text-muted-foreground uppercase">Document Hash</div>
              <div className="font-mono text-xs text-foreground mt-1 break-all">{record.documentHash}</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/50 p-3">
              <div className="text-xs font-medium text-muted-foreground uppercase">Evidence Hash</div>
              <div className="font-mono text-xs text-foreground mt-1 break-all">{record.evidenceHash}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/40 bg-card/50 p-3">
              <div className="text-xs font-medium text-muted-foreground uppercase">Block</div>
              <div className="font-mono text-sm text-foreground mt-1">{record.block}</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/50 p-3">
              <div className="text-xs font-medium text-muted-foreground uppercase">Status</div>
              <div className={`text-sm font-medium mt-1 ${record.status === 'Confirmed' ? 'text-success' : 'text-warning'}`}>
                {record.status}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
