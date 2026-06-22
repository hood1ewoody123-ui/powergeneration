'use client'

import { useState } from 'react'
import { ProgramDashboardModal } from '@/components/sections/program-dashboard-modal'
import { Modal } from '@/components/ui/modal'
import { campButtonClassName, CAMP_PANEL } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { PROGRAM_PILLARS } from '@/lib/program'
import type { ProgramPillar } from '@/types/program'

export function ProgramDashboardClient() {
  const [activePillar, setActivePillar] = useState<ProgramPillar | null>(null)

  return (
    <>
      <ul className="mt-8 divide-y divide-green/10">
        {PROGRAM_PILLARS.map((pillar, index) => {
          const hasModal = Boolean(pillar.modal)
          const indexLabel = String(index + 1).padStart(2, '0')

          return (
            <li
              key={pillar.id}
              className="grid gap-5 p-5 md:grid-cols-[minmax(0,11rem)_1fr_auto] md:items-start md:gap-8 md:p-6"
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                <span className="font-mono text-[10px] tracking-[0.2em] text-green/40">
                  {indexLabel}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-t-high md:text-xl">
                  {pillar.title}
                </h3>
              </div>

              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-t-mid md:text-[15px]">
                  {pillar.summary}
                </p>
                {pillar.highlights && pillar.highlights.length > 0 ? (
                  <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-wide text-t-low uppercase">
                    {pillar.highlights.join(' · ')}
                  </p>
                ) : null}
              </div>

              <div className="md:pt-1">
                {hasModal ? (
                  <button
                    type="button"
                    onClick={() => setActivePillar(pillar)}
                    className={cn(
                      campButtonClassName(),
                      'w-full md:w-auto',
                    )}
                  >
                    Подробнее
                  </button>
                ) : (
                  <span className="hidden font-mono text-[10px] text-t-hint md:inline">
                    —
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <Modal
        open={Boolean(activePillar?.modal)}
        onClose={() => setActivePillar(null)}
        title={activePillar?.modal?.title ?? ''}
      >
        {activePillar?.modal ? (
          <ProgramDashboardModal content={activePillar.modal} />
        ) : null}
      </Modal>
    </>
  )
}
