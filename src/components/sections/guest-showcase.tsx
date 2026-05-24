'use client'

import { GuestShowcaseLayer } from '@/components/sections/guest-showcase-layer'
import { GUEST_SHOWCASE } from '@/lib/constants'
import {
  getGuestCanvasHeightVh,
  GUEST_SECTION_TAIL_VH,
} from '@/lib/guest-stack-layout'

export function GuestShowcase() {
  const count = GUEST_SHOWCASE.length
  const canvasVh = getGuestCanvasHeightVh(count) + GUEST_SECTION_TAIL_VH

  return (
    <section
      id="guests"
      className="relative z-10 scroll-mt-20 overflow-x-clip overflow-y-visible bg-bg-0 max-md:-mt-[10vh] md:mt-0"
      aria-label="Headliners and guests"
    >
      <div
        className="relative mx-auto w-full max-w-[1400px] overflow-x-clip overflow-y-visible"
        style={{ height: `${canvasVh}vh` }}
      >
        {GUEST_SHOWCASE.map((guest, index) => (
          <GuestShowcaseLayer key={guest.id} guest={guest} index={index} />
        ))}
      </div>
    </section>
  )
}
