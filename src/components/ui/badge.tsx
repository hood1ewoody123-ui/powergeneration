import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide [&_svg]:size-2.5',
  {
    variants: {
      variant: {
        green: 'bg-green-10 text-green',
        red: 'bg-red-10 text-red',
        neutral: 'bg-bg-3 text-t-mid',
      },
      dot: {
        true: 'gap-1.5 before:size-[5px] before:shrink-0 before:rounded-full before:bg-current before:animate-blink',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      dot: false,
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, dot, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, dot }), className)} {...props} />
  )
}

/** Status pill with blinking dot (hero / HUD) */
export interface PillProps extends HTMLAttributes<HTMLDivElement> {
  dotColor?: 'green' | 'red'
}

export function Pill({
  className,
  dotColor = 'green',
  children,
  ...props
}: PillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line-mid bg-bg-3 px-3 py-1 font-mono text-[11px] tracking-wide text-t-mid',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'size-[5px] shrink-0 animate-blink rounded-full',
          dotColor === 'red' ? 'bg-red' : 'bg-green',
        )}
        aria-hidden
      />
      {children}
    </div>
  )
}
