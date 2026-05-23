'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { HERO_CONTENT } from '@/lib/constants'
import { cn } from '@/lib/cn'

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
}

/** Те же горизонтальные отступы, что у логотипа в Nav */
const shellClass = 'mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-10'

export function HeroContent() {
  return (
    <>
      {/* Mobile — под видео, в потоке документа */}
      <div className={cn(shellClass, 'pt-6 pb-10 md:hidden')}>
        <HeroCopy />
      </div>

      {/* Desktop — поверх видео, снизу слева */}
      <div className="relative hidden flex-1 flex-col justify-end md:flex">
        <div className={cn(shellClass, 'pb-14')}>
          <HeroCopy className="max-w-sm" />
        </div>
      </div>
    </>
  )
}

function HeroCopy({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      <motion.h1
        variants={fade}
        className="font-display text-xl font-bold tracking-wide text-brand uppercase sm:text-2xl md:text-3xl"
      >
        {HERO_CONTENT.title}
      </motion.h1>

      <motion.p
        variants={fade}
        className="mt-2 font-body text-sm leading-relaxed text-t-mid md:text-[15px]"
      >
        {HERO_CONTENT.description}
      </motion.p>

      <motion.div
        variants={fade}
        className="mt-5 flex flex-wrap items-center gap-2.5"
      >
        <Link
          href={HERO_CONTENT.cta.href}
          className={buttonVariants({ variant: 'brand', size: 'md' })}
        >
          {HERO_CONTENT.cta.label}
        </Link>
        <Link
          href={HERO_CONTENT.ctaSecondary.href}
          className={buttonVariants({ variant: 'brand-outline', size: 'md' })}
        >
          {HERO_CONTENT.ctaSecondary.label}
        </Link>
      </motion.div>
    </motion.div>
  )
}
