import type { ReactNode } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

/** Минималистичный ритм блоков: дашборд и всё ниже */
export const CAMP_MIN = {
  /** Отступ между крупными блоками внутри одной секции */
  block: 'pt-24 md:pt-32 lg:pt-40',
  title:
    'font-display text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-green lowercase',
  titleRu:
    'font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-snug tracking-tight text-t-high',
  body:
    'max-w-lg font-body text-sm leading-[1.85] text-t-mid md:text-[15px]',
  mono:
    'font-mono text-[11px] leading-[1.9] tracking-[0.08em] text-green/65 uppercase',
  monoBright:
    'font-mono text-[11px] leading-[1.9] tracking-[0.1em] text-green uppercase',
  quote:
    'font-body text-sm leading-[1.85] text-t-mid md:text-[15px]',
  rule: 'border-t border-green/10',
  fieldLabel:
    'font-mono text-[10px] tracking-[0.22em] text-green/50 uppercase',
  fieldInput:
    'h-11 rounded-none border-0 border-b border-green/15 bg-transparent px-0 text-[13px] text-t-high shadow-none placeholder:text-green/20 hover:border-green/35 focus:border-green focus:bg-transparent focus:ring-0 aria-invalid:border-green/45',
  fieldError: 'font-mono text-[10px] text-green/75',
} as const

/** Острые панели — секции от registration и ниже */
export const CAMP_PANEL = {
  stack: 'flex flex-col gap-4 md:gap-5',
  inner: 'p-6 sm:p-8 md:p-10',
  innerCompact: 'p-5 sm:p-6 md:p-8',
  section: 'py-12 md:py-16',
  base: 'rounded-none border bg-bg-0',
  green: 'border-green/15',
  brand: 'border-brand/30',
  cardGreen: 'rounded-none border border-green/15 bg-bg-0',
  cardBrand: 'rounded-none border border-brand/30 bg-bg-0',
} as const

export type CampPanelVariant = 'green' | 'brand'

const panelVariantClass: Record<CampPanelVariant, string> = {
  green: CAMP_PANEL.green,
  brand: CAMP_PANEL.brand,
}

export function CampPanel({
  id,
  variant = 'green',
  className,
  children,
}: {
  id?: string
  variant?: CampPanelVariant
  className?: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className={cn(CAMP_PANEL.base, panelVariantClass[variant], className)}
    >
      {children}
    </div>
  )
}

/** Зелёная кнопка без скругления — дашборд и ниже */
export function campButtonClassName(className?: string): string {
  return cn(
    buttonVariants({ variant: 'fill', size: 'md' }),
    'font-mono text-[11px] tracking-[0.18em] uppercase',
    className,
  )
}

/** Блок заявки — акцент brand red */
export const CAMP_FORM = {
  title:
    'font-display text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-brand lowercase',
  fieldLabel:
    'font-mono text-[10px] font-medium tracking-[0.22em] text-brand uppercase',
  fieldInput:
    'h-9 w-full rounded-none !border-0 !border-b-2 !border-brand/80 !bg-transparent px-0 text-[12px] text-t-high shadow-none outline-none placeholder:text-brand/40 hover:!border-brand focus:!border-brand focus:!bg-transparent focus:!ring-0 aria-invalid:!border-brand',
  fieldError: 'font-mono text-[10px] font-medium text-brand',
  monoBright:
    'font-mono text-[10px] font-medium tracking-[0.1em] text-brand uppercase',
  consent: 'font-body text-xs leading-relaxed text-brand/90',
} as const

export function campFormButtonClassName(className?: string): string {
  return cn(
    buttonVariants({ variant: 'brand', size: 'sm' }),
    'font-mono text-[10px] tracking-[0.18em] uppercase',
    className,
  )
}

export function CampBlock({
  id,
  title,
  intro,
  variant = 'green',
  className,
  children,
}: {
  id?: string
  title: string
  intro?: string
  variant?: CampPanelVariant
  className?: string
  children?: ReactNode
}) {
  return (
    <CampPanel id={id} variant={variant} className={className}>
      <div className={CAMP_PANEL.inner}>
        <h2 className={CAMP_MIN.title}>{title}</h2>
        {intro ? (
          <p className={cn(CAMP_MIN.body, 'mt-4 md:mt-5')}>{intro}</p>
        ) : null}
        {children}
      </div>
    </CampPanel>
  )
}
