import { Fragment } from 'react'
import { cn } from '@/lib/utils'

const steps = ['Upload', 'Analyze', 'Review', 'Decision']

export function StepIndicator({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <ol aria-label="Screening progress" className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
      {steps.map((label, i) => {
        const n = i + 1
        const state = n < current ? 'done' : n === current ? 'active' : 'todo'
        return (
          <Fragment key={label}>
            <li
              aria-current={state === 'active' ? 'step' : undefined}
              className={cn(
                'flex items-center gap-2 font-medium',
                state === 'active' ? 'text-foreground' : state === 'done' ? 'text-muted-foreground' : 'text-muted-foreground/50',
              )}
            >
              <span className={cn('font-mono tabular-nums', state === 'active' && 'text-primary')}>{String(n).padStart(2, '0')}</span>
              {label}
            </li>
            {n < steps.length ? <span aria-hidden className="h-px w-6 bg-border" /> : null}
          </Fragment>
        )
      })}
    </ol>
  )
}
