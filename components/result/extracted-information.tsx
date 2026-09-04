import { cn } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { OcrField } from '@/lib/data'

export function ExtractedInformation({ ocr }: { ocr: OcrField[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead className="font-medium text-foreground">Field</TableHead>
            <TableHead className="font-medium text-foreground">Extracted Value</TableHead>
            <TableHead className="text-right font-medium text-foreground">Confidence</TableHead>
            <TableHead className="text-right font-medium text-foreground">Validation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ocr.map((field, i) => {
            const validationColor =
              field.validation === 'Valid'
                ? 'text-success'
                : field.validation === 'Mismatch'
                  ? 'text-destructive'
                  : 'text-warning'

            return (
              <TableRow key={i} className={cn('border-border/40', field.validation !== 'Valid' && 'bg-card/50')}>
                <TableCell className="font-medium text-foreground">{field.field}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{field.value}</TableCell>
                <TableCell className="text-right text-sm font-mono">{field.confidence}%</TableCell>
                <TableCell className={cn('text-right text-sm font-medium', validationColor)}>
                  {field.validation}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
