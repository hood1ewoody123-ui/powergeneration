import { SiteFooter } from '@/components/layout/site-footer'
import { StickyNav } from '@/components/layout/sticky-nav'
import { CampMutaCta } from '@/components/sections/camp-muta-cta'
import {
  AboutIntro,
  GuestShowcase,
  Hero,
  ProgramDashboard,
  RegisterForm,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="w-full bg-bg-0">
      <StickyNav />
      <Hero />
      <AboutIntro />
      <GuestShowcase />
      <RegisterForm />
      <ProgramDashboard />
      <CampMutaCta />
      <SiteFooter />
    </main>
  )
}
