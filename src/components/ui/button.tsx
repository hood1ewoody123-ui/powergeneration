import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 border font-body text-[13px] font-medium tracking-wide whitespace-nowrap transition-[background,color,border-color,opacity] duration-[180ms] ease-out disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        fill: 'border-green bg-green text-black hover:border-green-dim hover:bg-green-dim',
        tonal:
          'border-transparent bg-green-10 text-green hover:bg-green-16',
        outline:
          'border-green-24 bg-transparent text-green hover:border-green-24 hover:bg-green-10',
        surface:
          'border-line bg-bg-3 text-t-high hover:bg-bg-4',
        ghost:
          'border-transparent bg-transparent text-t-mid hover:bg-bg-3 hover:text-t-high',
        danger: 'border-red bg-red text-white hover:opacity-[0.88]',
        'danger-tonal':
          'border-transparent bg-red-10 text-red hover:bg-red-16',
        brand:
          'border-brand bg-brand font-medium tracking-wider text-black uppercase hover:border-brand-dim hover:bg-brand-dim',
        'brand-outline':
          'border-brand bg-transparent font-medium tracking-wider text-brand uppercase hover:bg-brand/10',
      },
      size: {
        sm: 'h-7 rounded-xs px-3 text-xs [&_svg]:size-3',
        md: 'h-9 rounded-sm px-5 text-sm [&_svg]:size-3.5',
        lg: 'h-11 rounded-sm px-6 text-sm [&_svg]:size-3.5',
        icon: 'size-9 rounded-sm p-0 [&_svg]:size-3.5',
        'icon-sm': 'size-7 rounded-xs p-0 [&_svg]:size-3',
      },
    },
    defaultVariants: {
      variant: 'fill',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  block?: boolean
}

export function Button({
  className,
  variant,
  size,
  loading,
  block,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), block && 'w-full', className)}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : null}
    </button>
  )
}
