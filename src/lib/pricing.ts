import type { PricingTicket } from '@/types/pricing'

export const PRICING_TICKETS: PricingTicket[] = [
  {
    id: 'early',
    headline: 'РАННЯЯ РЕГИСТРАЦИЯ',
    meta: 'СЛОТ: EARLY-BIRD · 7 ДНЕЙ',
    price: '89 000 ₽',
    priceNote: 'полный пакет · 7 дней',
    tone: 'green',
  },
  {
    id: 'standard',
    headline: 'БАЗОВЫЙ СЛОТ',
    meta: 'СМЕНА: 27 ИЮЛ — 3 АВГ // КАЗАНЬ',
    price: '99 000 ₽',
    priceNote: 'проживание · 4 питания · программа',
    tone: 'green',
  },
  {
    id: 'last',
    headline: 'ПОСЛЕДНИЕ МЕСТА',
    meta: 'СТАТУС: < 10 СЛОТОВ // ОЧЕРЕДЬ АКТИВНА',
    price: '109 000 ₽',
    priceNote: 'оплата после подтверждения',
    tone: 'red',
    description:
      'В стоимость входят проживание, 4-разовое питание, тренировки, мастер-классы и участие в вечерних активностях. Трансфер и личные расходы — отдельно.',
  },
]
