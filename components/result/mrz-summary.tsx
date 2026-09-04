import { Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MrzSummary({ mrzConsistent }: { mrzConsistent: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">MRZ Analysis</CardTitle>
        <CardDescription>Machine Readable Zone validation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-lg', mrzConsistent ? 'bg-success/12' : 'bg-destructive/12')}>
            {mrzConsistent ? <Check className="size-6 text-success" /> : <X className="size-6 text-destructive" />}
          </div>
          <div className="flex-1">
            <p className={cn('font-semibold', mrzConsistent ? 'text-success' : 'text-destructive')}>
              {mrzConsistent ? 'MRZ Validation Passed' : 'MRZ Validation Failed'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {mrzConsistent
                ? 'All check digits validated. Machine readable zone is consistent with visual inspection zone.'
                : 'Check digit mismatch detected. MRZ data does not match visual fields.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
