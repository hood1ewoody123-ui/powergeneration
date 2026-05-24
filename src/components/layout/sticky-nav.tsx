'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ASSETS } from '@/lib/assets'
import {
  CAMP_NAME,
  MUTA_BORN_BATTLE,
  NAV_CTA_REGISTER,
  NAV_LINKS,
} from '@/lib/constants'
import { cn } from '@/lib/cn'

const navButtonClass =
  'font-mono text-[10px] tracking-[0.14em] uppercase sm:text-[11px]'

const GUESTS_TOP_OFFSET_PX = 64

export function StickyNav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const guests = document.getElementById('guests')
    if (!guests) return

    const update = (): void => {
      const nextVisible =
        guests.getBoundingClientRect().top <= GUESTS_TOP_OFFSET_PX
      setVisible(nextVisible)
      if (!nextVisible) setOpen(false)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[48] border-b border-line/50 bg-bg-0/75 backdrop-blur-md backdrop-saturate-150',
        'transition-[transform,opacity] duration-300 ease-out',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/#top"
          className="flex shrink-0 items-center gap-2"
          onClick={close}
          tabIndex={visible ? 0 : -1}
        >
          <Image
            src={ASSETS.logo}
            alt=""
            width={28}
            height={26}
            className="h-6 w-auto"
          />
          <span className="hidden font-display text-[10px] font-semibold tracking-widest text-brand uppercase sm:inline">
            {CAMP_NAME}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="Навигация при прокрутке"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[12px] text-brand lowercase transition-opacity hover:opacity-70"
              tabIndex={visible ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={MUTA_BORN_BATTLE.href}
            className={cn(
              buttonVariants({ variant: 'brand-outline', size: 'sm' }),
              navButtonClass,
              'hidden sm:inline-flex',
            )}
            tabIndex={visible ? 0 : -1}
          >
            {MUTA_BORN_BATTLE.label}
          </Link>
          <Link
            href={NAV_CTA_REGISTER.href}
            className={cn(
              buttonVariants({ variant: 'brand', size: 'sm' }),
              navButtonClass,
              'hidden sm:inline-flex',
            )}
            tabIndex={visible ? 0 : -1}
          >
            {NAV_CTA_REGISTER.label}
          </Link>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-none border border-brand/40 text-brand md:hidden"
            aria-expanded={open}
            aria-controls="sticky-mobile-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
            tabIndex={visible ? 0 : -1}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && visible ? (
        <nav
          id="sticky-mobile-nav"
          className="border-t border-brand/15 bg-bg-0/95 px-4 py-4 md:hidden"
          aria-label="Мобильная навигация"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-b border-brand/10 py-3 font-body text-base text-brand lowercase"
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={MUTA_BORN_BATTLE.href}
            onClick={close}
            className={cn(
              buttonVariants({ variant: 'brand-outline', size: 'md' }),
              navButtonClass,
              'mt-3 w-full',
            )}
          >
            {MUTA_BORN_BATTLE.label}
          </Link>
          <Link
            href={NAV_CTA_REGISTER.href}
            onClick={close}
            className={cn(
              buttonVariants({ variant: 'brand', size: 'md' }),
              navButtonClass,
              'mt-2 w-full',
            )}
          >
            {NAV_CTA_REGISTER.label}
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
