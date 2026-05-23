'use client'

import { useReducedMotion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { ScrollTypewriter } from '@/components/motion/scroll-typewriter'
import { ABOUT_INTRO } from '@/lib/constants'
import { cn } from '@/lib/cn'

const textClass = cn(
  'font-mono text-left uppercase tracking-[0.04em] text-green',
  'text-[clamp(0.8rem,2.2vw,0.95rem)] leading-[1.75] md:text-[clamp(0.85rem,1.8vw,1.05rem)]',
)

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  if (prefersReducedMotion) {
    return (
      <section
        id="about"
        className="scroll-mt-20 bg-bg-0 px-4 py-24 sm:px-6 md:py-44 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          {ABOUT_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={textClass}>
              {paragraph.toUpperCase()}
            </p>
          ))}
        </div>
      </section>
    )
  }

  const [first, second] = ABOUT_INTRO.paragraphs

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-visible scroll-mt-20 bg-bg-0"
      aria-label="О программе"
    >
      <div className="sticky top-0 z-[2] flex h-[100dvh] flex-col items-start justify-center px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 md:gap-20">
          {first ? (
            <ScrollTypewriter
              text={first.toUpperCase()}
              progress={scrollYProgress}
              range={[0.05, 0.48]}
              className={textClass}
            />
          ) : null}
          {second ? (
            <ScrollTypewriter
              text={second.toUpperCase()}
              progress={scrollYProgress}
              range={[0.42, 0.92]}
              className={textClass}
            />
          ) : null}
        </div>
      </div>

      <div className="h-[108vh] sm:h-[140vh] md:h-[155vh]" aria-hidden />
    </section>
  )
}
