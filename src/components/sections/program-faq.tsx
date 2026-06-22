'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CampBlock, CAMP_MIN } from '@/lib/camp-minimal'
import { FAQ_ITEMS, SECTION_TITLES } from '@/lib/constants'
import { cn } from '@/lib/cn'
import type { FaqTag } from '@/types'

const FAQ_TAGS: { id: FaqTag | 'all'; label: string }[] = [
  { id: 'all', label: 'все' },
  { id: 'general', label: 'общее' },
  { id: 'program', label: 'программа' },
  { id: 'housing', label: 'проживание' },
  { id: 'payment', label: 'оплата' },
]

export function ProgramFaq() {
  const prefersReducedMotion = useReducedMotion()
  const [activeTag, setActiveTag] = useState<FaqTag | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const items = useMemo(
    () =>
      activeTag === 'all'
        ? FAQ_ITEMS
        : FAQ_ITEMS.filter((item) => item.tag === activeTag),
    [activeTag],
  )

  return (
    <CampBlock
      id="faq"
      title={SECTION_TITLES.faq}
      intro="Ответы на частые вопросы. Не нашли нужное — напишите в заявке."
    >
      <div
        className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        role="group"
        aria-label="Фильтр вопросов"
      >
        {FAQ_TAGS.map((tag) => {
          const selected = activeTag === tag.id
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => setActiveTag(tag.id)}
              className={cn(
                CAMP_MIN.mono,
                'transition-opacity hover:opacity-100',
                selected ? 'text-green opacity-100' : 'text-green/35',
              )}
            >
              {tag.label}
            </button>
          )
        })}
      </div>

      <ul className="mt-8 divide-y divide-green/10">
        {items.map((item) => {
          const open = openId === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-8 px-5 py-5 text-left md:px-6 md:py-6"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span
                  className={cn(
                    CAMP_MIN.titleRu,
                    'text-base md:text-lg',
                    open && 'text-green',
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    CAMP_MIN.monoBright,
                    'shrink-0 pt-1 transition-opacity',
                    open ? 'opacity-100' : 'opacity-40',
                  )}
                  aria-hidden
                >
                  {open ? '—' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="content"
                    initial={
                      prefersReducedMotion ? false : { height: 0, opacity: 0 }
                    }
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className={cn(CAMP_MIN.quote, 'px-5 pb-5 md:px-6 md:pb-6')}>
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </CampBlock>
  )
}
