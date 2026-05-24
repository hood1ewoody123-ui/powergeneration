import { BattleVideo } from '@/components/sections/battle-video'
import { MutaBannerOverlay } from '@/components/sections/muta-banner-overlay'
import { cn } from '@/lib/cn'

interface CampMediaFooterProps {
  className?: string
}

/** Full-bleed Muta overlay + battle video */
export function CampMediaFooter({ className }: CampMediaFooterProps) {
  return (
    <section
      id="battle"
      className={cn(
        'relative w-full overflow-visible bg-bg-0 pt-16 md:pt-24',
        className,
      )}
      aria-label="Muta Born Battle и видео"
    >
      <MutaBannerOverlay />

      <div className="relative z-[2] mt-8 flex w-full justify-center md:mt-12">
        <BattleVideo />
      </div>
    </section>
  )
}
