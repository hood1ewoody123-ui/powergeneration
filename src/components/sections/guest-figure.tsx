'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import type { GuestFigureAsset } from '@/types'

interface GuestFigureProps extends GuestFigureAsset {
  alt: string
  side: 'left' | 'right'
  /** Мобильный слот: крупные фигуры по центру */
  grouped?: boolean
}

const edgeFadeClass = cn(
  '[mask-image:linear-gradient(to_right,transparent_0%,#000_18%,#000_82%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)]',
  '[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_18%,#000_82%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)]',
  '[mask-composite:source-in] [-webkit-mask-composite:source-in]',
)

export function GuestFigure({
  src,
  alt,
  side,
  glow = false,
  scale = 1,
  offsetX = 0,
  offsetY = 0,
  mobileScale = 1,
  mobileOffsetX,
  grouped = false,
}: GuestFigureProps) {
  const rotate = side === 'left' ? 7 : -7
  const transformOrigin = side === 'left' ? 'bottom left' : 'bottom right'
  const resolvedScale = grouped ? scale * mobileScale : scale
  const resolvedOffsetX =
    grouped && mobileOffsetX !== undefined ? mobileOffsetX : offsetX

  return (
    <div
      className={cn(
        'absolute flex',
        grouped
          ? [
              'bottom-[2%] h-[92%] w-[72%]',
              side === 'left' ? '-left-[6%]' : '-right-[6%]',
            ]
          : [
              'bottom-[6%] h-[52%] w-[64%]',
              'md:bottom-[10%] md:h-[70%] md:w-[42%]',
              side === 'left'
                ? 'left-0 max-md:left-[-10%] md:left-[-2%]'
                : 'right-0 max-md:right-[-10%] md:right-[-2%]',
            ],
      )}
    >
      <div
        className={cn('relative h-full w-full', edgeFadeClass)}
        style={{
          transform: `translate(${resolvedOffsetX}%, ${offsetY}%) scale(${resolvedScale}) rotate(${rotate}deg)`,
          transformOrigin,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            'object-contain',
            side === 'left' ? 'object-left-bottom' : 'object-right-bottom',
            glow && 'drop-shadow-[0_0_24px_rgba(57,255,20,0.28)]',
          )}
          sizes={grouped ? '72vw' : '(max-width: 768px) 70vw, 42vw'}
        />
      </div>
    </div>
  )
}
