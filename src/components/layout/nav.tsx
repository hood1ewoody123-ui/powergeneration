'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ASSETS } from '@/lib/assets'
import { CAMP_NAME, NAV_LINKS } from '@/lib/constants'
const CTA = { href: '#register', label: 'Занять место' }

export function Nav() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <>
      <header className="relative z-50 w-full pt-4 sm:pt-5">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          <Link
            href="#top"
            className="flex shrink-0 items-center gap-2"
            onClick={close}
          >
            <Image
              src={ASSETS.logo}
              alt=""
              width={32}
              height={30}
              className="h-7 w-auto"
              priority
            />
            <span className="hidden font-display text-[11px] font-semibold tracking-widest text-brand uppercase sm:inline">
              {CAMP_NAME}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[13px] text-brand lowercase transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={CTA.href}
              className={buttonVariants({
                variant: 'brand',
                size: 'sm',
                className: 'hidden sm:inline-flex',
              })}
            >
              {CTA.label}
            </Link>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-sm border border-brand/40 text-brand md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-bg-0/70 backdrop-blur-sm md:hidden"
              aria-label="Закрыть меню"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.nav
              id="mobile-nav"
              className="fixed inset-x-0 bottom-0 z-[70] flex flex-col gap-0 rounded-t-md border border-brand/20 border-b-0 bg-bg-0 px-4 pt-5 pb-8 md:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              aria-label="Мобильная навигация"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-brand/10 py-3.5 font-body text-base text-brand lowercase"
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={CTA.href}
                onClick={close}
                className={buttonVariants({
                  variant: 'brand',
                  size: 'md',
                  className: 'mt-3 w-full',
                })}
              >
                {CTA.label}
              </Link>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
