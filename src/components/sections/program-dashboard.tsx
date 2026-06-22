import { ProgramDashboardClient } from '@/components/sections/program-dashboard-client'
import { ProgramFaq } from '@/components/sections/program-faq'
import { ProgramReviews } from '@/components/sections/program-reviews'
import { PricingTickets } from '@/components/sections/pricing-tickets'
import { ArchiveSlider } from '@/components/sections/archive-slider'
import { CAMP_MIN, CAMP_PANEL, CampPanel } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { SECTION_SHELL, SECTION_TITLES } from '@/lib/constants'

export function ProgramDashboard() {
  return (
    <section
      id="program"
      className={cn(
        'relative z-20 overflow-visible scroll-mt-20 bg-bg-0',
        CAMP_PANEL.section,
      )}
      aria-label="Программа лагеря"
    >
      <div className={cn(SECTION_SHELL, CAMP_PANEL.stack)}>
        <CampPanel id="program-modules">
          <div className={CAMP_PANEL.inner}>
            <h2 className={CAMP_MIN.title}>{SECTION_TITLES.program}</h2>
            <ProgramDashboardClient />
          </div>
        </CampPanel>

        <ProgramReviews />
        <PricingTickets />
        <ArchiveSlider />
        <ProgramFaq />
      </div>
    </section>
  )
}
