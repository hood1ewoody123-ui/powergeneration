import { ProgramDashboardClient } from '@/components/sections/program-dashboard-client'
import { ProgramFaq } from '@/components/sections/program-faq'
import { PricingTickets } from '@/components/sections/pricing-tickets'
import { ArchiveSlider } from '@/components/sections/archive-slider'
import { CAMP_MIN } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { SECTION_SHELL, SECTION_TITLES } from '@/lib/constants'
import { PROGRAM_REVIEWS } from '@/lib/program'

function ProgramReviews() {
  return (
    <div className={CAMP_MIN.block}>
      <h2 className={CAMP_MIN.title}>{SECTION_TITLES.feedback}</h2>
      <ul className="mt-14 flex flex-col gap-14 md:gap-20">
        {PROGRAM_REVIEWS.map((review) => (
          <li
            key={review.id}
            className="grid gap-4 md:grid-cols-[minmax(0,200px)_1fr] md:gap-12"
          >
            <div>
              <p className={CAMP_MIN.monoBright}>{review.name}</p>
              <p className={cn(CAMP_MIN.mono, 'mt-1')}>
                {review.city} · {review.year}
              </p>
            </div>
            <blockquote className={CAMP_MIN.quote}>
              «{review.text}»
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProgramDashboard() {
  return (
    <section
      id="program"
      className="relative z-20 overflow-visible scroll-mt-20 bg-bg-0 pt-16 pb-0 md:pt-24"
      aria-label="Программа лагеря"
    >
      <div className={SECTION_SHELL}>
        <h2 className={CAMP_MIN.title}>{SECTION_TITLES.program}</h2>
        <ProgramDashboardClient />
        <ProgramReviews />
        <PricingTickets />
        <ArchiveSlider />
        <ProgramFaq />
      </div>
    </section>
  )
}
