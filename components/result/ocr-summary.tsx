import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { OcrField } from '@/lib/data'

export function OcrSummary({ ocr }: { ocr: OcrField[] }) {
  const keyFields = ocr.slice(0, 4)
  const hasIssues = keyFields.some((f) => f.validation !== 'Valid')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Extracted Information</CardTitle>
        <CardDescription>OCR field extraction summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFields.map((field) => (
            <div key={field.field} className={cn('rounded-lg border border-border bg-card/50 p-3', field.validation !== 'Valid' && 'border-warning/40 bg-warning/5')}>
              <div className="text-xs font-medium text-muted-foreground uppercase">{field.field}</div>
              <div className="mt-1 font-mono text-sm text-foreground font-medium">{field.value}</div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{field.confidence}% confidence</span>
                <span className={cn('text-xs font-medium', field.validation === 'Valid' ? 'text-success' : 'text-warning')}>
                  {field.validation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
