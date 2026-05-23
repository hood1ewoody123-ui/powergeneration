'use client'

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay'
import { useCallback } from 'react'

export type EmblaCarouselApi = UseEmblaCarouselType[1]

export interface UseEmblaOptions {
  autoplay?: boolean | AutoplayOptionsType
  loop?: boolean
}

export function useEmbla(options: UseEmblaOptions = {}) {
  const { autoplay = false, loop = true } = options

  const plugins = autoplay
    ? [
        Autoplay(
          typeof autoplay === 'boolean'
            ? { delay: 4000, stopOnInteraction: true }
            : autoplay,
        ),
      ]
    : []

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: 'start' }, plugins)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return { emblaRef, emblaApi, scrollPrev, scrollNext }
}
