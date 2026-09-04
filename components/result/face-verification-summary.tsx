import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function FaceVerificationSummary({ faceScore }: { faceScore: number }) {
  const isMatch = faceScore >= 85

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Face Verification</CardTitle>
        <CardDescription>Biometric match against live capture</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Match Score</span>
          <span className={cn('font-mono text-2xl font-semibold', isMatch ? 'text-success' : 'text-destructive')}>
            {faceScore}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className={cn('h-full rounded-full transition-all duration-700', isMatch ? 'bg-success' : 'bg-destructive')} style={{ width: `${faceScore}%` }} />
        </div>
        <p className="text-sm text-muted-foreground">
          {isMatch ? 'Biometric identity verified. Face matches document photo.' : 'Significant mismatch detected. Possible identity impersonation.'}
        </p>
      </CardContent>
    </Card>
  )
}
