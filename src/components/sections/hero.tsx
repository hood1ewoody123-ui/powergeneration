import { Nav } from '@/components/layout/nav'
import { HeroBackground } from '@/components/sections/hero-background'
import { HeroContent } from '@/components/sections/hero-content'
import { HeroMobileVideo } from '@/components/sections/hero-mobile-video'

export function Hero() {
  return (
    <section id="top" className="w-full overflow-x-clip bg-bg-0">
      {/* Mobile: nav → video → текст (без наложения) */}
      <div className="flex flex-col md:hidden">
        <Nav />
        <HeroMobileVideo />
        <HeroContent />
      </div>

      {/* Desktop: полноэкранное видео + overlay */}
      <div className="relative hidden min-h-[100dvh] md:flex md:flex-col">
        <HeroBackground />
        <div className="relative z-10 flex min-h-[100dvh] flex-col">
          <Nav />
          <HeroContent />
        </div>
      </div>
    </section>
  )
}
