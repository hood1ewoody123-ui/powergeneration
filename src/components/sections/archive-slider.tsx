'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CampBlock } from '@/lib/camp-minimal'
import { ARCHIVE_PHOTOS, SECTION_TITLES } from '@/lib/constants'
import { useEmbla } from '@/hooks/use-embla'

export function ArchiveSlider() {
  const { emblaRef, scrollPrev, scrollNext } = useEmbla({
    loop: true,
    autoplay: { delay: 4500, stopOnInteraction: true },
  })

  return (
    <CampBlock id="archive" title={SECTION_TITLES.photo}>
      <div className="mt-8 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="fill"
          size="md"
          className="font-mono text-[11px] tracking-[0.18em] uppercase"
          onClick={scrollPrev}
          aria-label="Предыдущий слайд"
        >
          Назад
        </Button>
        <Button
          type="button"
          variant="fill"
          size="md"
          className="font-mono text-[11px] tracking-[0.18em] uppercase"
          onClick={scrollNext}
          aria-label="Следующий слайд"
        >
          Вперёд
        </Button>
      </div>

      <div className="-mx-6 mt-4 overflow-hidden sm:-mx-8 md:-mx-10">
        <div className="overflow-hidden border-t border-green/15" ref={emblaRef}>
          <ul className="flex touch-pan-y">
            {ARCHIVE_PHOTOS.map((src, index) => (
              <li
                key={src}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-bg-0">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1120px"
                    priority={index === 0}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CampBlock>
  )
}
