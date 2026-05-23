import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-line bg-bg-2 transition-[border-color] duration-[180ms] hover:border-line-mid',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-line px-6 py-5',
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-t-mid uppercase [&_svg]:size-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: ReactNode
  delta?: ReactNode
  valueTone?: 'green' | 'red' | 'white'
}

export function StatCard({
  label,
  value,
  delta,
  valueTone = 'green',
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-line bg-bg-2 p-6',
        className,
      )}
      {...props}
    >
      <p className="mb-3 font-mono text-[10px] tracking-widest text-t-low uppercase">
        {label}
      </p>
      <p
        className={cn(
          'mb-2 font-display text-[32px] leading-none font-bold',
          valueTone === 'green' && 'text-green',
          valueTone === 'red' && 'text-red',
          valueTone === 'white' && 'text-t-high',
        )}
      >
        {value}
      </p>
      {delta ? (
        <div className="flex items-center gap-1 font-mono text-[11px] text-t-low [&_svg]:size-2.75">
          {delta}
        </div>
      ) : null}
    </div>
  )
}
