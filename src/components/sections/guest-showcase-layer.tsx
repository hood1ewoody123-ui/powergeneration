'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GuestFigure } from '@/components/sections/guest-figure'
import {
  getGuestNameTopInLayerVh,
  getGuestNameTopMobileVh,
  getGuestNameTopVh,
  getLayerTopVh,
  GUEST_MOBILE_SLOT_VH,
} from '@/lib/guest-stack-layout'
import type { GuestShowcaseItem } from '@/types'

interface GuestShowcaseLayerProps {
  guest: GuestShowcaseItem
  index: number
}

function GuestNameBlock({
  lineOne,
  lineTwo,
}: {
  lineOne: string
  lineTwo?: string
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <h3 className="font-display text-[clamp(0.75rem,2.4vw,1.2rem)] leading-[0.95] font-extrabold tracking-[0.06em] text-brand uppercase">
        {lineOne}
      </h3>
      {lineTwo ? (
        <p className="font-display text-[clamp(0.75rem,2.4vw,1.2rem)] leading-[0.95] font-extrabold tracking-[0.06em] text-brand uppercase">
          {lineTwo}
        </p>
      ) : null}
    </div>
  )
}

export function GuestShowcaseLayer({ guest, index }: GuestShowcaseLayerProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [lineOne, lineTwo] = guest.lines
  const nameTopVh = getGuestNameTopInLayerVh(index)
  const nameTopMobileVh = getGuestNameTopMobileVh(index)

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start 0.99', 'start 87%'],
  })

  const opacity = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.28] : [0.06, 1],
    [index === 0 ? 1 : 0, 1],
  )

  return (
    <motion.div
      className="guest-showcase-layer pointer-events-none absolute right-0 left-0"
      style={{
        opacity,
        zIndex: 10 + index,
        ['--guest-layer-top-mobile' as string]: `${nameTopMobileVh}vh`,
        ['--guest-layer-top-desktop' as string]: `${getLayerTopVh(index)}vh`,
        ['--guest-layer-height-mobile' as string]: `${GUEST_MOBILE_SLOT_VH}vh`,
        ['--guest-name-in-layer' as string]: `${nameTopVh}vh`,
      }}
      aria-label={guest.lines.filter(Boolean).join(' ')}
    >
      <div
        ref={triggerRef}
        className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 md:top-[var(--guest-name-in-layer)] md:translate-y-0"
        aria-hidden
      />

      {/* Mobile: фигуры по центру, надпись поверх */}
      <div className="relative h-full w-full md:hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[62vh] w-full max-w-[480px]">
            {guest.left.kind === 'freeze' ? (
              <GuestFigure {...guest.left} alt="" side="left" grouped />
            ) : null}
            {guest.right.kind === 'freeze' ? (
              <GuestFigure {...guest.right} alt="" side="right" grouped />
            ) : null}
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
          <GuestNameBlock lineOne={lineOne} lineTwo={lineTwo} />
        </div>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <GuestFigure {...guest.left} alt="" side="left" />
        <GuestFigure {...guest.right} alt="" side="right" />
        <div
          className="absolute right-0 left-0 z-20 flex flex-col items-center text-center"
          style={{ top: `${nameTopVh}vh` }}
        >
          <GuestNameBlock lineOne={lineOne} lineTwo={lineTwo} />
        </div>
      </div>
    </motion.div>
  )
}
