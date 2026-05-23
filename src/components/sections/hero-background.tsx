'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { HERO_VIDEO } from '@/lib/constants'
import { cn } from '@/lib/cn'

/** Фоновое видео только для desktop (overlay) */
export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion()
  const deskRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    deskRef.current?.play().catch(() => {})
  }, [prefersReducedMotion])

  const videoClass = cn(
    'absolute inset-0 h-full w-full object-cover object-[right_center]',
    'min-h-full min-w-full',
  )

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 bg-bg-0">
        <Image
          src={HERO_VIDEO.posterDesktop}
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-bg-0/80 from-0% via-bg-0/35 via-28% to-transparent to-48%"
          aria-hidden
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-bg-0">
      <video
        ref={deskRef}
        className={videoClass}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_VIDEO.posterDesktop}
        aria-hidden
      >
        <source src={HERO_VIDEO.desktop} type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-bg-0/80 from-0% via-bg-0/35 via-28% to-transparent to-48%"
        aria-hidden
      />
    </div>
  )
}
