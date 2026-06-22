import Link from 'next/link'
import { CampBlock, campFormButtonClassName, CAMP_MIN, CAMP_PANEL } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { SECTION_TITLES } from '@/lib/constants'
import { PRICING_TICKETS } from '@/lib/pricing'
import type { PricingTicketTone } from '@/types/pricing'

const toneStyles: Record<
  PricingTicketTone,
  { headline: string; meta: string; price: string; body: string; card: string }
> = {
  green: {
    headline: CAMP_MIN.monoBright,
    meta: CAMP_MIN.mono,
    price:
      'font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-none tracking-tight text-green',
    body: CAMP_MIN.body,
    card: CAMP_PANEL.cardGreen,
  },
  red: {
    headline:
      'font-mono text-[11px] leading-[1.9] tracking-[0.1em] text-brand uppercase',
    meta: 'font-mono text-[11px] leading-[1.9] tracking-[0.08em] text-brand/75 uppercase',
    price:
      'font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-none tracking-tight text-brand',
    body: 'max-w-xl font-body text-sm leading-[1.85] text-brand/90 md:text-[15px]',
    card: CAMP_PANEL.cardBrand,
  },
}

export function PricingTickets() {
  return (
    <CampBlock
      id="pricing"
      title={SECTION_TITLES.tickets}
      intro="Стоимость пакета на смену · Казань."
    >
      <ul className="mt-8 flex flex-col gap-4 md:gap-5">
        {PRICING_TICKETS.map((ticket) => {
          const tone = toneStyles[ticket.tone]

          return (
            <li
              key={ticket.id}
              className={cn(
                tone.card,
                'flex flex-col gap-4 p-5 sm:p-6',
                ticket.description
                  ? 'sm:flex-row sm:items-start sm:justify-between sm:gap-10'
                  : 'sm:flex-row sm:items-end sm:justify-between sm:gap-10',
              )}
            >
              <div className="min-w-0 flex-1">
                <p className={tone.headline}>{ticket.headline}</p>
                <p className={cn(tone.meta, 'mt-2')}>{ticket.meta}</p>
                {ticket.description ? (
                  <p className={cn(tone.body, 'mt-4')}>{ticket.description}</p>
                ) : null}
              </div>
              <div className="shrink-0 sm:text-right">
                <p className={tone.price}>{ticket.price}</p>
                {ticket.priceNote ? (
                  <p className={cn(tone.meta, 'mt-2')}>{ticket.priceNote}</p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>

      <Link
        href="#register"
        className={cn(campFormButtonClassName(), 'mt-8')}
      >
        Занять место
      </Link>
    </CampBlock>
  )
}
