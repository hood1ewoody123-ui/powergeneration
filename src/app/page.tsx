import { AboutIntro, GuestShowcase, Hero } from '@/components/sections'

export default function Home() {
  return (
    <main className="w-full bg-bg-0">
      <Hero />
      <AboutIntro />
      <GuestShowcase />
      <div id="pricing" className="scroll-mt-20" aria-hidden />
      <div id="register" className="scroll-mt-20" aria-hidden />
    </main>
  )
}
