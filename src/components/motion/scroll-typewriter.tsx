'use client'

import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/cn'

interface ScrollTypewriterProps {
  text: string
  progress: MotionValue<number>
  /** Диапазон scrollYProgress [start, end] для этого абзаца */
  range: readonly [number, number]
  className?: string
}

export function ScrollTypewriter({
  text,
  progress,
  range,
  className,
}: ScrollTypewriterProps) {
  const chars = text.split('')
  const [visibleCount, setVisibleCount] = useState(0)

  useMotionValueEvent(progress, 'change', (value) => {
    const [start, end] = range
    if (value <= start) {
      setVisibleCount(0)
      return
    }
    if (value >= end) {
      setVisibleCount(chars.length)
      return
    }
    const t = (value - start) / (end - start)
    setVisibleCount(Math.min(chars.length, Math.ceil(t * chars.length)))
  })

  return (
    <p className={cn(className)} aria-label={text}>
      {chars.map((char, index) => (
        <span
          key={`${index}-${char}`}
          style={{ opacity: index < visibleCount ? 1 : 0 }}
          className="transition-opacity duration-75"
        >
          {char}
        </span>
      ))}
    </p>
  )
}
