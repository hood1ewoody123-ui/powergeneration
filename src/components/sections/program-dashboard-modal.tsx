'use client'

import Image from 'next/image'
import type { ProgramModalContent } from '@/types/program'

interface ProgramDashboardModalProps {
  content: ProgramModalContent
}

export function ProgramDashboardModal({ content }: ProgramDashboardModalProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-body text-sm leading-relaxed text-t-mid">{content.intro}</p>

      {content.bullets && content.bullets.length > 0 ? (
        <ul className="flex flex-col gap-2 border-l border-green-24 pl-4">
          {content.bullets.map((item) => (
            <li
              key={item}
              className="font-mono text-[11px] leading-relaxed text-t-mid uppercase"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {content.rooms && content.rooms.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] tracking-widest text-t-low uppercase">
            Номера
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.rooms.map((room) => (
              <article
                key={room.id}
                className="overflow-hidden rounded-sm border border-line bg-bg-1"
              >
                <div className="relative aspect-[4/3] bg-bg-3">
                  <Image
                    src={room.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 240px"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm font-bold text-t-high">
                    {room.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-green uppercase">
                    {room.capacity}
                  </p>
                  <p className="mt-1 font-body text-xs text-t-low">{room.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {content.scheduleDays && content.scheduleDays.length > 0 ? (
        <div className="flex flex-col gap-3">
          {content.scheduleDays.map((day) => (
            <div
              key={day.day}
              className="rounded-sm border border-line bg-bg-1 p-4"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] tracking-widest text-green uppercase">
                  {day.day}
                </span>
                <span className="font-mono text-[10px] text-t-low uppercase">
                  {day.focus}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {day.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] text-t-mid before:mr-2 before:text-green before:content-['›']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
