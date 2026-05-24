import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/layout/nav'
import { BattleInfo } from '@/components/sections/battle-info'
import { BattleRegisterForm } from '@/components/sections/battle-register-form'
import { CampMediaFooter } from '@/components/sections/camp-media-footer'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export const metadata: Metadata = {
  title: 'Muta Born Battle · Power Generation Camp',
  description: 'Muta Born Battle — фестиваль и баттл Power Generation Camp',
}

export default function MutaBornBattlePage() {
  return (
    <main className="min-h-dvh w-full bg-bg-0">
      <div className="relative z-50">
        <Nav />
      </div>

      <CampMediaFooter className="!pt-6 md:!pt-10" />

      <BattleInfo />

      <BattleRegisterForm />

      <div className="mx-auto max-w-[1120px] px-4 pb-16 pt-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'brand-outline', size: 'sm' }),
            'font-mono text-[10px] tracking-[0.18em] uppercase',
          )}
        >
          ← на главную
        </Link>
      </div>
    </main>
  )
}
