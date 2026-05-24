import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/layout/nav'
import { SECTION_SHELL } from '@/lib/constants'
import { cn } from '@/lib/cn'

export const metadata: Metadata = {
  title: 'Оферта · Power Generation Camp',
  robots: { index: false, follow: false },
}

export default function OfferPage() {
  return (
    <main className="min-h-dvh bg-bg-0">
      <Nav />
      <article className={cn(SECTION_SHELL, 'py-16 md:py-24')}>
        <h1 className="font-display text-2xl font-bold text-t-high">Оферта</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-t-mid">
          Текст публичной оферты будет опубликован здесь. Условия участия и
          оплаты уточняйте у организаторов лагеря.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block font-mono text-[11px] text-brand uppercase underline-offset-2 hover:underline"
        >
          ← на главную
        </Link>
      </article>
    </main>
  )
}
