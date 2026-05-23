import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const trackVariants = cva('overflow-hidden rounded-full bg-bg-4', {
  variants: {
    size: {
      sm: 'h-0.5',
      md: 'h-1',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const barVariants = cva('h-full rounded-full transition-[width] duration-300 ease-out', {
  variants: {
    tone: {
      green: 'bg-green',
      red: 'bg-red',
      scan: 'w-full animate-scan bg-[length:200%_100%] [background-image:linear-gradient(90deg,transparent,#39ff14,transparent)]',
    },
  },
  defaultVariants: {
    tone: 'green',
  },
})

export interface ProgressProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trackVariants> {
  value?: number
  max?: number
  tone?: VariantProps<typeof barVariants>['tone']
}

export function Progress({
  className,
  size,
  value = 0,
  max = 100,
  tone = 'green',
  ...props
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      className={cn(trackVariants({ size }), className)}
      role="progressbar"
      aria-valuenow={tone === 'scan' ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={cn(barVariants({ tone }))}
        style={tone === 'scan' ? undefined : { width: `${percent}%` }}
      />
    </div>
  )
}
