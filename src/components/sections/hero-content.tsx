'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HERO_CONTENT, SITE_CONTACTS } from '@/lib/constants'
import { cn } from '@/lib/cn'

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
}

const shellClass = 'mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-10'

const contactLinkClass =
  'font-mono text-[11px] tracking-[0.12em] text-brand uppercase transition-opacity hover:opacity-70'

export function HeroContent() {
  return (
    <>
      <div className={cn(shellClass, 'pt-4 pb-8 md:hidden')}>
        <HeroCopy />
      </div>

      <div className="relative hidden flex-1 flex-col justify-end md:flex">
        <div className={cn(shellClass, 'pb-[max(1.5rem,env(safe-area-inset-bottom))]')}>
          <HeroCopy className="max-w-xl" />
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
        className="font-display text-xl font-bold tracking-wide text-brand uppercase sm:text-2xl md:text-3xl lg:text-4xl"
      >
        {HERO_CONTENT.title}
      </motion.h1>

      <motion.div
        variants={fade}
        className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1"
      >
        <Link href={SITE_CONTACTS.phoneHref} className={contactLinkClass}>
          {SITE_CONTACTS.phone}
        </Link>
        <Link
          href={SITE_CONTACTS.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClass}
        >
          {SITE_CONTACTS.telegramHandle}
        </Link>
      </motion.div>
    </motion.div>
  )
}
