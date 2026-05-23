export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type BattleCategory = 'solo' | '2vs2' | 'crew'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ArchiveShift {
  id: string
  year: string
  title: string
  cover: string
}

export interface GuestFigureAsset {
  src: string
  glow?: boolean
  /** Множитель размера: 1.2 = +20%, 0.7 = −30% */
  scale?: number
  /** Сдвиг по X в % от ширины фигуры (− = влево) */
  offsetX?: number
  /** Сдвиг по Y в % от высоты фигуры (+ = вниз) */
  offsetY?: number
  /** Доп. множитель размера только в мобильном слоте (0.7 = −30%) */
  mobileScale?: number
  /** Сдвиг X только в мобильном слоте */
  mobileOffsetX?: number
}

export interface GuestShowcaseItem {
  id: string
  lines: readonly [string] | readonly [string, string]
  left: GuestFigureAsset
  right: GuestFigureAsset
}
