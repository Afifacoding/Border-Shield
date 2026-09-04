import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { riskLabel, type RiskLevel } from '@/lib/data'

const styles: Record<RiskLevel, string> = {
  verified: 'bg-success/12 text-success border-success/20',
  suspicious: 'bg-warning/12 text-warning border-warning/20',
  high: 'bg-destructive/12 text-destructive border-destructive/20',
}

export function RiskBadge({ level, className, label }: { level: RiskLevel; className?: string; label?: string }) {
  return (
    <Badge variant="outline" className={cn(styles[level], className)}>
      {label ?? riskLabel[level]}
    </Badge>
  )
}

export function RiskDot({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-2 shrink-0 rounded-full',
        level === 'verified' && 'bg-success',
        level === 'suspicious' && 'bg-warning',
        level === 'high' && 'bg-destructive',
        className,
      )}
    />
  )
}

export function riskText(level: RiskLevel) {
  return level === 'verified' ? 'text-success' : level === 'suspicious' ? 'text-warning' : 'text-destructive'
}
