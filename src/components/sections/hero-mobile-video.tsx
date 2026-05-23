'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { HERO_VIDEO } from '@/lib/constants'

export function HeroMobileVideo() {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    ref.current?.play().catch(() => {})
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full bg-bg-0">
        <Image
          src={HERO_VIDEO.posterMobile}
          alt=""
          width={1440}
          height={2036}
          className="block h-auto w-full"
          priority
          sizes="100vw"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden bg-bg-0">
      <video
        ref={ref}
        className="block h-auto w-full"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_VIDEO.posterMobile}
        aria-hidden
      >
        <source src={HERO_VIDEO.mobile} type="video/mp4" />
      </video>
    </div>
  )
}
