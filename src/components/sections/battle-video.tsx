'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { BATTLE_VIDEO } from '@/lib/constants'
import { cn } from '@/lib/cn'

export function BattleVideo() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  const tryPlay = useCallback((): void => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return
    void video.play().catch(() => {})
  }, [prefersReducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return

    tryPlay()

    video.addEventListener('canplay', tryPlay)
    video.addEventListener('loadeddata', tryPlay)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else video.pause()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)

    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
    }
  }, [prefersReducedMotion, tryPlay])

  return (
    <div className="w-full px-4 pb-12 md:pb-16">
      <div className="relative mx-auto w-full max-w-[min(100%,400px)]">
        {prefersReducedMotion ? (
          <Image
            src={BATTLE_VIDEO.poster}
            alt=""
            width={800}
            height={1200}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 90vw, 400px"
          />
        ) : (
          <video
            ref={videoRef}
            className={cn('h-auto w-full object-contain')}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={BATTLE_VIDEO.poster}
            aria-label="Power Generation Camp — battle"
            onCanPlay={tryPlay}
            onLoadedData={tryPlay}
          >
            <source src={BATTLE_VIDEO.src} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}
