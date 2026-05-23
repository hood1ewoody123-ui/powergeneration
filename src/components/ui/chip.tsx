'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const chipVariants = cva(
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-mid bg-transparent px-2.5 py-1 text-xs text-t-mid transition-[background,border-color,color] duration-[180ms] hover:border-white/20 hover:text-t-high [&_svg]:size-2.75',
  {
    variants: {
      state: {
        idle: '',
        on: 'border-green-24 bg-green-10 text-green',
        'on-red': 'border-red-24 bg-red-10 text-red',
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  },
)

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

export function Chip({ className, state, type = 'button', ...props }: ChipProps) {
  return (
    <button
      type={type}
      className={cn(chipVariants({ state }), className)}
      aria-pressed={state === 'on' || state === 'on-red'}
      {...props}
    />
  )
}
