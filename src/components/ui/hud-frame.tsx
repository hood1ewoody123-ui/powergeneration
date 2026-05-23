import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface HudFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  cornerColor?: 'green' | 'red' | 'line'
}

const cornerBorder: Record<NonNullable<HudFrameProps['cornerColor']>, string> = {
  green: 'border-green',
  red: 'border-red',
  line: 'border-line-mid',
}

export function HudFrame({
  className,
  children,
  cornerColor = 'green',
  ...props
}: HudFrameProps) {
  const border = cornerBorder[cornerColor]

  return (
    <div className={cn('relative px-5 py-4', className)} {...props}>
      <span
        className={cn(
          'pointer-events-none absolute top-0 left-0 size-2.5 border-solid',
          border,
          'border-t border-l',
        )}
        aria-hidden
      />
      <span
        className={cn(
          'pointer-events-none absolute top-0 right-0 size-2.5 border-solid',
          border,
          'border-t border-r',
        )}
        aria-hidden
      />
      <span
        className={cn(
          'pointer-events-none absolute bottom-0 left-0 size-2.5 border-solid',
          border,
          'border-b border-l',
        )}
        aria-hidden
      />
      <span
        className={cn(
          'pointer-events-none absolute right-0 bottom-0 size-2.5 border-solid',
          border,
          'border-r border-b',
        )}
        aria-hidden
      />
      {children}
    </div>
  )
}

export interface StatusRowProps extends HTMLAttributes<HTMLDivElement> {
  items: Array<{
    icon?: ReactNode
    label: string
    value: string
    valueTone?: 'default' | 'green' | 'red'
  }>
}

export function StatusRow({ className, items, ...props }: StatusRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-wide text-t-low',
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-4">
          {index > 0 ? <span className="h-3 w-px shrink-0 bg-line" aria-hidden /> : null}
          <span className="flex items-center gap-1.5 [&_svg]:size-2.75">
            {item.icon}
            <span>{item.label}</span>
            <span
              className={cn(
                'text-t-mid',
                item.valueTone === 'green' && 'text-green',
                item.valueTone === 'red' && 'text-red',
              )}
            >
              {item.value}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
