import Link from 'next/link'
import { MutaBannerOverlay } from '@/components/sections/muta-banner-overlay'
import { campButtonClassName, CAMP_PANEL } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { MUTA_BORN_BATTLE, SECTION_SHELL } from '@/lib/constants'

export function CampMutaCta() {
  return (
    <section
      className={cn(
        'relative w-full overflow-visible bg-bg-0',
        CAMP_PANEL.section,
      )}
      aria-label="Muta Born Battle"
    >
      <MutaBannerOverlay />

      <div
        className={cn(
          SECTION_SHELL,
          'relative z-[2] flex justify-center px-4 pb-16 pt-8 md:pb-20 md:pt-10',
        )}
      >
        <Link
          href={MUTA_BORN_BATTLE.href}
          className={cn(campButtonClassName(), 'min-w-[220px] text-center')}
        >
          Перейти к баттлу
        </Link>
      </div>
    </section>
  )
}
