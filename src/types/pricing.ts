export type PricingTicketTone = 'green' | 'red'

export interface PricingTicket {
  id: string
  headline: string
  meta: string
  price: string
  priceNote?: string
  description?: string
  tone: PricingTicketTone
  soldOut?: boolean
}
