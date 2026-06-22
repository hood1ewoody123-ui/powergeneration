'use client'

import { useState } from 'react'
import { CampBlock, campButtonClassName, CAMP_MIN, CAMP_PANEL } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { SECTION_TITLES } from '@/lib/constants'
import { PROGRAM_REVIEWS } from '@/lib/program'

const VISIBLE_COUNT = 2

function ReviewItem({
  name,
  city,
  year,
  text,
}: {
  name: string
  city: string
  year: string
  text: string
}) {
  return (
    <li
      className={cn(
        CAMP_PANEL.cardGreen,
        'grid gap-4 p-5 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8 md:p-6',
      )}
    >
      <div>
        <p className={CAMP_MIN.monoBright}>{name}</p>
        <p className={cn(CAMP_MIN.mono, 'mt-1')}>
          {city} · {year}
        </p>
      </div>
      <blockquote className={CAMP_MIN.quote}>«{text}»</blockquote>
    </li>
  )
}

export function ProgramReviews() {
  const [expanded, setExpanded] = useState(false)
  const hasMore = PROGRAM_REVIEWS.length > VISIBLE_COUNT
  const visibleReviews = expanded
    ? PROGRAM_REVIEWS
    : PROGRAM_REVIEWS.slice(0, VISIBLE_COUNT)

  return (
    <CampBlock id="feedback" title={SECTION_TITLES.feedback}>
      <ul className="mt-8 flex flex-col gap-4 md:gap-5">
        {visibleReviews.map((review) => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </ul>

      {hasMore && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={cn(campButtonClassName(), 'mt-6')}
        >
          Смотреть больше
        </button>
      ) : null}
    </CampBlock>
  )
}
