import { AlertCircle } from 'lucide-react'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib/cn'

const inputClassName = cn(
  'h-10 w-full rounded-sm border border-line-mid bg-bg-3 px-4 font-body text-[13px] text-t-high outline-none transition-[border-color,background] duration-[180ms] placeholder:text-t-hint',
  'hover:border-white/20 focus:border-green focus:bg-bg-4',
  'disabled:cursor-not-allowed disabled:opacity-35',
  'aria-invalid:border-red aria-invalid:focus:border-red',
)

export interface FieldProps {
  label?: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

export function Field({
  label,
  required,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <span className="font-mono text-[10px] tracking-widest text-t-low uppercase">
          {label}
          {required ? <span className="text-red"> *</span> : null}
        </span>
      ) : null}
      {children}
      {error ? (
        <span className="flex items-center gap-1 text-[11px] text-red">
          <AlertCircle className="size-2.75 shrink-0" aria-hidden />
          {error}
        </span>
      ) : hint && !error ? (
        <span className="text-[11px] text-t-low">{hint}</span>
      ) : null}
    </div>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Input({
  className,
  error,
  iconLeft,
  iconRight,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  const invalid = error || ariaInvalid

  if (iconLeft || iconRight) {
    return (
      <div className="relative flex items-center">
        {iconLeft ? (
          <span className="pointer-events-none absolute left-3 text-t-low [&_svg]:size-3.5">
            {iconLeft}
          </span>
        ) : null}
        <input
          className={cn(
            inputClassName,
            iconLeft && 'pl-[38px]',
            iconRight && 'pr-10',
            className,
          )}
          aria-invalid={invalid || undefined}
          {...props}
        />
        {iconRight ? (
          <span className="absolute right-2.5 flex text-t-low [&_svg]:size-3.5">
            {iconRight}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <input
      className={cn(inputClassName, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}

export function Textarea({
  className,
  error,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  const invalid = error || ariaInvalid

  return (
    <textarea
      className={cn(
        inputClassName,
        'min-h-20 resize-y py-3 leading-relaxed',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}

const selectChevron =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.28)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"

export function Select({
  className,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={cn(
        inputClassName,
        'cursor-pointer appearance-none bg-[length:12px] bg-position-[right_12px_center] bg-no-repeat pr-9',
        className,
      )}
      style={{ backgroundImage: `url("${selectChevron}")` }}
      aria-invalid={error || undefined}
      {...props}
    >
      {children}
    </select>
  )
}
